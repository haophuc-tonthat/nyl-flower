import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer/Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-4 px-4 sm:px-6 lg:px-8 mt-[160px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout; 