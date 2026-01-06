
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  showSignIn?: boolean;
  isTransparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showSignIn = true, isTransparent = true }) => {
  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 ${isTransparent ? 'bg-transparent' : 'bg-black border-b border-gray-200'}`}>
      <div 
        className="text-[#e50914] text-2xl md:text-4xl font-black tracking-tighter cursor-pointer"
        onClick={() => navigate('/')}
      >
        NETFLIX
      </div>
      
      <div className="flex items-center space-x-4">
        {showSignIn && (
          <>
            <div className="relative inline-block text-left">
              <select className="bg-black/50 text-white border border-gray-500 rounded px-4 py-1 text-sm appearance-none cursor-pointer">
                <option>English</option>
                <option>हिन्दी</option>
              </select>
            </div>
            <button className="bg-[#e50914] text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-[#b20710] transition-colors">
              Sign In
            </button>
          </>
        )}
        {!showSignIn && (
          <button 
            className="text-black font-bold text-lg hover:underline"
            onClick={() => navigate('/')}
          >
            Sign Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
