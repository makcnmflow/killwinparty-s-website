import React from 'react';
import { PageState } from '../../types';
import { Home, User, Image, Gamepad2 } from 'lucide-react';

interface NavbarProps {
  currentPage: PageState;
  onNavigate: (page: PageState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: PageState.HOME, label: 'Home', icon: Home },
    { id: PageState.BIO, label: 'Bio', icon: User },
    { id: PageState.ARCADE, label: 'Arcade', icon: Gamepad2 },
  ];

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:top-6 md:bottom-auto w-[90%] md:w-auto">
      <div className="flex items-center justify-between md:justify-center gap-1 md:gap-4 p-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl ring-1 ring-white/5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              relative px-4 py-3 md:px-6 md:py-3 rounded-xl flex items-center gap-2 transition-all duration-300 group
              ${currentPage === item.id 
                ? 'bg-purple-600/80 text-white shadow-[0_0_20px_rgba(147,51,234,0.5)]' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            <item.icon size={20} className={`transition-transform duration-300 ${currentPage === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
            <span className={`${currentPage === item.id ? 'block' : 'hidden md:block'} text-sm font-medium`}>
              {item.label}
            </span>
            
            {/* Glowing Indicator for active tab */}
            {currentPage === item.id && (
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};
