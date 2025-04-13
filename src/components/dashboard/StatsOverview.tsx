
import React from 'react';
import { Check, Presentation, Target, TrendingUp } from 'lucide-react';
import StatCard from '@/components/StatCard';
import { Stat } from '@/types';
import { mockStats } from '@/data/mockData';

const StatsOverview: React.FC = () => {
  // Enhanced stats with icons
  const statsWithIcons: Stat[] = [
    {
      ...mockStats[0],
      icon: <Check className="h-5 w-5" />,
    },
    {
      ...mockStats[1],
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      ...mockStats[2],
      icon: <Presentation className="h-5 w-5" />,
    },
    {
      ...mockStats[3],
      icon: <Target className="h-5 w-5" />,
    },
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsWithIcons.map((stat, index) => (
        <StatCard key={index} stat={stat} />
      ))}
    </div>
  );
};

export default StatsOverview;
