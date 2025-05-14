import Image from 'next/image'
import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <>
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {children}
            <div className="hidden lg:block relative bg-gray-100">
                <Image
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
                alt="Office workspace"
                fill
                className="object-cover"
                priority
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-12">
                <div className="text-white max-w-lg">
                    <h2 className="text-4xl font-bold mb-4">Sprout Careers</h2>
                    <p className="text-lg mb-4">
                        Grow Your Career with the Right Opportunities.<br />
                        Connecting top talent with world-class companies.
                    </p>
                    <p className='text-xl font-medium'>&quot;Nurturing Talent, Growing Futures&quot;</p>
                </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default AuthLayout