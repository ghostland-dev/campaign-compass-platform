
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { getCampaigns } from '@/services/storageService';
import { Campaign } from '@/types';
import AnalyticsTabs from '@/components/analytics/AnalyticsTabs';
import { CHART_COLORS } from '@/components/analytics/constants';

const Analytics = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  
  useEffect(() => {
    const storedCampaigns = getCampaigns();
    
    // Ajouter des métriques simulées pour la démonstration
    const campaignsWithMetrics = storedCampaigns.map(campaign => ({
      ...campaign,
      metrics: {
        impressions: Math.floor(Math.random() * 10000),
        clicks: Math.floor(Math.random() * 2000),
        conversions: Math.floor(Math.random() * 300),
        engagement: Math.floor(Math.random() * 5000)
      }
    }));
    
    setCampaigns(campaignsWithMetrics);
  }, []);
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Analyses</h1>
      <AnalyticsTabs campaigns={campaigns} colors={CHART_COLORS} />
    </Layout>
  );
};

export default Analytics;
