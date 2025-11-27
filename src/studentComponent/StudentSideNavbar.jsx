
import React, { useState } from 'react';
import adminImage from "../assets/Frame 45 (1).png"
import {
    User,
    Megaphone,
    LogOut,
    FilePenLine,
    FileText,
    LayoutDashboard,
    Image,
    Users,
    CreditCard,
    Settings,
    ChevronLeft,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Define the menu items
const menuItems = [
    { name: 'Profile', icon: User, link: '/student' }, // Base route
    { name: 'Attendance', icon: FilePenLine, link: '/attendance' },
    { name: 'Result', icon: FileText, link: '/result' },
    { name: 'Announcement', icon: Megaphone, link: '/student/student-attendance' },
    { name: 'Exit', icon: LogOut, link: '/student/student-exit' },
];

const StudentSideNavbar = () => {
    const [isOpen, setIsOpen] = useState(true);

    const Logo = () => (
        <div className="flex items-center p-4">
            <img src={adminImage} alt="" />
            {/*  */}
        </div>
    );

    return (
        <div
            className={`
        flex flex-col h-screen bg-white  border-r-2 border-gray-100
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64' : 'w-20'}
      `}
        >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Logo />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            p-1 rounded-full bg-gray-100 text-gray-700
            hover:bg-gray-200 transition-transform duration-300
            ${!isOpen && 'rotate-180'}
          `}
                >
                    <ChevronLeft className="w-5 h-4" />
                </button>
            </div>

            {/* --- Menu Items Section --- */}
            <nav className="flex-1 overflow-y-auto">
                <ul>
                    {menuItems.map((item) => {
                        const Icon = item.icon;

                        const isExactMatchRequired = item.link === '/student';

                        return (
                            <li key={item.name}>
                                <NavLink
                                    to={item.link}
                                    {...(isExactMatchRequired ? { end: true } : {})}

                                    className={({ isActive }) => `
                    relative flex items-center py-3 px-4 mx-3 my-1
                    rounded-lg text-lg font-medium cursor-pointer
                    transition-colors duration-200 group
                    ${isActive
                                            ? 'bg-orange-200 bg-opacity-10 text-orange-600 shadow-sm'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'
                                        }
                  `}
                                >

                                    {({ isActive }) => (
                                        <>
                                            <Icon className="w-6 h-6 mr-3 min-w-[1.5rem]" />
                                            <span
                                                className={`
                          whitespace-nowrap transition-opacity duration-300 ease-in-out
                          ${isOpen ? 'opacity-100' : 'opacity-0 delay-100 hidden'}
                        `}
                                            >
                                                {item.name}
                                            </span>

                                            <div
                                                className={`
                          absolute left-0 w-1 h-full bg-orange-500 rounded-r-md
                          transition-transform duration-300 ease-in-out
                          ${isActive ? 'visible' : 'hidden'} 
                        `}
                                            ></div>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>

        </div>
    );
};

export default StudentSideNavbar;