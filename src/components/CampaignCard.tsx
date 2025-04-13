
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Campaign } from '@/types';
import CampaignStatus from './campaign/CampaignStatus';
import CampaignProgress from './campaign/CampaignProgress';
import CampaignTeam from './campaign/CampaignTeam';
import CampaignChannels from './campaign/CampaignChannels';
import CampaignActions from './campaign/CampaignActions';

interface CampaignCardProps {
  campaign: Campaign;
  onDelete: (id: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDelete }) => {
  // Calculate days left and progress
  const calculateDaysLeft = () => {
    const endDate = new Date(campaign.endDate);
    const today = new Date();
    
    if (today > endDate) return 0;
    
    return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  const calculateProgress = () => {
    const endDate = new Date(campaign.endDate);
    const startDate = new Date(campaign.startDate);
    const today = new Date();
    
    if (today < startDate) return 0;
    if (today > endDate) return 100;
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.min(100, Math.max(0, Math.floor((daysPassed / totalDays) * 100)));
  };
  
  const daysLeft = calculateDaysLeft();
  const progress = calculateProgress();
  
  return (
    <div className="bg-card text-card-foreground rounded-lg shadow-sm p-6 border border-border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Link to={`/campaign/${campaign.id}`} className="text-lg font-semibold hover:text-primary transition-colors">
            {campaign.title}
          </Link>
          <div className="flex items-center mt-1">
            <CampaignStatus status={campaign.status} />
            <span className="ml-2 text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" /> 
              {campaign.startDate}
            </span>
          </div>
        </div>
        <CampaignActions campaignId={campaign.id} onDelete={onDelete} />
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {campaign.description || "Aucune description disponible pour cette campagne."}
      </p>
      
      <CampaignProgress progress={progress} daysLeft={daysLeft} />
      
      <div className="mt-4 flex">
        <CampaignTeam team={campaign.team} />
        <CampaignChannels channels={campaign.channels} />
      </div>
    </div>
  );
};

export default CampaignCard;
