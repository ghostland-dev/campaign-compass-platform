
import React from 'react';
import { CampaignStatus as StatusType } from '@/types';

interface CampaignStatusProps {
  status: StatusType;
}

const CampaignStatus: React.FC<CampaignStatusProps> = ({ status }) => {
  // Status color mapping
  const getStatusColor = (status: StatusType) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: StatusType) => {
    return status === 'active' ? 'Active' : 
           status === 'draft' ? 'Planifiée' : 
           status === 'completed' ? 'Terminée' : 'En pause';
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusLabel(status)}
    </span>
  );
};

export default CampaignStatus;
