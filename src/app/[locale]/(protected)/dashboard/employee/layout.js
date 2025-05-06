import React from 'react'
import SidebarEmployee from './_components/sidebar.employee'

const CandidatePage = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarEmployee />
      <div className="flex-1 overflow-y-auto pl-64 scroll-custom"> 
        <div className="">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CandidatePage