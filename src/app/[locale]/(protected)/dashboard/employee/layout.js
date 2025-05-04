import React from 'react'
import SidebarEmployee from './_components/sidebar.employee'

const CandidatePage = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarEmployee />
      <div className="flex-1 overflow-y-auto pl-64"> 
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CandidatePage