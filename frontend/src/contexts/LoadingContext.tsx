'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  incrementLoadingCount: () => void;
  decrementLoadingCount: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingCount, setLoadingCount] = useState(0);

  const incrementLoadingCount = () => {
    setLoadingCount(prev => prev + 1);
    setIsLoading(true);
  };

  const decrementLoadingCount = () => {
    setLoadingCount(prev => {
      const newCount = prev - 1;
      if (newCount === 0) {
        // Khi không còn API call nào, đợi 2s rồi mới tắt loading
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
      return newCount;
    });
  };

  return (
    <LoadingContext.Provider value={{ 
      isLoading, 
      setIsLoading, 
      incrementLoadingCount, 
      decrementLoadingCount 
    }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
} 