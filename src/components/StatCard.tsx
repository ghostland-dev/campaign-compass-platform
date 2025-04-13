
import React from 'react';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';
import { Stat } from '@/types';
import { cn } from '@/lib/utils';

interface StatCardProps {
  stat: Stat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const isPositive = stat.change ? stat.change > 0 : false;
  const isNegative = stat.change ? stat.change < 0 : false;

  return (
    <div className="stats-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
          <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
        </div>
        {stat.icon && <div className="text-muted-foreground">{stat.icon}</div>}
      </div>
      {stat.change !== undefined && (
        <div className="mt-4 flex items-center">
          <span
            className={cn(
              'text-xs font-medium flex items-center',
              isPositive ? 'text-green-600' : '',
              isNegative ? 'text-red-600' : '',
              !isPositive && !isNegative ? 'text-gray-600' : ''
            )}
          >
            {isPositive && <ArrowUpIcon className="h-3 w-3 mr-1" />}
            {isNegative && <ArrowDownIcon className="h-3 w-3 mr-1" />}
            {isPositive && '+'}
            {stat.change > 0 ? stat.change : stat.change}
            {typeof stat.value === 'string' && stat.value.includes('%') ? '%' : ''}
          </span>
          <span className="text-xs text-muted-foreground ml-1">vs dernier mois</span>
        </div>
      )}
    </div>
  );
};

export default StatCard;
