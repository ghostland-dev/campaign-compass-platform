
import React from 'react';
import { Campaign } from '@/types';
import CampaignCard from '@/components/CampaignCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CampaignGridProps {
  campaigns: Campaign[];
  isGridView: boolean;
  onDelete: (id: string) => void;
  searchTerm: string;
  activeTab: string;
  onCreateCampaign: () => void;
}

const CampaignGrid: React.FC<CampaignGridProps> = ({ 
  campaigns,
  isGridView,
  onDelete,
  searchTerm,
  activeTab,
  onCreateCampaign
}) => {
  return (
    <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
      {campaigns.length > 0 ? (
        campaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12 bg-card rounded-lg shadow-sm border border-border">
          <p className="text-muted-foreground">
            {searchTerm.trim() 
              ? "Aucune campagne ne correspond à votre recherche."
              : activeTab !== "all"
                ? `Aucune campagne avec le statut "${activeTab}" trouvée.`
                : "Aucune campagne n'a encore été créée."}
          </p>
          {!searchTerm.trim() && activeTab === "all" && (
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={onCreateCampaign}
            >
              <Plus className="mr-2 h-4 w-4" /> Créer votre première campagne
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default CampaignGrid;
