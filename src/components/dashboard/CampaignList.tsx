
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CampaignCard from '@/components/CampaignCard';
import { Campaign } from '@/types';

interface CampaignListProps {
  campaigns: Campaign[];
  onDelete: (campaignId: string) => void;
  onCreateCampaign: () => void;
}

const CampaignList: React.FC<CampaignListProps> = ({ 
  campaigns, 
  onDelete, 
  onCreateCampaign 
}) => {
  // Filter campaigns by status
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
  const draftCampaigns = campaigns.filter(campaign => campaign.status === 'draft');
  const completedCampaigns = campaigns.filter(campaign => campaign.status === 'completed');
  
  return (
    <Tabs defaultValue="all" className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Campagnes</h2>
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="active">Actives</TabsTrigger>
          <TabsTrigger value="draft">Brouillons</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="all" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.length > 0 ? (
            campaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onDelete={onDelete} 
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 bg-muted dark:bg-muted/40 rounded-lg border border-dashed">
              <p className="text-muted-foreground">Aucune campagne disponible</p>
              <Button 
                className="mt-4" 
                onClick={onCreateCampaign}
              >
                <Plus className="mr-2 h-4 w-4" /> Créer une campagne
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="active" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCampaigns.length > 0 ? (
            activeCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 bg-muted dark:bg-muted/40 rounded-lg border border-dashed">
              <p className="text-muted-foreground">Aucune campagne active</p>
              <Button 
                className="mt-4" 
                onClick={onCreateCampaign}
              >
                <Plus className="mr-2 h-4 w-4" /> Créer une campagne
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="draft" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {draftCampaigns.length > 0 ? (
            draftCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 bg-muted dark:bg-muted/40 rounded-lg border border-dashed">
              <p className="text-muted-foreground">Aucun brouillon disponible</p>
              <Button 
                className="mt-4" 
                onClick={onCreateCampaign}
              >
                <Plus className="mr-2 h-4 w-4" /> Créer un brouillon
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="completed" className="mt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedCampaigns.length > 0 ? (
            completedCampaigns.map(campaign => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign} 
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="col-span-2 text-center py-8 bg-muted dark:bg-muted/40 rounded-lg border border-dashed">
              <p className="text-muted-foreground">Aucune campagne terminée</p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CampaignList;
