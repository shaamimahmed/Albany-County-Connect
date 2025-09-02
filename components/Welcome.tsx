
import React from 'react';
import { DANIEL_MCCOY_BASE64 } from '../constants';
import { User } from '../types';

interface WelcomeProps {
  user: User | null;
}

const Welcome: React.FC<WelcomeProps> = ({ user }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center gap-6">
      <img
        src={DANIEL_MCCOY_BASE64}
        alt="Daniel P. McCoy, Albany County Executive"
        className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-4 border-county-blue-500 shadow-md"
      />
      <div className="text-center md:text-left">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          {user ? `Welcome back, ${user.name}!` : 'Welcome to Albany County Connect'}
        </h2>
        <p className="mt-2 text-gray-600">
          {user 
            ? "Your central hub for county services is ready. Report issues, find information, and stay connected with your community right here."
            : "A message from County Executive Daniel P. McCoy: \"Welcome to the future of civic engagement. Our new AI-Driven Connect platform is more than an app; it's a gateway to the next level of opportunities for every resident. By putting powerful tools and real-time information at your fingertips, we're building a more responsive, efficient, and connected Albany County together.\""
          }
        </p>
      </div>
    </div>
  );
};

export default Welcome;