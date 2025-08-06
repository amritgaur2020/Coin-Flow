
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-8">
      <AlertTriangle className="w-24 h-24 text-primary mb-4" />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="text-muted-foreground mt-2 max-w-md">
        Looks like you’ve followed a broken link or entered a URL that doesn’t exist on this site.
      </p>
      <Button asChild className="mt-6">
        <Link href="/dashboard">Return to Dashboard</Link>
      </Button>
    </div>
  );
}
