import React, { useState, useEffect, useRef } from 'react';
import { ALBANY_SEAL_BASE64 } from '../constants';
import { User } from '../types';
import { LogoutIcon } from './icons/AuthIcons';
import { ShieldCheckIcon } from './icons/SecurityIcons';

interface HeaderProps {
    user: User | null;
    onLoginClick: () => void;
    onLogoutClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLoginClick, onLogoutClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleMfaClick = () => {
      alert("Multi-Factor Authentication enhances security. In a full application, this would guide you through setting up an authenticator app. This feature is for demonstration purposes only.");
  };

  return (
    <header className="bg-county-blue-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
            <img src={ALBANY_SEAL_BASE64} alt="Albany County Logo" className="h-12 w-12 md:h-14 md:w-14"/>
            <div>
              <h1 className="text-xl md:text-3xl font-bold tracking-tight">Albany County, New York</h1>
              <p className="text-xs md:text-sm font-bold italic text-county-blue-200 -mt-1">The Next Generation AI-Driven Connect</p>
            </div>
        </div>
        <div className="flex items-center space-x-6">
            <div className="relative" ref={dropdownRef}>
                {user ? (
                    <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2">
                        <img src={user.avatarUrl} alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-county-blue-400" />
                        <span className="hidden md:block font-semibold">{user.name}</span>
                    </button>
                ) : (
                    <button onClick={onLoginClick} className="bg-white text-county-blue-700 font-bold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors">
                        Login
                    </button>
                )}
                {isDropdownOpen && user && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 text-gray-800">
                        <div className="px-4 py-2 border-b">
                           <p className="font-bold">{user.name}</p>
                           <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        </div>
                        <button onClick={handleMfaClick} className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           <ShieldCheckIcon className="w-5 h-5 mr-2 text-green-600" />
                           Enable MFA
                        </button>
                        <button onClick={onLogoutClick} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                           <LogoutIcon className="w-5 h-5 mr-2" />
                           Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;