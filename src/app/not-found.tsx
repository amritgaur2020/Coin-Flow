import { Inter } from "next/font/google";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ["latin"] });

export default function NotFound() {
  return (
    <div className={`${inter.className} flex flex-col items-center justify-center h-full text-center`}>
      <h1 className="text-9xl font-bold text-primary">404</h1>
      <h2 className="text-3xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-muted-foreground mt-2">Could not find the requested resource.</p>
      <Button asChild className="mt-6">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
