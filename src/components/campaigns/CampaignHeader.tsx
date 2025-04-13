
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CampaignHeaderProps {
  onCreateCampaign: () => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ onCreateCampaign }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold">Campagnes</h1>
        <p className="text-muted-foreground mt-1">
          Gérez toutes vos campagnes marketing
        </p>
      </div>
      <Button onClick={onCreateCampaign}>
        <Plus className="mr-2 h-4 w-4" /> Nouvelle Campagne
      </Button>
    </div>
  );
};

export default CampaignHeader;
