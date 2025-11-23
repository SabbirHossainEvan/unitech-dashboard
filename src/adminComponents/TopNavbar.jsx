

import React, { useState } from 'react';
import { Search, Bell } from 'lucide-react';

const TopNavbar = () => {

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(true);


  const userProfileImage = 'https://via.placeholder.com/150/f00000/ffffff?text=RM';
  const userName = 'Richardo Mathew';

  return (
    <header className="flex items-center justify-between p-4 bg-white w-full mx-auto h-16 border-b-2 border-gray-100">
      
      {/* --- Search Bar --- */}
      <div className="w-full mx-auto mr-6">
        <div 
          className={`
            relative flex items-center bg-gray-100 rounded-lg h-10
            transition-all duration-300 ease-in-out
            ${isSearchFocused 
              ? 'ring-2 ring-blue-500 shadow-md' 
              : ''
            }
          `}
        >
          {/* Search Icon */}
          <Search className="w-5 h-5 text-gray-400 absolute left-4" />

          {/* Input Field */}
          <input
            type="text"
            placeholder="Search"
            className="w-[700%] h-full py-2 pl-12 pr-4 text-gray-700 bg-transparent focus:outline-none placeholder-gray-500"
            onFocus={() => setIsSearchFocused(true)} 
            onBlur={() => setIsSearchFocused(false)}   
          />
        </div>
      </div>

      {/* --- User/Notifications Section --- */}
      <div className="flex items-center space-x-6">
        
        <button
          aria-label="Notifications"
          onClick={() => setHasNewNotifications(false)} 
          className="relative text-gray-500 hover:text-gray-700 transition duration-150 group"
        >
          <Bell 
            className={`
              w-6 h-6 
              group-hover:animate-shake // Tailwind class for custom shake animation
            `} 
          />
          
          {hasNewNotifications && (
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white bg-red-500 animate-ping-once"></span>
          )}
        </button>

        {/* User Details */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          {/* User Name */}
          <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
            {userName}
          </span>

          <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent group-hover:border-red-500 transition duration-150">
            <img
              src={userProfileImage} 
              alt={`${userName}'s profile`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
