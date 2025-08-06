
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'CoinFlow - Your Modern Crypto Wallet',
  description: 'The easiest and most secure way to manage your cryptocurrency portfolio. Buy, sell, and track your assets with confidence.',
};

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-primary">
                <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm-1-12h2v2h-2zm0 4h2v6h-2z" />
            </svg>
            <span className="text-xl font-semibold">CoinFlow</span>
        </div>
        <Button asChild variant="outline">
            <Link href="/dashboard">Go to App</Link>
        </Button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          Welcome to CoinFlow
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          The easiest and most secure way to manage your cryptocurrency portfolio. Buy, sell, and track your assets with confidence.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/dashboard">
            Get Started <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </main>
       <footer className="p-4 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} CoinFlow. All rights reserved.
      </footer>
    </div>
  );
}
