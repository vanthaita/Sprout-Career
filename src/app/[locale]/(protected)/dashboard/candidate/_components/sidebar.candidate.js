'use client'
import Logo from '@/components/section/logo';
import React from 'react';
import { 
  FiHome, 
  FiMail, 
  FiCalendar, 
  FiBriefcase, 
  FiUser, 
  FiUsers, 
  FiAward, 
  FiSettings,
  FiFileText,
  FiBell,
  FiChevronRight
} from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUserProfile } from '@/context/useUserProfile';
const SidebarCandidate = () => {
  const pathname = usePathname();
  const { profile } = useUserProfile();
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome size={18} />, pathSegment: '/dashboard/candidate' },
    { name: 'Messages', icon: <FiMail size={18} />, pathSegment: '/dashboard/candidate/messages', badge: 4 },
    { name: 'My Schedule', icon: <FiCalendar size={18} /> ,  pathSegment: '/dashboard/candidate/schedule'},
    { name: 'Job Search', icon: <FiBriefcase size={18} />,  pathSegment: '/dashboard/candidate/job-searchs' },
    { name: 'My Profile', icon: <FiUser size={18} />,   pathSegment: '/dashboard/candidate/profile', selected: true },
    { name: 'Applications', icon: <FiFileText size={18} />,   pathSegment: '/dashboard/candidate/applications'},
    { name: 'Interviews', icon: <FiUsers size={18} /> ,   pathSegment: '/dashboard/candidate/interviews',},
    { name: 'Offers', icon: <FiAward size={18} />,   pathSegment: '/dashboard/candidate/offers', },
    { name: 'Notifications', icon: <FiBell size={18} />,   pathSegment: '/dashboard/candidate/notifications', badge: 2 },
    { name: 'Settings', icon: <FiSettings size={18} />,   pathSegment: '/dashboard/candidate/settings', },
  ];
  const match = pathname.match(/^\/([a-z]{2,})(\/.*)?$/); 
  const currentLocale = match ? match[1] : ''; 

  const pathWithoutLocale = currentLocale && pathname.startsWith(`/${currentLocale}`)
    ? pathname.substring(`/${currentLocale}`.length)
    : pathname; 
  return (
    <div className="w-64  border-r border-gray-900 h-full fixed left-0 top-0 flex flex-col">
      <div className="flex items-center p-6 border-b border-gray-100 h-20">
        <Logo />
      </div>

      <nav className="flex-1 flex flex-col overflow-hidden">
        <div className="overflow-y-auto scrollbar-hide  pr-2 py-2">

          <div className="mb-6 px-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Menu</h3>
          </div>
          
          <ul>
            {menuItems.slice(0, 5).map((item, index) => {
              const isActive = pathWithoutLocale === item.pathSegment;

              const href = currentLocale ? `/${currentLocale}${item.pathSegment}` : item.pathSegment;
              return (
                <li key={index} className="mb-1">
                  <Link
                    href={href} 
                    className={`flex items-center py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200
                    ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : ''}`}
                  >
                    <span className={`mr-3 ${isActive ? 'text-emerald-500' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>

                    <span className="flex-grow text-sm">{item.name}</span>

                    {item.badge && (
                      <span className="ml-auto bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    
                    {isActive && (
                      <FiChevronRight className="ml-2 text-blue-500" size={16} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mb-6 mt-8 px-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Applications</h3>
          </div>
          
          <ul>
            {menuItems.slice(5).map((item, index) => {
              const isActive = pathWithoutLocale === item.pathSegment;
              const href = currentLocale ? `/${currentLocale}${item.pathSegment}` : item.pathSegment;
              return (
                <li key={index} className="mb-1">
                  <Link
                    href={href}
                    className={`flex items-center py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200
                      ${isActive ? 'bg-emerald-50 text-emerald-600 font-medium' : ''}`}
                  >
                    <span className={`mr-3 ${isActive ? 'text-emerald-500' : 'text-gray-500'}`}>
                      {item.icon}
                    </span>

                    <span className="flex-grow text-sm">{item.name}</span>

                    {item.badge && (
                      <span className="ml-auto bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <FiUser className="text-gray-500" size={16} />
          </div>
          <div className="flex-1"> 
            <p className="text-sm font-medium text-gray-800">{profile?.fullName || 'John Doe'}</p>
            <p className="text-xs text-gray-500">Candidate</p>
          </div>
          <FiChevronRight className="text-gray-400" size={16} />
        </div>
      </div>
    </div>
  );
};

export default SidebarCandidate;