
"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAppContext } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function WalletPage() {
  const { depositFiat, sendCrypto, portfolio } = useAppContext();
  const [depositAmount, setDepositAmount] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const { toast } = useToast();

  const handleDeposit = () => {
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid amount to deposit.',
        variant: 'destructive',
      });
      return;
    }
    depositFiat(amount);
    toast({
      title: 'Deposit Successful',
      description: `Successfully deposited $${amount.toFixed(2)}.`,
      variant: 'default',
    });
    setDepositAmount('');
  };

  const handleSend = () => {
    const amount = parseFloat(sendAmount);
    if (!selectedCrypto || !recipientAddress || isNaN(amount) || amount <= 0) {
      toast({
        title: 'Invalid Input',
        description: 'Please fill all fields with valid values.',
        variant: 'destructive',
      });
      return;
    }
    try {
      sendCrypto(selectedCrypto, amount, recipientAddress);
      toast({
        title: 'Send Successful',
        description: `Successfully sent ${amount} ${selectedCrypto}.`,
        variant: 'default',
      });
      setSendAmount('');
      setRecipientAddress('');
      setSelectedCrypto('');
    } catch (error: any) {
      toast({
        title: 'Send Failed',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
        <div className="flex justify-between items-start">
            <div>
            <h1 className="text-3xl font-bold">Wallet</h1>
            <p className="text-muted-foreground">Deposit fiat and send crypto.</p>
            </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ArrowDown className="text-green-500"/> Deposit Fiat</CardTitle>
            <CardDescription>Add funds to your account from your bank.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div>
              <Label htmlFor="deposit-amount">Amount (USD)</Label>
              <Input
                id="deposit-amount"
                placeholder="e.g. 1000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                type="number"
                className="h-12"
              />
            </div>
            <Button onClick={handleDeposit} size="lg">Deposit Funds</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ArrowUp className="text-red-500"/> Send Crypto</CardTitle>
            <CardDescription>Transfer crypto to an external wallet.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
             <div>
              <Label htmlFor="crypto-select">Cryptocurrency</Label>
               <Select value={selectedCrypto} onValueChange={setSelectedCrypto}>
                 <SelectTrigger id="crypto-select" className="h-12">
                   <SelectValue placeholder="Select a crypto" />
                 </SelectTrigger>
                 <SelectContent>
                   {portfolio.filter(a => a.amount > 0).map((asset) => (
                     <SelectItem key={asset.symbol} value={asset.symbol}>
                       {asset.name} ({asset.symbol})
                     </SelectItem>
                   ))}
                 </SelectContent>
               </Select>
             </div>
            <div>
              <Label htmlFor="send-amount">Amount</Label>
              <Input
                id="send-amount"
                placeholder="e.g. 0.05"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                type="number"
                 className="h-12"
              />
            </div>
            <div>
              <Label htmlFor="wallet-address">Recipient Wallet Address</Label>
              <Input
                id="wallet-address"
                placeholder="Paste address"
                value={recipientAddress}
                onChange={(e) => setRecipientAddress(e.target.value)}
                className="h-12"
              />
            </div>
            <Button onClick={handleSend} size="lg">Send Crypto</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

