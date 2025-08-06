"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WalletCards } from 'lucide-react';

export default function PortfolioPage() {
  const { portfolio, portfolioValue } = useAppContext();

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
       <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">My Portfolio</h1>
           <p className="text-muted-foreground">An overview of your crypto assets.</p>
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Your Crypto Assets</CardTitle>
                <CardDescription>Total value of your holdings.</CardDescription>
            </div>
            <div className="text-3xl font-bold">${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Value (USD)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-60 text-center">
                    <div className="flex flex-col items-center justify-center gap-4">
                        <WalletCards className="h-16 w-16 text-muted-foreground" />
                        <p className="text-muted-foreground">You have no crypto assets yet.</p>
                        <Button asChild>
                            <Link href="/trade">Start Trading</Link>
                        </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                portfolio.map((asset) => (
                  <TableRow key={asset.symbol}>
                    <TableCell>
                      <div className="font-medium">{asset.name}</div>
                      <div className="text-sm text-muted-foreground">{asset.symbol}</div>
                    </TableCell>
                    <TableCell>{asset.amount.toFixed(8)}</TableCell>
                    <TableCell className="text-right font-mono">${(asset.amount * asset.currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
