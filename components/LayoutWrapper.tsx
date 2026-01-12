'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  
  // Hide Navbar and Footer on admin pages and auth pages
  const isAdminPage = pathname?.startsWith('/admin');
  const isAuthPage = pathname?.startsWith('/signin') || 
                     pathname?.startsWith('/signup') || 
                     pathname?.startsWith('/auth');
  
  const hideNavbar = isAdminPage || isAuthPage;
  const hideFooter = isAdminPage || isAuthPage;
  
  return (
    <>
      {!hideNavbar && <Navbar />}
      <div className="lg:pb-0 pb-20">
        {children}
      </div>
      {!hideFooter && <Footer />}
      {!isAdminPage && <MobileBottomNav />}
    </>
  );
}
