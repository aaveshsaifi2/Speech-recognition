import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { useTheme } from '../../contexts/ThemeContext';
import { ThemeToggle } from '../ui/Toggle';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  
  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-calmi-dark text-white' : 'bg-white text-gray-900'}`}>
      {/* Mobile sidebar toggle */}
      <button 
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md ${
          isDarkMode ? 'bg-calmi-dark-secondary text-white' : 'bg-white text-black'
        } shadow-md`}
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      
      {/* Sidebar - hidden on mobile unless toggled */}
      <div className={`fixed inset-y-0 left-0 transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition duration-200 ease-in-out lg:flex z-30 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <Sidebar isDarkMode={isDarkMode} />
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="flex justify-end items-center p-5 relative">
          <div className="flex items-center space-x-4">
            <ThemeToggle 
              isDarkMode={isDarkMode}
              onToggle={toggleTheme}
            />
           
            
          </div>
        </div>
        <main className="max-w-4xl mx-auto p-4">
          {children}
        </main>
      </div>
      
      {/* Backdrop for mobile sidebar */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        ></div>
      )}
    </div>
  );
};

export default MainLayout;