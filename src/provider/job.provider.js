'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const JobProvider = ({children}) => {
    const pathname = usePathname();
    const job = pathname.split('/')[1];
    console.log(job);
    return (
        <>
            {job === 'jobs' ? (
                <div className="px-6">
                    {children}
                </div>
            ) : (
                <div className="container mx-auto max-w-7xl">
                    {children}
                </div>
            )}
            
        </>
    )
}

export default JobProvider