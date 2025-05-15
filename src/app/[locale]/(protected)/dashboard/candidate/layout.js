import React, { Suspense } from 'react'
import SidebarCandidate from './_components/sidebar.candidate'

const CandidatePage = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <SidebarCandidate />
      </Suspense>
      <div className="flex-1 overflow-y-auto pl-64 scroll-custom"> 
        <div className="">
          <Suspense fallback={<div>Loading content...</div>}>
            {children}
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default CandidatePage