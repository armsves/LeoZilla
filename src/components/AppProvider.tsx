'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import { wagmiConfig } from './EVMWalletConnect';
import { AppContextProvider } from '@/app/context';

const queryClient = new QueryClient();

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
} 