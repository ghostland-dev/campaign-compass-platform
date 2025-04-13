
import React from 'react';
import { Progress } from '@/components/ui/progress';

interface CampaignProgressProps {
  progress: number;
  daysLeft: number;
}

const CampaignProgress: React.FC<CampaignProgressProps> = ({ progress, daysLeft }) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-muted-foreground">Progression</span>
        <span className="font-medium">{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
      <div className="mt-2 text-xs text-muted-foreground">
        {daysLeft} jour{daysLeft !== 1 ? 's' : ''} restant{daysLeft !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default CampaignProgress;
