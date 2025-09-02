import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon } from './icons/SocialIcons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-county-blue-800 text-white mt-12">
      <div className="max-w-7xl mx-auto py-6 px-4 md:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-county-blue-200">&copy; 2025 Albany County, New York. All Rights Reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="text-county-blue-200 hover:text-white transition-colors">
            <span className="sr-only">Facebook</span>
            <FacebookIcon className="w-6 h-6" />
          </a>
          <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" className="text-county-blue-200 hover:text-white transition-colors">
            <span className="sr-only">Twitter</span>
            <TwitterIcon className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-county-blue-200 hover:text-white transition-colors">
            <span className="sr-only">Instagram</span>
            <InstagramIcon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;