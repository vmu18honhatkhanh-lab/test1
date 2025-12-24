
import React, { useState } from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const data1H = [
  { time: '10:00', temp: 380 },
  { time: '10:05', temp: 395 },
  { time: '10:10', temp: 410 },
  { time: '10:15', temp: 405 },
  { time: '10:20', temp: 425 },
  { time: '10:25', temp: 440 },
  { time: '10:30', temp: 460 },
  { time: '10:35', temp: 455 },
  { time: '10:40', temp: 440 },
  { time: '10:45', temp: 430 },
  { time: '10:50', temp: 425 },
  { time: '10:55', temp: 415 },
  { time: '11:00', temp: 400 },
];

const data24H = [
  { time: '00:00', temp: 350 },
  { time: '04:00', temp: 370 },
  { time: '08:00', temp: 420 },
  { time: '12:00', temp: 450 },
  { time: '16:00', temp: 430 },
  { time: '20:00', temp: 390 },
];

export const TemperatureChart: React.FC = () => {
  const [range, setRange] = useState<'1H' | '24H'>('1H');
  const data = range === '1H' ? data1H : data24H;
  const currentTemp = data[data.length - 1].temp;

  return (
    <div className="mt-6 px-4">
      <h3 className="text-white text-lg font-bold leading-tight tracking-tight font-display mb-3">Biểu Đồ Nhiệt Độ Khí Xả</h3>
      <div className="bg-surface-dark p-5 rounded-xl border border-white/5 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-slate-400 text-xs font-medium">Trung bình hiện tại</p>
            <p className="text-white text-2xl font-bold font-display">{currentTemp}°C</p>
          </div>
          <div className="flex gap-1.5 bg-surface-darker p-1 rounded-lg">
            {(['1H', '24H'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
                  range === r ? 'bg-primary text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="h-44 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                interval={range === '1H' ? 3 : 0}
              />
              <YAxis 
                hide 
                domain={[300, 500]}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                contentStyle={{ 
                  backgroundColor: '#1e293b', 
                  borderColor: '#1e293b', 
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.5)'
                }}
                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                labelStyle={{ display: 'none' }}
                formatter={(value: number) => [`${value}°C`, 'Nhiệt độ']}
              />
              <Bar dataKey="temp" radius={[4, 4, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.temp > 440 ? '#f59e0b' : '#135bec'} 
                    fillOpacity={0.4 + (index / data.length) * 0.6}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
