
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAppContext } from '@/context/AppContext';
import { TrendingUp, TrendingDown, Wallet, PieChart, Activity } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const { fiatBalance, portfolioValue, availableCryptos } = useAppContext();
  const [marketChanges, setMarketChanges] = useState<Record<string, number> | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const changes: Record<string, number> = {};
      availableCryptos.forEach(crypto => {
        changes[crypto.symbol] = (Math.random() - 0.45) * 5;
      });
      setMarketChanges(changes);
    }
  }, [availableCryptos, isClient]);

  const isLoading = !isClient || !marketChanges;

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's a summary of your account.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wallet Balance</CardTitle>
            <Wallet className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
                <Skeleton className="h-10 w-3/4" />
            ) : (
                <p className="text-4xl font-bold">${fiatBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            )}
            <p className="text-xs text-muted-foreground">Available Fiat</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <PieChart className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {isLoading ? (
                <Skeleton className="h-10 w-3/4" />
            ) : (
                <p className="text-4xl font-bold">${portfolioValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            )}
            <p className="text-xs text-muted-foreground">Total Crypto Value</p>
          </CardContent>
        </Card>
         <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                <Activity className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                 <div className="text-center text-muted-foreground py-6">
                    <p>No recent transactions.</p>
                </div>
            </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Markets</h2>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">24h Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                 availableCryptos.map((crypto) => (
                    <TableRow key={crypto.symbol}>
                        <TableCell>
                            <div className="font-medium">{crypto.name}</div>
                            <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                        </TableCell>
                        <TableCell>
                             <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell className="text-right">
                             <Skeleton className="h-5 w-16" />
                        </TableCell>
                    </TableRow>
                 ))
              ) : (
                availableCryptos.map((crypto) => {
                    const change = marketChanges![crypto.symbol] || 0;
                    const isPositive = change >= 0;
                    return (
                    <TableRow key={crypto.symbol}>
                        <TableCell>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                        </TableCell>
                        <TableCell>${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                        <TableCell className="text-right">
                        <span className={`flex items-center justify-end ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                            {isPositive ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                            {change.toFixed(2)}%
                        </span>
                        </TableCell>
                    </TableRow>
                    );
                })
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
