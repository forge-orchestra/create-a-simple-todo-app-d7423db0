import React from 'react';
import Link from 'next/link';
import { Home, List, User } from 'lucide-react';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <Link href="/" aria-label="Home">
            <a className="flex items-center space-x-1 hover:text-blue-300">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </a>
          </Link>
          <Link href="/tasks" aria-label="Tasks">
            <a className="flex items-center space-x-1 hover:text-blue-300">
              <List className="w-5 h-5" />
              <span>Tasks</span>
            </a>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/profile" aria-label="Profile">
                <a className="flex items-center space-x-1 hover:text-blue-300">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </a>
              </Link>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" aria-label="Login">
              <a className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Login
              </a>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;