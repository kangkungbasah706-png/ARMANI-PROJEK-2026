
import React from 'react';

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeView, setActiveView }) => {
  const menus = [
    { id: 'catalogue', label: 'Promotional Catalogue' },
    { id: 'detail', label: 'Detail Promotion' },
    { id: 'system', label: 'System Detection' },
    { id: 'bank', label: 'Bank Account' },
  ];

  return (
    <div className="w-full shrink-0 z-50">
      <header className="w-full bg-white border-b border-gray-100 h-[70px] flex items-center justify-between px-8 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center overflow-hidden shadow-md">
            <img src="https://i.pinimg.com/736x/28/65/0e/28650ea0dd7f4427b199c2c60fb8142b.jpg" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <h1 className="font-brand text-[18px] font-black text-gray-900 tracking-widest uppercase">
            GIORGIO ARMANI
          </h1>
        </div>

        <nav className="flex items-center gap-8">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveView(menu.id)}
              className={`text-[9.5px] font-black transition-all relative py-6 uppercase tracking-[0.2em] ${
                activeView === menu.id ? 'text-[#800000]' : 'text-gray-400 hover:text-gray-900'
              }`}
            >
              {menu.label}
              {activeView === menu.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#800000]"></span>
              )}
            </button>
          ))}
        </nav>
      </header>
    </div>
  );
};

export default Header;
