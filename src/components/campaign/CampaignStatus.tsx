
import React from 'react';
import { CampaignStatus as StatusType } from '@/types';
import { cn } from '@/lib/utils';

interface CampaignStatusProps {
  status: StatusType;
}

const CampaignStatus: React.FC<CampaignStatusProps> = ({ status }) => {
  // Status color mapping
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'draft':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'completed':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status: StatusType) => {
    return status === 'active' ? 'Active' : 
           status === 'draft' ? 'Planifiée' : 
           status === 'completed' ? 'Terminée' : 'En pause';
  };

  return (
    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor(status))}>
      {getStatusLabel(status)}
    </span>
  );
};

export default CampaignStatus;
