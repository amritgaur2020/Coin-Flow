"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowRightLeft, ShoppingCart } from 'lucide-react';

export default function TradePage() {
  const { availableCryptos, fiatBalance, buyCrypto } = useAppContext();
  const [selectedCrypto, setSelectedCrypto] = useState(availableCryptos[0]?.symbol || '');
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handlePurchase = () => {
    const usdAmount = parseFloat(amount);
    if (!selectedCrypto || isNaN(usdAmount) || usdAmount <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please select a cryptocurrency and enter a valid amount.",
        variant: "destructive",
      });
      return;
    }

    try {
      buyCrypto(selectedCrypto, usdAmount);
      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased $${usdAmount} of ${selectedCrypto}.`,
        variant: "default",
      });
      setAmount('');
    } catch (error: any) {
      toast({
        title: "Purchase Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };
  
  const selectedCryptoData = availableCryptos.find(c => c.symbol === selectedCrypto);
  const cryptoAmount = (amount && selectedCryptoData) ? (parseFloat(amount) / selectedCryptoData.price).toFixed(8) : '0.00000000';


  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Trade</h1>
          <p className="text-muted-foreground">Buy and sell cryptocurrencies.</p>
        </div>
      </div>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Buy Cryptocurrency</CardTitle>
          <CardDescription>Your available balance is ${fiatBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-2">
                <Label htmlFor="usd-amount">You pay (USD)</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                        id="usd-amount"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        className="text-lg h-14 pl-7 font-mono"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center my-[-1rem]">
                <Button variant="ghost" size="icon" className="z-10 bg-card hover:bg-secondary rounded-full border">
                    <ArrowRightLeft className="h-5 w-5 text-muted-foreground"/>
                </Button>
            </div>
             <div className="flex flex-col gap-2">
                 <Label htmlFor="crypto-amount">You receive</Label>
                 <div className="flex items-center gap-2">
                    <Input
                        id="crypto-amount"
                        value={cryptoAmount}
                        readOnly
                        className="text-lg h-14 flex-1 bg-secondary/50 font-mono"
                        />
                    <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                    <SelectTrigger id="crypto" className="w-[150px] h-14 text-lg">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                        {availableCryptos.map((crypto) => (
                        <SelectItem key={crypto.symbol} value={crypto.symbol}>
                            <div className="flex items-center gap-2">
                                <span className="font-medium">{crypto.symbol}</span>
                            </div>
                        </SelectItem>
                        ))}
                    </SelectContent>
                    </Select>
                 </div>
            </div>
          </div>
          <Button onClick={handlePurchase} size="lg" className="w-full mt-4 h-14 text-lg">
            <ShoppingCart className="mr-2"/>
            Purchase
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
