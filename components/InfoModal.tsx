
import React from 'react';
import { XCircleIcon } from './icons/MiscIcons';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-lg m-4 transform transition-all duration-300 ease-in-out scale-95 opacity-0 animate-fade-in-scale"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-center pb-3 border-b border-gray-200">
             <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
             <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Close</span>
                <XCircleIcon className="w-7 h-7" />
             </button>
          </div>
          <div className="mt-4 text-gray-700">
            {children}
          </div>
          <div className="mt-6 text-right">
             <button 
                onClick={onClose}
                className="bg-county-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-county-blue-700 transition-colors"
             >
                Close
             </button>
          </div>
        </div>
      </div>
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

export default InfoModal;
