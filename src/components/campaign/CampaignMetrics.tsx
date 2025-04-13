
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Campaign } from '@/types';

interface CampaignMetricsProps {
  campaign: Campaign;
}

const CampaignMetrics: React.FC<CampaignMetricsProps> = ({ campaign }) => {
  // Calculate days left and progress
  const calculateDaysLeft = () => {
    const endDate = new Date(campaign.endDate);
    const startDate = new Date(campaign.startDate);
    const today = new Date();
    
    if (today > endDate) return 0;
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.max(0, daysLeft);
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="text-sm text-muted-foreground mb-1">Progression</div>
        <div className="flex items-center mb-2">
          <Progress value={progress} className="h-2 flex-1" />
          <span className="ml-2 text-sm font-medium">{progress}%</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {daysLeft} jour{daysLeft !== 1 ? 's' : ''} restant{daysLeft !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="text-sm text-muted-foreground mb-1">Canaux</div>
        <div className="flex flex-wrap gap-2 mt-2">
          {campaign.channels.map(channel => (
            <span 
              key={channel}
              className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium"
            >
              {channel === 'email' ? 'Email' : 
               channel === 'social' ? 'Réseaux Sociaux' : 
               channel === 'blog' ? 'Blog' : 
               channel === 'ads' ? 'Ads' : 'Autre'}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="text-sm text-muted-foreground mb-1">Équipe</div>
        <div className="flex items-center mt-2">
          <div className="flex -space-x-2">
            {campaign.team.map((member, index) => (
              <div 
                key={index}
                className="h-8 w-8 rounded-full bg-marketing-primary text-white flex items-center justify-center text-xs font-medium border-2 border-white"
              >
                {member.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
          <span className="ml-3 text-sm">{campaign.owner}</span>
        </div>
      </div>
    </div>
  );
};

export default CampaignMetrics;
