
import React from 'react';
import Layout from '@/components/Layout';
import CampaignModal from '@/components/campaign-modal';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useCampaigns } from '@/hooks/useCampaigns';
import CampaignHeader from '@/components/campaigns/CampaignHeader';
import CampaignFilters from '@/components/campaigns/CampaignFilters';
import CampaignGrid from '@/components/campaigns/CampaignGrid';
import { motion } from 'framer-motion';

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
      <div className="flex flex-col space-y-8 animate-fade-in">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CampaignHeader onCreateCampaign={() => setShowCampaignModal(true)} />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <CampaignFilters
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              isGridView={isGridView}
              setIsGridView={setIsGridView}
            />
            
            <TabsContent value={activeTab} className="mt-6">
              <CampaignGrid
                campaigns={campaigns}
                isGridView={isGridView}
                onDelete={handleDeleteCampaign}
                searchTerm={searchTerm}
                activeTab={activeTab}
                onCreateCampaign={() => setShowCampaignModal(true)}
              />
            </TabsContent>
          </Tabs>
        </motion.div>
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
