'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from "@/components/section/navbar";
import Footer from "@/components/section/footer";

const PublicProvider = ({children}) => {
    const pathname = usePathname();
    const parts = pathname.split('/').filter(Boolean);
    const isOnboarding = parts[1] === 'onboarding';
    const isDashboard = parts[1] === 'dashboard';
    const shouldHideNavFooter = (parts.length > 1 && (isOnboarding || isDashboard)) || 
                               parts[0] === 'onboarding' || 
                               parts[0] === 'dashboard';
    return (
        <div className="container mx-auto max-w-7xl">
            {!shouldHideNavFooter && <Navbar />}
            {children}
            {!shouldHideNavFooter && <Footer />}
        </div>
    )
}

export default PublicProvider;