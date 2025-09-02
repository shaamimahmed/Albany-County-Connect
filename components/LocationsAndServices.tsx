
import React, { useState } from 'react';
import { LOCATION_CATEGORIES } from '../constants';
import { ChevronDownIcon } from './icons/MiscIcons';

const LocationsAndServices: React.FC = () => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (categoryName: string) => {
    setOpenCategory(openCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Key Locations & Services</h3>
      <div className="space-y-2">
        {LOCATION_CATEGORIES.map((category) => (
          <div key={category.name} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleCategory(category.name)}
              className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <div className="flex items-center space-x-3">
                 <span className="text-county-blue-600">{category.icon}</span>
                 <span>{category.name}</span>
              </div>
              <ChevronDownIcon
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                  openCategory === category.name ? 'rotate-180' : ''
                }`}
              />
            </button>
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openCategory === category.name ? 'max-h-96' : 'max-h-0'
              }`}
            >
              <ul className="p-4 bg-white divide-y divide-gray-100">
                {category.items.map((item) => (
                  <li key={item.name} className="py-2">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group text-gray-600 hover:text-county-blue-700"
                    >
                      <p className="font-medium group-hover:underline">{item.name}</p>
                      {item.details && <p className="text-sm text-gray-500">{item.details}</p>}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsAndServices;
