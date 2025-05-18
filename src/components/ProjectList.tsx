"use client";
import { useState, useEffect } from 'react';
import { FaGithub, FaXTwitter } from 'react-icons/fa6';
import { FaGlobe, FaCode, FaHashtag, FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { WalletNotConnectedError } from "@demox-labs/aleo-wallet-adapter-base";
import { useWallet } from "@demox-labs/aleo-wallet-adapter-react";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";

interface Project {
  id: string;
  name: string;
  description: string;
  website: string;
  githubUrl: string;
  twitterUrl: string;
  logoUrl: string;
  blockchain: string;
  averageRating: number;
  metrics: {
    githubStars: number;
    twitterFollowers: number;
    githubForks: number;
    projectFreshness: number;
  };
}

interface SocialData {
  githubLastUpdate?: string;
  twitterLastUpdate?: string;
}

interface ProjectListProps {
  blockchain?: string;
}

// VoteModal component
function VoteModal({ open, onClose, onSubmit, currentRating }: {
  open: boolean;
  onClose: () => void;
  onSubmit: (rating: number) => void;
  currentRating?: number;
}) {
  const [selected, setSelected] = useState(currentRating || 0);
  useEffect(() => {
    setSelected(currentRating || 0);
  }, [currentRating, open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-xs shadow-lg relative">
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-semibold mb-4 text-center">Rate this project</h2>
        <div className="flex justify-center mb-4">
          {[1,2,3,4,5].map(star => (
            <FaStar
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${star <= selected ? 'text-yellow-400' : 'text-gray-300'}`}
              onClick={() => setSelected(star)}
              data-testid={`star-${star}`}
            />
          ))}
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={selected === 0}
          onClick={() => { onSubmit(selected); onClose(); }}
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}

const ProjectList = ({ blockchain = 'stellar' }: ProjectListProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [socialData, setSocialData] = useState<Record<string, SocialData>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [voteModalOpen, setVoteModalOpen] = useState(false);
  const [votingProject, setVotingProject] = useState<Project | null>(null);
  const [failedWebsites, setFailedWebsites] = useState<Set<string>>(new Set());
  const { wallet, publicKey } = useWallet();

  const extractGithubRepo = (url: string) => {
    const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
    return match ? match[1] : null;
  };

  const extractTwitterUsername = (url: string) => {
    const match = url.match(/twitter\.com\/([^/]+)|x\.com\/([^/]+)/);
    return match ? (match[1] || match[2]) : null;
  };

  const fetchSocialData = async (project: Project) => {
    const githubRepo = extractGithubRepo(project.githubUrl);
    const twitterUsername = extractTwitterUsername(project.twitterUrl);
    const data: SocialData = {};

    try {
      if (githubRepo) {
        const response = await fetch(`/api/github/${githubRepo}`);
        if (response.ok) {
          const githubData = await response.json();
          data.githubLastUpdate = githubData.lastUpdate;
        }
      }

      if (twitterUsername) {
        const response = await fetch(`/api/twitter/${twitterUsername}`);
        if (response.ok) {
          const twitterData = await response.json();
          data.twitterLastUpdate = twitterData.lastUpdate;
        }
      }

      setSocialData(prev => ({
        ...prev,
        [project.id]: data
      }));
    } catch (error) {
      console.error('Error fetching social data:', error);
    }
  };

  const isCodeActive = (project: Project) => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const githubDate = new Date(socialData[project.id]?.githubLastUpdate || '');
    return githubDate > threeMonthsAgo;
  };

  const isSocialActive = (project: Project) => {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    const twitterDate = new Date(socialData[project.id]?.twitterLastUpdate || '');
    return twitterDate > threeMonthsAgo;
  };

  const getCodeActivityStatus = (project: Project) => {
    const now = new Date();
    const githubDate = new Date(socialData[project.id]?.githubLastUpdate || '');
    const monthsDiff = (now.getTime() - githubDate.getTime()) / (1000 * 60 * 60 * 24 * 30);

    if (monthsDiff <= 2) {
      return { color: 'text-green-500', title: 'Active code (updated in last 2 months)' };
    } else if (monthsDiff <= 5) {
      return { color: 'text-blue-500', title: 'Moderately active code (updated 3-5 months ago)' };
    } else {
      return { color: 'text-red-500', title: 'Inactive code (no updates in last 6 months)' };
    }
  };

  // Voting handler
  const handleVote = async (project: Project, rating: number) => {
    console.log('Wallet:', wallet);
    console.log('PublicKey:', publicKey);
    // Sign a message before voting
    if (!publicKey) {
      alert('Please connect your Aleo wallet to vote.');
      return;
    }
    try {
      const message = `LeoZilla: Voting for project ${project.name} with rating ${rating}`;
      const bytes = new TextEncoder().encode(message);
      const signatureBytes = await (wallet?.adapter as LeoWalletAdapter).signMessage(bytes);
      const signature = new TextDecoder().decode(signatureBytes);
      // Optionally, send the signature to the backend for verification
      // For demo, just alert
      // alert("Signed message: " + signature);
      // For demo, use the first dummy user
      const userId = 'GUSERDUMMYADDRESS0';
      await fetch(`/api/projects?projectId=${project.id}&userId=${userId}&value=${rating}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ signature }),
      });
      // Refresh projects
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/projects?blockchain=${blockchain}`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    } catch (err) {
      alert('Failed to sign message. Please ensure your wallet is connected.');
      return;
    }
  };

  // Add website accessibility check
  const checkWebsiteAccessibility = async (url: string, projectId: string) => {
    try {
      const response = await fetch(`/api/check-website?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      if (!data.ok) {
        setFailedWebsites(prev => new Set([...prev, projectId]));
      }
    } catch (error) {
      console.error('Error checking website:', error);
      setFailedWebsites(prev => new Set([...prev, projectId]));
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`/api/projects?blockchain=${blockchain}`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
        
        // Fetch social data for each project
        data.forEach((project: Project) => {
          fetchSocialData(project);
          if (project.website) {
            checkWebsiteAccessibility(project.website, project.id);
          }
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [blockchain]);

  if (loading) {
    return <div className="text-center py-8">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Vote Modal */}
      <VoteModal
        open={voteModalOpen}
        onClose={() => setVoteModalOpen(false)}
        onSubmit={rating => votingProject && handleVote(votingProject, rating)}
        currentRating={0}
      />
      {projects.map((project) => (
        <div key={project.id} className="bg-white rounded-lg shadow-md p-6 relative flex flex-col justify-between h-56">
          <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
            {/* Star Rating, Code, and Social Indicators */}
            <div className="flex items-center gap-2 mb-2">
              {/* Star Rating */}
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.round(project.averageRating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-1">
                  {project.averageRating.toFixed(1)}
                </span>
              </div>
              {/* Code Activity Indicator */}
              <div className="relative group">
                {socialData[project.id]?.githubLastUpdate ? (
                  <FaCode 
                    className={`h-5 w-5 ${getCodeActivityStatus(project).color}`} 
                    title={getCodeActivityStatus(project).title}
                  />
                ) : (
                  <FaCode className="h-5 w-5 text-gray-400" title="No activity data available" />
                )}
              </div>
              {/* Social Media Activity Indicator */}
              <div className="relative group">
                {isSocialActive(project) ? (
                  <FaHashtag className="h-5 w-5 text-blue-500" title="Active social media (updated in last 3 months)" />
                ) : (
                  <FaHashtag className="h-5 w-5 text-gray-400" title="Inactive social media (no updates in last 3 months)" />
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={project.logoUrl || '/default-logo.png'}
                alt={`${project.name} logo`}
                fill
                className="object-contain rounded-xl"
              />
            </div>
            <h2 className="text-xl font-semibold">{project.name}</h2>
          </div>
          <p className="mt-2 text-sm text-foreground/80">{project.description}</p>
          
          <div className="mt-4 flex justify-between items-center">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              onClick={() => { setVotingProject(project); setVoteModalOpen(true); }}
            >
              Vote
            </button>
            <div className="flex items-center space-x-4">
              {project.website && (
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-500 hover:text-gray-700 ${failedWebsites.has(project.id) ? 'text-red-500 hover:text-red-700' : ''}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <FaGlobe className="h-5 w-5" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  title={`${project.metrics?.githubStars || 0} GitHub Stars`}
                >
                  <FaGithub className="h-5 w-5" />
                </a>
              )}
              {project.twitterUrl && (
                <a
                  href={project.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                  title={`${project.metrics?.twitterFollowers || 0} Twitter Followers`}
                >
                  <FaXTwitter className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectList; 