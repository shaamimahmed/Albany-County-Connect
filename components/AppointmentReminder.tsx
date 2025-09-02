
import React from 'react';
import { CalendarIcon } from './icons/ActionIcons';

const AppointmentReminder: React.FC = () => {
  return (
    <div id="appointment-reminder" className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex-shrink-0 bg-purple-100 p-3 rounded-full">
            <CalendarIcon className="w-8 h-8 text-purple-600" />
        </div>
        <div className="flex-grow text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-800">Schedule County Appointments</h3>
            <p className="text-gray-600 mt-1">
                Need to visit the DMV, County Clerk, or another department? Schedule your visit online to save time.
            </p>
        </div>
        <div className="flex-shrink-0 mt-4 md:mt-0">
            <a 
                href="https://albanycounty.com/departments" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-purple-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-purple-600 transition-colors"
            >
                Find a Department
            </a>
        </div>
      </div>
    </div>
  );
};

export default AppointmentReminder;
