
import React from 'react';
import { NavigationTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  title: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, title }) => {
  return (
    <div className="flex h-screen w-full flex-col max-w-md mx-auto overflow-hidden shadow-2xl bg-background-dark relative">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 flex items-center bg-surface-darker/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-white/5">
        <div className="text-white flex size-12 shrink-0 items-center cursor-pointer hover:opacity-70 transition-opacity">
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </div>
        <h2 className="text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center font-display uppercase">{title}</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex items-center justify-center rounded-lg h-12 bg-transparent text-white p-0 relative hover:text-primary transition-colors">
            <span className="absolute top-3 right-0 h-2 w-2 rounded-full bg-accent-success animate-pulse"></span>
            <span className="material-symbols-outlined text-2xl">notifications</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto hide-scrollbar pb-32">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-surface-darker/95 backdrop-blur-xl border-t border-white/5 pb-8 pt-3 px-6 flex justify-between items-center z-50 max-w-md mx-auto">
        <NavButton 
          isActive={activeTab === NavigationTab.OVERVIEW} 
          icon="dashboard" 
          label="Tổng quan" 
          onClick={() => onTabChange(NavigationTab.OVERVIEW)}
        />
        <NavButton 
          isActive={activeTab === NavigationTab.DETAILS} 
          icon="analytics" 
          label="Chi tiết" 
          onClick={() => onTabChange(NavigationTab.DETAILS)}
        />
        <NavButton 
          isActive={activeTab === NavigationTab.HISTORY} 
          icon="history" 
          label="Nhật ký" 
          onClick={() => onTabChange(NavigationTab.HISTORY)}
        />
        <NavButton 
          isActive={activeTab === NavigationTab.SETTINGS} 
          icon="settings" 
          label="Cài đặt" 
          onClick={() => onTabChange(NavigationTab.SETTINGS)}
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  isActive: boolean;
  icon: string;
  label: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ isActive, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 w-16 transition-all duration-300 ${isActive ? 'text-primary scale-110' : 'text-slate-500 hover:text-slate-300'}`}
  >
    <span className={`material-symbols-outlined text-2xl ${isActive ? 'fill-1' : ''}`}>{icon}</span>
    <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
  </button>
);
