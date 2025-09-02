
import React from 'react';
import { MOCK_PROMOTIONS } from '../constants';
import { TagIcon } from './icons/MiscIcons';

const Promotions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Local Promotions</h3>
      <div className="space-y-3">
        {MOCK_PROMOTIONS.map((promo) => (
          <div key={promo.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-start space-x-3">
                <TagIcon className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                <div>
                    <p className="font-semibold text-green-900">{promo.offer}</p>
                    <p className="text-sm text-gray-700">{promo.business}</p>
                    <p className="text-xs text-gray-500">Expires: {promo.expiry}</p>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Promotions;
