
import React from 'react';
import { PhoneIcon, FireIcon, PlusIcon, CalendarIcon } from './icons/ActionIcons';
import { ModalContent } from '../types';

interface QuickActionsProps {
  onActionClick: (content: ModalContent) => void;
}

const ActionButton: React.FC<{ icon: React.ReactNode; label: string; bgColor: string; onClick: () => void; }> = ({ icon, label, bgColor, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 rounded-lg text-white transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl hover:-translate-y-1 active:shadow-md active:translate-y-0 ${bgColor}`}
    aria-label={label}
  >
    {icon}
    <span className="mt-2 font-semibold text-sm tracking-wide">{label}</span>
  </button>
);

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {

  const handlePoliceClick = () => onActionClick({
    title: 'Contact Police (Non-Emergency)',
    body: (
      <div>
        <p className="text-lg font-semibold text-red-700 mb-2">For emergencies, please dial 911 immediately.</p>
        <p className="text-gray-600">For non-emergency inquiries, you can contact the Albany County Sheriff's Office.</p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li><strong>Phone:</strong> (518) 487-5400</li>
          <li><strong>Website:</strong> <a href="https://www.albanycounty.com/departments/sheriff" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official Sheriff's Website</a></li>
        </ul>
      </div>
    )
  });

  const handleFireClick = () => onActionClick({
    title: 'Contact Fire Department (Non-Emergency)',
    body: (
       <div>
        <p className="text-lg font-semibold text-red-700 mb-2">For emergencies, please dial 911 immediately.</p>
        <p className="text-gray-600">For non-emergency inquiries, please contact your local fire department. For Albany Fire Dept:</p>
        <ul className="list-disc list-inside mt-4 space-y-2">
          <li><strong>Phone:</strong> (518) 447-7879</li>
          <li><strong>Website:</strong> <a href="https://www.albanyny.gov/203/Fire-Department" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Official Fire Dept. Website</a></li>
        </ul>
      </div>
    )
  });

  const handleHospitalsClick = () => onActionClick({
      title: 'Nearby Hospitals & Urgent Care',
      body: (
        <div>
          <p className="text-gray-600 mb-4">Here are links to find major medical centers in the area.</p>
          <ul className="space-y-2">
            <li><a href="https://www.google.com/maps/search/?api=1&query=Albany+Medical+Center" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Albany Medical Center</a></li>
            <li><a href="https://www.google.com/maps/search/?api=1&query=St.+Peter's+Hospital+Albany+NY" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">St. Peter's Hospital</a></li>
            <li><a href="https://www.google.com/maps/search/?api=1&query=urgent+care+near+Albany+NY" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Search for Urgent Care Centers</a></li>
          </ul>
        </div>
      )
  });

  const handleBookingClick = () => {
    const reminderElement = document.getElementById('appointment-reminder');
    if (reminderElement) {
        reminderElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        alert("Appointment booking section not found.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionButton icon={<PhoneIcon className="w-8 h-8" />} label="Police" bgColor="bg-blue-500 hover:bg-blue-600" onClick={handlePoliceClick} />
        <ActionButton icon={<FireIcon className="w-8 h-8" />} label="Fire Dept." bgColor="bg-red-500 hover:bg-red-600" onClick={handleFireClick}/>
        <ActionButton icon={<PlusIcon className="w-8 h-8" />} label="Hospitals" bgColor="bg-green-500 hover:bg-green-600" onClick={handleHospitalsClick}/>
        <ActionButton icon={<CalendarIcon className="w-8 h-8" />} label="Book an Appt." bgColor="bg-purple-500 hover:bg-purple-600" onClick={handleBookingClick}/>
      </div>
    </div>
  );
};

export default QuickActions;
