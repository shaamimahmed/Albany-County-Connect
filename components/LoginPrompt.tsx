
import React from 'react';
import { UserCircleIcon } from './icons/AuthIcons';

interface LoginPromptProps {
  onLoginClick: () => void;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ onLoginClick }) => {
  return (
    <div className="bg-county-blue-50 p-6 rounded-lg shadow-lg border-l-4 border-county-blue-500">
       <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-shrink-0">
            <UserCircleIcon className="w-12 h-12 text-county-blue-500" />
        </div>
        <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800">Unlock More Features</h3>
            <p className="text-gray-600 mt-1">
                Log in to report issues, view community alerts, and manage your appointments.
            </p>
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0">
            <button 
                onClick={onLoginClick}
                className="bg-county-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-county-blue-700 transition-colors"
            >
                Login or Register
            </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
