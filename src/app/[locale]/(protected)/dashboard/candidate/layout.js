import React from 'react'
import SidebarCandidate from './_components/sidebar.candidate'

const CandidatePage = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarCandidate />
      <div className="flex-1 overflow-y-auto pl-64 scroll-custom"> 
        <div className="">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CandidatePage