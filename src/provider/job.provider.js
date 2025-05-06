'use client'
import { usePathname } from 'next/navigation'
import React from 'react'
import Navbar from "@/components/section/navbar";
import Footer from "@/components/section/footer";
const JobProvider = ({children}) => {
    const pathname = usePathname();
    const job = pathname.split('/')[2];
    return (
        <>
            {job === 'jobs' ? (
                <div className="">
                    <Navbar/>
                        {children}
                    <Footer />
                </div>
            ) : (
                <div className="container mx-auto max-w-7xl">
                    <Navbar/>
                    {children}
                    <Footer />
                </div>
            )}
            
        </>
    )
}

export default JobProvider