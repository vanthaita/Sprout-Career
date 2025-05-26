'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from "@/components/section/navbar";
import Footer from "@/components/section/footer";
import { cn } from '@/lib/utils';

const HIDE_NAV_FOOTER_ROUTES = new Set([
  'onboarding',
  'dashboard',
  'signin',
  'signup'
]);

const PublicProvider = ({ children }) => {
    const pathname = usePathname();
    
    const shouldHideNavFooter = React.useMemo(() => {
        if (!pathname) return false;
        
        const parts = pathname.split('/').filter(Boolean);
        if (parts.length === 0) return false;
        
        return parts.some(part => HIDE_NAV_FOOTER_ROUTES.has(part));
    }, [pathname]);

    const isAuthRoute = React.useMemo(() => {
        if (!pathname) return false;
        return pathname.includes('/signin') || pathname.includes('/signup');
    }, [pathname]);

    return (
        <div className={cn(
            shouldHideNavFooter ? 'w-full' : 'container mx-auto max-w-7xl',
        )}>
            {!shouldHideNavFooter && <Navbar />}
            {children}
            {!shouldHideNavFooter && <Footer />}
        </div>
    )
}

export default React.memo(PublicProvider);