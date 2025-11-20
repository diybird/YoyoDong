import React from 'react';
import { ModelData } from '../types';

interface StatsBarProps {
  models: ModelData[];
}

const StatsBar: React.FC<StatsBarProps> = ({ models }) => {
  const total = models.length;
  const multiCount = models.filter(m => m.category === 'Multimodal').length;
  const imageCount = models.filter(m => m.category === 'Image').length;
  const videoCount = models.filter(m => m.category === 'Video').length;
  const audioCount = models.filter(m => m.category === 'Audio').length;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12 bg-surface/50 backdrop-blur-sm border border-surfaceHighlight rounded-2xl p-6">
      <StatItem count={total} label="Total Models" />
      <StatItem count={multiCount} label="Multimodal" color="text-amber-400" />
      <StatItem count={imageCount} label="Image Models" color="text-pink-400" />
      <StatItem count={videoCount} label="Video Models" color="text-blue-400" />
      <StatItem count={audioCount} label="Audio Models" color="text-purple-400" />
    </div>
  );
};

const StatItem = ({ count, label, color = "text-white" }: { count: number, label: string, color?: string }) => (
  <div className="text-center">
    <div className={`text-3xl font-bold ${color} mb-1`}>{count}</div>
    <div className="text-sm text-gray-500 font-medium">{label}</div>
  </div>
);

export default StatsBar;