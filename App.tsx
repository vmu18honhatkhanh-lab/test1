
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { MetricCard } from './components/MetricCard';
import { TemperatureChart } from './components/TemperatureChart';
import { NavigationTab, EngineMetric, MaintenanceTask } from './types';
import { getSmartDiagnosis, DiagnosticInsight } from './services/geminiService';

const INITIAL_METRICS: EngineMetric[] = [
  { id: 'rpm', label: 'Vòng Tua (RPM)', value: 1250, unit: '', trend: 1.2, icon: 'settings_motion_mode' },
  { id: 'load', label: 'Tải Trọng (%)', value: 85, unit: '%', icon: 'speed' },
  { id: 'power', label: 'Công Suất (kW)', value: '8,500', unit: '', trend: 0.5, icon: 'bolt' },
  { id: 'fuel', label: 'Nhiên Liệu (L/h)', value: 185.2, unit: '', trend: 2.1, icon: 'local_gas_station' },
];

const PREDICTIVE_TASKS: MaintenanceTask[] = [
  {
    id: 't1',
    title: 'Kiểm tra kim phun',
    description: 'Dự báo áp suất phun giảm trên Xi lanh số 4. Đề xuất kiểm tra và vệ sinh.',
    deadline: '48h tới',
    severity: 'warning'
  }
];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>(NavigationTab.OVERVIEW);
  const [metrics, setMetrics] = useState<EngineMetric[]>(INITIAL_METRICS);
  const [diagnosis, setDiagnosis] = useState<DiagnosticInsight | null>(null);
  const [isLoadingDiagnosis, setIsLoadingDiagnosis] = useState(false);
  const [showAiDiagnosis, setShowAiDiagnosis] = useState(false);

  // Mock live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => {
        if (m.id === 'rpm') {
          const val = typeof m.value === 'number' ? m.value : 1250;
          return { ...m, value: val + Math.floor(Math.random() * 5) - 2 };
        }
        return m;
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleRunDiagnosis = async () => {
    setIsLoadingDiagnosis(true);
    setShowAiDiagnosis(true);
    const result = await getSmartDiagnosis(metrics);
    setDiagnosis(result);
    setIsLoadingDiagnosis(false);
  };

  return (
    <Layout 
      title="Tổng Quan Hệ Thống" 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {/* Engine Status Header Section */}
      <div className="px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-accent-success animate-pulse"></div>
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Hệ thống trực tuyến</span>
        </div>
        <div className="flex items-center gap-1 bg-surface-dark px-3 py-1.5 rounded-full border border-white/10 cursor-pointer hover:bg-surface-dark/80">
          <span className="text-white text-[10px] font-bold">Main Engine 1</span>
          <span className="material-symbols-outlined text-sm text-slate-400">expand_more</span>
        </div>
      </div>

      {/* Hero Status Card */}
      <div className="px-4">
        <div className="relative overflow-hidden rounded-2xl bg-surface-dark border border-white/5 shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-surface-dark/70 to-transparent z-10"></div>
            <div 
              className="w-full h-full bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000" 
              style={{ backgroundImage: `url('https://picsum.photos/id/183/800/600')` }}
            ></div>
          </div>
          
          <div className="relative z-20 p-6 flex flex-col gap-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Trạng thái vận hành</p>
                <h2 className="text-white text-4xl font-bold font-display tracking-tighter">BÌNH THƯỜNG</h2>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent-success/20 flex items-center justify-center text-accent-success border border-accent-success/30 shadow-[0_0_20px_rgba(11,218,94,0.3)]">
                <span className="material-symbols-outlined text-2xl fill-1">check_circle</span>
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div className="flex flex-col gap-0.5">
                <p className="text-slate-200 text-sm font-medium">Không có cảnh báo nghiêm trọng</p>
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Cập nhật: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
              <div className="flex gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                <div className="h-2 w-2 rounded-full bg-primary/40"></div>
                <div className="h-2 w-2 rounded-full bg-primary/20"></div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-surface-darker/50">
            <div className="h-full bg-gradient-to-r from-primary to-accent-success w-[88%] transition-all duration-1000 ease-in-out"></div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="px-4 pt-8 pb-3 flex items-center justify-between">
        <h3 className="text-white text-lg font-bold tracking-tight font-display">Chỉ Số Thời Gian Thực</h3>
        <button className="text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
          Chi tiết <span className="material-symbols-outlined text-xs">arrow_forward</span>
        </button>
      </div>

      <div className="px-4 grid grid-cols-2 gap-3">
        {metrics.map(metric => (
          <MetricCard key={metric.id} {...metric} />
        ))}
      </div>

      {/* AI Diagnosis CTA */}
      <div className="px-4 mt-6">
        <button 
          onClick={handleRunDiagnosis}
          disabled={isLoadingDiagnosis}
          className="w-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 p-4 rounded-xl flex items-center justify-between group hover:border-primary transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg text-primary">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <div className="text-left">
              <p className="text-white text-sm font-bold">Chẩn đoán thông minh (AI)</p>
              <p className="text-slate-400 text-[10px]">Phân tích dữ liệu bằng Gemini</p>
            </div>
          </div>
          {isLoadingDiagnosis ? (
            <div className="h-5 w-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">bolt</span>
          )}
        </button>
      </div>

      {/* AI Diagnosis Results Overlay/Section */}
      {showAiDiagnosis && (
        <div className="px-4 mt-4 animate-in slide-in-from-top duration-300">
          <div className="bg-surface-dark border border-primary/40 rounded-xl p-5 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 cursor-pointer text-slate-500 hover:text-white" onClick={() => setShowAiDiagnosis(false)}>
               <span className="material-symbols-outlined text-lg">close</span>
             </div>
             <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
               <span className="material-symbols-outlined text-sm">auto_awesome</span> Kết quả chẩn đoán
             </h4>
             {isLoadingDiagnosis ? (
               <div className="space-y-3">
                 <div className="h-4 bg-slate-700/50 rounded w-3/4 animate-pulse"></div>
                 <div className="h-4 bg-slate-700/50 rounded w-1/2 animate-pulse"></div>
               </div>
             ) : diagnosis ? (
               <div className="space-y-4">
                 <div className="flex items-center gap-2">
                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                     diagnosis.riskLevel === 'low' ? 'bg-accent-success/10 text-accent-success' : 
                     diagnosis.riskLevel === 'medium' ? 'bg-accent-warning/10 text-accent-warning' : 
                     'bg-accent-critical/10 text-accent-critical'
                   }`}>
                     Rủi ro: {diagnosis.riskLevel}
                   </span>
                 </div>
                 <p className="text-slate-300 text-sm italic leading-relaxed">"{diagnosis.summary}"</p>
                 <div className="space-y-2">
                   {diagnosis.recommendations.map((rec, i) => (
                     <div key={i} className="flex gap-2 text-xs text-slate-400">
                       <span className="text-primary font-bold">•</span>
                       <span>{rec}</span>
                     </div>
                   ))}
                 </div>
               </div>
             ) : (
               <p className="text-slate-500 text-xs italic">Không thể tải dữ liệu chẩn đoán.</p>
             )}
          </div>
        </div>
      )}

      {/* Temperature Chart Component */}
      <TemperatureChart />

      {/* Maintenance Section */}
      <div className="mt-8 px-4 pb-20">
        <h3 className="text-white text-lg font-bold tracking-tight font-display mb-3">Dự Báo Bảo Trì</h3>
        {PREDICTIVE_TASKS.map(task => (
          <div key={task.id} className="bg-surface-dark rounded-xl border border-l-4 border-l-accent-warning border-y-white/5 border-r-white/5 p-5 flex gap-4 items-start shadow-xl hover:translate-y-[-2px] transition-transform">
            <div className="bg-accent-warning/20 p-2.5 rounded-xl text-accent-warning shrink-0 shadow-inner">
              <span className="material-symbols-outlined text-2xl">build</span>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-1.5">
                <h4 className="text-white font-bold text-sm tracking-tight">{task.title}</h4>
                <span className="text-accent-warning text-[10px] font-bold bg-accent-warning/10 px-2 py-0.5 rounded-full border border-accent-warning/20">
                  {task.deadline}
                </span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">{task.description}</p>
              <button className="text-white text-[10px] font-bold bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 px-4 py-2 rounded-lg transition-all w-full uppercase tracking-widest">
                Chi tiết & Lên lịch
              </button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default App;
