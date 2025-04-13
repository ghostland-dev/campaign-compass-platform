
import React from 'react';
import { Calendar } from 'lucide-react';
import { Campaign } from '@/types';
import CampaignChannelDetails from './CampaignChannelDetails';

interface CampaignDetailsContentProps {
  campaign: Campaign;
}

const CampaignDetailsContent: React.FC<CampaignDetailsContentProps> = ({ campaign }) => {
  return (
    <>
      <div className="bg-card rounded-lg p-6 shadow-sm mb-8 border border-border">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-muted-foreground">
          {campaign.description || "Aucune description disponible pour cette campagne."}
        </p>
      </div>
      
      <CampaignChannelDetails campaign={campaign} />
      
      <div className="bg-card rounded-lg p-6 shadow-sm border border-border mt-8">
        <h2 className="text-xl font-semibold mb-4">Calendrier de la campagne</h2>
        <div className="flex items-center text-muted-foreground text-sm mb-6">
          <Calendar className="h-4 w-4 mr-2" />
          Événements programmés pour cette campagne
        </div>
        
        <div className="text-center py-8 text-muted-foreground">
          Cette fonctionnalité sera bientôt disponible
        </div>
      </div>
    </>
  );
};

export default CampaignDetailsContent;
