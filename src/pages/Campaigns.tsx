
import React from 'react';
import Layout from '@/components/Layout';
import CampaignModal from '@/components/CampaignModal';
import { TabsContent } from "@/components/ui/tabs";
import { useCampaigns } from '@/hooks/useCampaigns';
import CampaignHeader from '@/components/campaigns/CampaignHeader';
import CampaignFilters from '@/components/campaigns/CampaignFilters';
import CampaignGrid from '@/components/campaigns/CampaignGrid';

const Campaigns = () => {
  const {
    campaigns,
    searchTerm,
    setSearchTerm,
    isGridView,
    setIsGridView,
    showCampaignModal,
    setShowCampaignModal,
    activeTab,
    setActiveTab,
    handleCreateCampaign,
    handleDeleteCampaign
  } = useCampaigns();
  
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <CampaignHeader onCreateCampaign={() => setShowCampaignModal(true)} />
        
        <CampaignFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isGridView={isGridView}
          setIsGridView={setIsGridView}
        />
        
        <TabsContent value={activeTab} className="mt-0">
          <CampaignGrid
            campaigns={campaigns}
            isGridView={isGridView}
            onDelete={handleDeleteCampaign}
            searchTerm={searchTerm}
            activeTab={activeTab}
            onCreateCampaign={() => setShowCampaignModal(true)}
          />
        </TabsContent>
      </div>
      
      <CampaignModal 
        open={showCampaignModal} 
        onOpenChange={setShowCampaignModal}
        onSubmit={handleCreateCampaign}
      />
    </Layout>
  );
};

export default Campaigns;
