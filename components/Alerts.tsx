
import React from 'react';
import { MOCK_ALERTS } from '../constants';
import { Alert } from '../types';
import { BellIcon, UserGroupIcon, TrafficIcon, ExclamationIcon } from './icons/AlertIcons';

const getAlertStyles = (type: Alert['type']): { icon: React.ReactNode; color: string } => {
  switch (type) {
    case 'emergency':
      return { icon: <ExclamationIcon className="w-5 h-5" />, color: 'bg-red-100 text-red-800 border-red-500' };
    case 'community':
      return { icon: <UserGroupIcon className="w-5 h-5" />, color: 'bg-blue-100 text-blue-800 border-blue-500' };
    case 'traffic':
      return { icon: <TrafficIcon className="w-5 h-5" />, color: 'bg-yellow-100 text-yellow-800 border-yellow-500' };
    default:
      return { icon: <BellIcon className="w-5 h-5" />, color: 'bg-gray-100 text-gray-800 border-gray-500' };
  }
};


const Alerts: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Community Alerts</h3>
      <div className="space-y-4">
        {MOCK_ALERTS.map((alert) => {
          const { icon, color } = getAlertStyles(alert.type);
          return (
            <div key={alert.id} className={`p-4 rounded-lg border-l-4 ${color}`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 pt-1">{icon}</div>
                <div>
                  <p className="font-bold">{alert.title}</p>
                  <p className="text-sm">{alert.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
