
import React, { useState, useEffect, useCallback } from 'react';
import { RELATIONSHIP_START_DATE } from '../constants';
import { TimeDiff } from '../types';

const TimeCounter: React.FC = () => {
  const [time, setTime] = useState<TimeDiff>({ days: 0, hours: 0, minutes: 0, seconds: 0, totalMs: 0 });

  const calculateTime = useCallback(() => {
    const now = new Date();
    const diff = now.getTime() - RELATIONSHIP_START_DATE.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    setTime({ days, hours, minutes, seconds, totalMs: diff });
  }, []);

  useEffect(() => {
    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [calculateTime]);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <span className="text-4xl md:text-6xl font-serif font-bold text-pink-600 drop-shadow-sm">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-xs md:text-sm tracking-widest text-pink-400 font-medium mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-col items-center py-8">
      <div className="mb-6 text-center">
        <h2 className="text-xl font-cursive text-pink-500 mb-2">我们的无限故事始于</h2>
        <p className="text-sm text-gray-500 italic">2025年2月9日 01:17</p>
      </div>
      
      <div className="flex flex-wrap justify-center items-center bg-white/40 p-6 rounded-3xl backdrop-blur-md shadow-inner border border-white/50">
        <TimeUnit value={time.days} label="天" />
        <div className="text-pink-300 text-3xl hidden md:block">:</div>
        <TimeUnit value={time.hours} label="小时" />
        <div className="text-pink-300 text-3xl hidden md:block">:</div>
        <TimeUnit value={time.minutes} label="分" />
        <div className="text-pink-300 text-3xl hidden md:block">:</div>
        <TimeUnit value={time.seconds} label="秒" />
      </div>
      
      <p className="mt-8 text-pink-700 font-cursive text-2xl animate-pulse">
        每一秒的跳动，都是为你...
      </p>
    </div>
  );
};

export default TimeCounter;
