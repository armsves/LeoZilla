"use client";

import React, { FC, useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider, WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import { DecryptPermission, WalletAdapterNetwork } from "@demox-labs/aleo-wallet-adapter-base";

// Default styles that can be overridden by your app
require("@demox-labs/aleo-wallet-adapter-reactui/styles.css");

export const AleoWalletConnect: FC = () => {
  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "LeoZilla",
      }),
    ],
    []
  );

  return (
    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.TestnetBeta}
      autoConnect
    >
      <WalletModalProvider>
        <WalletMultiButton 
          className="!w-40 !bg-blue-600 hover:!bg-blue-700 !text-white font-semibold py-2 px-4 rounded-lg transition-colors !text-center justify-center"
          style={{ minWidth: '10rem', width: '10rem', maxWidth: '100%' }}
        />
      </WalletModalProvider>
    </WalletProvider>
  );
}; 