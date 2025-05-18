"use client";

import { createConfig, http } from 'wagmi';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

// Define custom chains for Westend AssetHub and Bahamut Horizon
const westendAssetHub = {
  id: 420420421,
  name: 'Westend AssetHub',
  network: 'westend-asset-hub',
  nativeCurrency: {
    decimals: 18,
    name: 'WND',
    symbol: 'WND',
  },
  rpcUrls: {
    default: { http: ['https://westend-asset-hub-rpc.polkadot.io'] },
    public: { http: ['https://westend-asset-hub-rpc.polkadot.io'] },
  },
  blockExplorers: {
    default: { name: 'Subscan', url: 'https://westend-asset-hub.subscan.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1,
    },
  },
} as const;

const bahamutHorizon = {
  id: 2552,
  name: 'Bahamut Horizon',
  network: 'bahamut-horizon',
  nativeCurrency: {
    decimals: 18,
    name: 'FTN',
    symbol: 'FTN',
  },
  rpcUrls: {
    default: { http: ['https://horizon-rpc.bahamut.io'] },
    public: { http: ['https://horizon-rpc.bahamut.io'] },
  },
  blockExplorers: {
    default: { name: 'Bahamut Explorer', url: 'https://explorer.bahamut.io' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 1,
    },
  },
} as const;

// Define chains array
export const chains = [westendAssetHub, bahamutHorizon];

// Configure wagmi
export const wagmiConfig = createConfig({
  chains,
  transports: {
    [westendAssetHub.id]: http(westendAssetHub.rpcUrls.default.http[0]),
    [bahamutHorizon.id]: http(bahamutHorizon.rpcUrls.default.http[0]),
  },
});

export function EVMWalletConnect() {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
          Connect Wallet
        </button>
      </WagmiConfig>
    </QueryClientProvider>
  );
} 