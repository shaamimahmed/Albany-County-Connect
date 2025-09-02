
import React from 'react';
import { MOCK_EVENTS } from '../constants';
import { Event } from '../types';

const getEventTypeStyles = (type: Event['type']): string => {
  switch (type) {
    case 'government':
      return 'bg-county-blue-100 text-county-blue-800';
    case 'community':
      return 'bg-green-100 text-green-800';
    case 'social':
      return 'bg-purple-100 text-purple-800';
    case 'private':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const Events: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Events</h3>
      <div className="space-y-4">
        {MOCK_EVENTS.map((event) => (
          <div key={event.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col sm:flex-row justify-between sm:items-center">
            <div>
              <p className="font-bold text-gray-900">{event.name}</p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-sm text-gray-500">{event.date}</p>
            </div>
            <div className={`mt-2 sm:mt-0 text-xs font-semibold px-2 py-1 rounded-full ${getEventTypeStyles(event.type)}`}>
              {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
