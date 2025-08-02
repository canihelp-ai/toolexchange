import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useEffect } from 'react';

interface CurrencyContextType {
  currency: 'USD' | 'JMD';
  setCurrency: (currency: 'USD' | 'JMD') => void;
  formatCurrency: (amount: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<'USD' | 'JMD'>('USD');

  const formatCurrency = (amount: number): string => {
    const exchangeRate = 160; // 1 USD = 160 JMD
    
    if (currency === 'JMD') {
      const jmdAmount = amount * exchangeRate;
      return new Intl.NumberFormat('en-JM', {
        style: 'currency',
        currency: 'JMD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(jmdAmount).replace('JMD', 'J$');
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};