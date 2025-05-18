import ProjectList from '@/components/ProjectList';
import { AleoWalletConnect } from '@/components/AleoWalletConnect';

export default function AleoPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Aleo Ecosystem Projects</h1>
        <div className="flex items-center space-x-4">
          <select className="input max-w-xs">
            <option value="trending">Trending</option>
            <option value="newest">Newest</option>
            <option value="top">Top Rated</option>
          </select>
          <AleoWalletConnect />
        </div>
      </div>
      
      <ProjectList blockchain="aleo" />
    </div>
  );
} 