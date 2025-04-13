
import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col md:ml-64 transition-all duration-300 ease-in-out">
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 md:p-8 pt-6">
          {children}
        </main>
      </div>
      
      <Toaster />
      <Sonner />
    </div>
  );
};

export default Layout;
