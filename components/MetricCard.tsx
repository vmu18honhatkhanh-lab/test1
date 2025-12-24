
import React from 'react';
import { EngineMetric } from '../types';

export const MetricCard: React.FC<EngineMetric> = ({ label, value, unit, trend, icon }) => {
  return (
    <div className="bg-surface-dark p-4 rounded-xl border border-white/5 flex flex-col gap-3 relative overflow-hidden group hover:border-primary/50 transition-all cursor-pointer">
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/5 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
      
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-lg bg-surface-darker text-primary w-fit shadow-inner">
          <span className="material-symbols-outlined text-lg">{icon}</span>
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-bold flex items-center px-1.5 py-0.5 rounded-full ${trend >= 0 ? 'text-accent-success bg-accent-success/10' : 'text-accent-critical bg-accent-critical/10'}`}>
            <span className="material-symbols-outlined text-xs mr-0.5">
              {trend >= 0 ? 'trending_up' : 'trending_down'}
            </span>
            {Math.abs(trend)}%
          </span>
        )}
      </div>

      <div>
        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">{label}</p>
        <div className="flex items-baseline gap-1">
          <p className="text-white text-2xl font-bold font-display tracking-tight">{value}</p>
          <span className="text-xs text-slate-500 font-medium">{unit}</span>
        </div>
      </div>
    </div>
  );
};
