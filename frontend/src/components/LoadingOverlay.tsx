'use client';
import React, { useEffect } from 'react';
import { useLoading } from '@/contexts/LoadingContext';

export function LoadingOverlay() {
  const { isLoading, incrementLoadingCount, decrementLoadingCount } = useLoading();

  useEffect(() => {
    const handleLoadingStart = () => incrementLoadingCount();
    const handleLoadingEnd = () => decrementLoadingCount();

    window.addEventListener('api-loading-start', handleLoadingStart);
    window.addEventListener('api-loading-end', handleLoadingEnd);

    return () => {
      window.removeEventListener('api-loading-start', handleLoadingStart);
      window.removeEventListener('api-loading-end', handleLoadingEnd);
    };
  }, [incrementLoadingCount, decrementLoadingCount]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-[9999] flex items-center justify-center">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
        </div>
      </div>
    </div>
  );
} 