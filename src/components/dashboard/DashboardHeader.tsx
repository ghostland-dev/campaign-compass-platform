
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardHeaderProps {
  onCreateCampaign: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onCreateCampaign }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">Tableau de Bord</h1>
        <p className="text-muted-foreground mt-1">
          Gérez et surveillez vos campagnes marketing
        </p>
      </div>
      <Button className="mt-4 md:mt-0" onClick={onCreateCampaign}>
        <Plus className="mr-2 h-4 w-4" /> Nouvelle Campagne
      </Button>
    </div>
  );
};

export default DashboardHeader;
