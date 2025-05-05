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

const SidebarCandidate = () => {
  const menuItems = [
    { name: 'Dashboard', icon: <FiHome size={18} /> },
    { name: 'Messages', icon: <FiMail size={18} />, badge: 4 },
    { name: 'My Schedule', icon: <FiCalendar size={18} /> },
    { name: 'Job Search', icon: <FiBriefcase size={18} /> },
    { name: 'My Profile', icon: <FiUser size={18} />, selected: true },
    { name: 'Applications', icon: <FiFileText size={18} /> },
    { name: 'Interviews', icon: <FiUsers size={18} /> },
    { name: 'Offers', icon: <FiAward size={18} /> },
    { name: 'Notifications', icon: <FiBell size={18} />, badge: 2 },
    { name: 'Settings', icon: <FiSettings size={18} /> },
  ];

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
            {menuItems.slice(0, 5).map((item, index) => (
              <li key={index} className="mb-1">
                <a
                  href="#" 
                  className={`flex items-center py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200
                    ${item.selected ? 'bg-emerald-50 text-emerald-600 font-medium' : ''}`}
                >
                  <span className={`mr-3 ${item.selected ? 'text-emerald-500' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>

                  <span className="flex-grow text-sm">{item.name}</span>

                  {item.badge && (
                    <span className="ml-auto bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                  
                  {item.selected && (
                    <FiChevronRight className="ml-2 text-emerald-500" size={16} />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="mb-6 mt-8 px-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Applications</h3>
          </div>
          
          <ul>
            {menuItems.slice(5).map((item, index) => (
              <li key={index} className="mb-1">
                <a
                  href="#" 
                  className={`flex items-center py-3 px-3 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-200
                    ${item.selected ? 'bg-emerald-50 text-emerald-600 font-medium' : ''}`}
                >
                  <span className={`mr-3 ${item.selected ? 'text-emerald-500' : 'text-gray-500'}`}>
                    {item.icon}
                  </span>

                  <span className="flex-grow text-sm">{item.name}</span>

                  {item.badge && (
                    <span className="ml-auto bg-red-100 text-red-800 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <FiUser className="text-gray-500" size={16} />
          </div>
          <div className="flex-1"> 
            <p className="text-sm font-medium text-gray-800">John Doe</p>
            <p className="text-xs text-gray-500">Candidate</p>
          </div>
          <FiChevronRight className="text-gray-400" size={16} />
        </div>
      </div>
    </div>
  );
};

export default SidebarCandidate;