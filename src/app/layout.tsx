import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { AppProvider } from '@/components/AppProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AleoWalletProvider from '@/components/AleoWalletProvider';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeoZilla - Discover the Best of Web3",
  description: "Explore trending products across multiple blockchains, connect your wallet, and join the future of decentralized applications with LeoZilla.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AleoWalletProvider>
          <AppProvider>
            <div className="min-h-screen flex flex-col bg-background">
              <header className="bg-black shadow-sm">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <Logo />
                </nav>
              </header>
              <main className="flex-grow container mx-auto px-4 py-8">
                {children}
              </main>
              <Footer />
            </div>
            <ToastContainer position="bottom-right" />
          </AppProvider>
        </AleoWalletProvider>
      </body>
    </html>
  );
}
