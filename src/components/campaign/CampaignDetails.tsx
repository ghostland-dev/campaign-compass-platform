
import React from 'react';
import { Calendar } from 'lucide-react';
import { Campaign } from '@/types';

interface CampaignDetailsContentProps {
  campaign: Campaign;
}

const CampaignDetailsContent: React.FC<CampaignDetailsContentProps> = ({ campaign }) => {
  return (
    <>
      <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
        <h2 className="text-xl font-semibold mb-4">Description</h2>
        <p className="text-gray-700">
          {campaign.description || "Aucune description disponible pour cette campagne."}
        </p>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
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
