"use client";

import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';

// --- Types ---
export interface Crypto {
  name: string;
  symbol: string;
  price: number;
}

export interface PortfolioAsset {
  symbol: string;
  name: string;
  amount: number;
  currentPrice: number;
}

export interface AppState {
  fiatBalance: number;
  portfolio: PortfolioAsset[];
  availableCryptos: Crypto[];
  depositFiat: (amount: number) => void;
  buyCrypto: (symbol: string, usdAmount: number) => void;
  sendCrypto: (symbol: string, amount: number, recipientAddress: string) => void;
  portfolioValue: number;
}

// --- Initial Data ---
const initialCryptos: Crypto[] = [
  { name: 'Bitcoin', symbol: 'BTC', price: 60000 },
  { name: 'Ethereum', symbol: 'ETH', price: 3000 },
  { name: 'Solana', symbol: 'SOL', price: 150 },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.15 },
];

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [fiatBalance, setFiatBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([]);
  const [availableCryptos, setAvailableCryptos] = useState(initialCryptos);

  useEffect(() => {
    const interval = setInterval(() => {
      setAvailableCryptos((prevCryptos) =>
        prevCryptos.map((crypto) => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.01), // Simulate small price fluctuations
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPortfolio(prevPortfolio => {
      return prevPortfolio.map(asset => {
        const updatedCrypto = availableCryptos.find(c => c.symbol === asset.symbol);
        return {
          ...asset,
          currentPrice: updatedCrypto ? updatedCrypto.price : asset.currentPrice,
        };
      });
    });
  }, [availableCryptos]);

  const portfolioValue = useMemo(() => {
    return portfolio.reduce((total, asset) => total + asset.amount * asset.currentPrice, 0);
  }, [portfolio]);

  const depositFiat = (amount: number) => {
    setFiatBalance((prev) => prev + amount);
  };

  const buyCrypto = (symbol: string, usdAmount: number) => {
    if (fiatBalance < usdAmount) {
      throw new Error('Insufficient fiat balance.');
    }
    const crypto = availableCryptos.find((c) => c.symbol === symbol);
    if (!crypto) {
      throw new Error('Cryptocurrency not found.');
    }

    const cryptoAmount = usdAmount / crypto.price;
    setFiatBalance((prev) => prev - usdAmount);

    setPortfolio((prevPortfolio) => {
      const existingAsset = prevPortfolio.find((a) => a.symbol === symbol);
      if (existingAsset) {
        return prevPortfolio.map((asset) =>
          asset.symbol === symbol
            ? { ...asset, amount: asset.amount + cryptoAmount }
            : asset
        );
      } else {
        return [
          ...prevPortfolio,
          {
            symbol,
            name: crypto.name,
            amount: cryptoAmount,
            currentPrice: crypto.price,
          },
        ];
      }
    });
  };

  const sendCrypto = (symbol: string, amount: number, recipientAddress: string) => {
    const asset = portfolio.find((a) => a.symbol === symbol);
    if (!asset || asset.amount < amount) {
      throw new Error('Insufficient crypto balance.');
    }
    
    console.log(`Sending ${amount} ${symbol} to ${recipientAddress}`);

    setPortfolio((prevPortfolio) =>
      prevPortfolio.map((a) =>
        a.symbol === symbol ? { ...a, amount: a.amount - amount } : a
      )
    );
  };

  const value: AppState = {
    fiatBalance,
    portfolio,
    availableCryptos,
    depositFiat,
    buyCrypto,
    sendCrypto,
    portfolioValue,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
