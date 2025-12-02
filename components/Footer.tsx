import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FooterProps {
  siteName: string;
  year: number;
}

const Footer: React.FC<FooterProps> = ({ siteName, year }) => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-sm">&copy; {year} {siteName}. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-blue-500">
            <LucideIcon name="twitter" size={20} />
          </a>
          <a href="https://facebook.com" aria-label="Facebook" className="hover:text-blue-700">
            <LucideIcon name="facebook" size={20} />
          </a>
          <a href="https://instagram.com" aria-label="Instagram" className="hover:text-pink-500">
            <LucideIcon name="instagram" size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;