
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useToast } from '@/hooks/use-toast';
import { Campaign } from '@/types';
import { getCampaigns, deleteCampaign, deleteCalendarEventsForCampaign } from '@/services/storageService';
import CampaignHeader from '@/components/campaign/CampaignHeader';
import CampaignMetrics from '@/components/campaign/CampaignMetrics';
import CampaignDetailsContent from '@/components/campaign/CampaignDetails';
import CampaignLoading from '@/components/campaign/CampaignLoading';

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaign = () => {
      setLoading(true);
      const campaigns = getCampaigns();
      const foundCampaign = campaigns.find(c => c.id === id);
      
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
      setLoading(false);
    };

    loadCampaign();
  }, [id]);

  const handleDelete = () => {
    if (!campaign) return;
    
    deleteCampaign(campaign.id);
    deleteCalendarEventsForCampaign(campaign.id);
    
    toast({
      title: "Campagne supprimée",
      description: `La campagne "${campaign.title}" a été supprimée avec succès.`,
    });
    
    navigate('/');
  };

  if (loading) {
    return <CampaignLoading />;
  }

  if (!campaign) {
    return <CampaignLoading notFound={true} />;
  }

  return (
    <Layout>
      <CampaignHeader campaign={campaign} onDelete={handleDelete} />
      <CampaignMetrics campaign={campaign} />
      <CampaignDetailsContent campaign={campaign} />
    </Layout>
  );
};

export default CampaignDetails;
