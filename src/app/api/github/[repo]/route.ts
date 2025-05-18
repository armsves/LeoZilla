import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { repo: string } }
) {
  try {
    const repo = params.repo;
    const [owner, repoName] = repo.split('/');
    
    if (!owner || !repoName) {
      return NextResponse.json(
        { error: 'Invalid repository format. Expected owner/repo' },
        { status: 400 }
      );
    }

    console.log(`Fetching data for ${owner}/${repoName}`);

    // Fetch repository info
    const repoResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    if (repoResponse.status === 404) {
      console.log(`Repository not found: ${owner}/${repoName}`);
      return NextResponse.json(
        { error: 'Repository not found' },
        { status: 404 }
      );
    }

    if (!repoResponse.ok) {
      console.error('GitHub API error:', await repoResponse.text());
      throw new Error('Failed to fetch GitHub data');
    }

    const repoData = await repoResponse.json();
    console.log(`Repository data for ${owner}/${repoName}:`, {
      updated_at: repoData.updated_at,
      default_branch: repoData.default_branch
    });

    // Fetch recent commits
    const commitsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/commits?per_page=1`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    // Fetch recent pull requests
    const prsResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repoName}/pulls?state=all&per_page=1`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
      }
    );

    const commitsData = commitsResponse.ok ? await commitsResponse.json() : [];
    const prsData = prsResponse.ok ? await prsResponse.json() : [];

    console.log(`Activity data for ${owner}/${repoName}:`, {
      hasCommits: commitsData.length > 0,
      lastCommitDate: commitsData[0]?.commit?.author?.date,
      hasPRs: prsData.length > 0,
      lastPRDate: prsData[0]?.updated_at
    });

    // Get the most recent activity date
    const dates = [
      new Date(repoData.updated_at),
      commitsData[0]?.commit?.author?.date ? new Date(commitsData[0].commit.author.date) : null,
      prsData[0]?.updated_at ? new Date(prsData[0].updated_at) : null,
    ].filter((date): date is Date => date !== null);

    const lastUpdate = dates.length > 0 ? new Date(Math.max(...dates.map(d => d.getTime()))).toISOString() : repoData.updated_at;
    
    console.log(`Final lastUpdate for ${owner}/${repoName}:`, lastUpdate);

    return NextResponse.json({
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      lastUpdate,
      hasRecentCommits: commitsData.length > 0,
      hasRecentPRs: prsData.length > 0,
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
} 