'use client'
import Logo from '@/components/section/logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // No need for useState if selection is path-based
import {
  FiHome,
  FiMail,
  FiCalendar,
  FiBriefcase,
  FiUser,
  FiUsers,
  FiAward,
  FiSettings,
  FiBell,
  FiChevronRight,
  FiDatabase,
  FiPieChart,
  FiLayers
} from 'react-icons/fi';

const SidebarEmployee = () => {
  const pathname = usePathname();
  const menuSections = [
    {
      title: 'Recruitment',
      items: [
        { name: 'Dashboard', icon: <FiHome size={18} />, pathSegment: '/dashboard/employee' },
        { name: 'Messages', icon: <FiMail size={18} />, pathSegment: '/dashboard/employee/messages', badge: 3 },
        { name: 'Calendar', icon: <FiCalendar size={18} />, pathSegment: '/dashboard/employee/calendar' },
        { name: 'Job Postings', icon: <FiBriefcase size={18} />, pathSegment: '/dashboard/employee/job-posting' },
        { name: 'Candidates', icon: <FiUsers size={18} />, pathSegment: '/dashboard/employee/candidates' },
      ],
    },
    {
      title: 'Management',
      items: [
        { name: 'Interviews', icon: <FiCalendar size={18} />, pathSegment: '/dashboard/employee/interviews', badge: 5 },
        { name: 'Talent Pool', icon: <FiDatabase size={18} />, pathSegment: '/dashboard/employee/talent-pool' },
        { name: 'Offer Management', icon: <FiAward size={18} />, pathSegment: '/dashboard/employee/offer-management' },
      ],
    },
    {
      title: 'Other',
      items: [
        { name: 'Onboarding', icon: <FiLayers size={18} />, pathSegment: '/dashboard/employee/onboarding' },
        { name: 'Notifications', icon: <FiBell size={18} />, pathSegment: '/dashboard/employee/notifications', badge: 2 },
        { name: 'Settings', icon: <FiSettings size={18} />, pathSegment: '/dashboard/employee/settings' },
      ],
    },
  ];

  const match = pathname.match(/^\/([a-z]{2,})(\/.*)?$/); 
  const currentLocale = match ? match[1] : ''; 

  const pathWithoutLocale = currentLocale && pathname.startsWith(`/${currentLocale}`)
    ? pathname.substring(`/${currentLocale}`.length)
    : pathname; 
  return (
    <div className="w-64 border-r border-gray-900 h-full fixed left-0 top-0 flex flex-col">
      <div className="flex items-center p-6 border-b border-gray-100 h-20">
        <Logo />
      </div>

      <nav className="flex-1 p-4 flex flex-col overflow-hidden">
        <div className="overflow-y-auto scrollbar-hide pr-2 py-2">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              {section.title && (
                <div className={`mb-6 ${sectionIndex === 0 ? '' : 'mt-8'} px-3`}>
                  <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{section.title}</h3>
                </div>
              )}

              <ul>
                {section.items.map((item, itemIndex) => {
                  const isActive = pathWithoutLocale === item.pathSegment;

                  const href = currentLocale ? `/${currentLocale}${item.pathSegment}` : item.pathSegment;

                  return (
                    <li key={itemIndex} className="mb-1">
                      <Link
                        href={href}
                        className={`flex items-center py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200
                        ${isActive ? 'bg-blue-50 text-blue-600 font-medium' : ''}`} 
                      >
                        <span className={`mr-3 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
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
            </div>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <FiUser className="text-gray-500" size={16} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">Recruiter Name</p>
            <p className="text-xs text-gray-500">HR Department</p>
          </div>
          <FiChevronRight className="text-gray-400" size={16} />
        </div>
      </div>
    </div>
  );
};

export default SidebarEmployee;