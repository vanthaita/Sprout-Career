import { ProfileProvider } from '@/context/useUserProfile';
import React from 'react'
import { ToastContainer } from 'react-toastify';

const DashBoardLayout = ({ children }) => {
  return (
   <ProfileProvider>
      <div className='antialiased relative scroll-custom'>
          {children}
        <ToastContainer />
      </div>
   </ProfileProvider>
  )
}

export default DashBoardLayout