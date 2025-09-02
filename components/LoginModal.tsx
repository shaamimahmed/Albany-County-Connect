
import React from 'react';
import { GoogleIcon } from './icons/AuthIcons';
import { XCircleIcon } from './icons/MiscIcons';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md m-4 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale">
        <div className="p-6">
          <div className="flex justify-between items-center">
             <h2 className="text-2xl font-bold text-gray-800">Login or Register</h2>
             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <XCircleIcon className="w-7 h-7" />
             </button>
          </div>
          <p className="mt-2 text-gray-600">
            Sign in to report issues and manage your account.
          </p>

          <div className="mt-6">
            <button
              onClick={onLogin}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-county-blue-500 transition-colors"
            >
              <GoogleIcon className="w-6 h-6 mr-3" />
              <span className="font-semibold">Sign in with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
       {/* Simple animation styles */}
      <style>{`
        @keyframes fadeInScale {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
            animation: fadeInScale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LoginModal;
