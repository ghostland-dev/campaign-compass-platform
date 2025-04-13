
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StatusDistributionChart from './StatusDistributionChart';
import ChannelsDistributionChart from './ChannelsDistributionChart';
import CampaignPerformanceChart from './CampaignPerformanceChart';
import ChannelConversionChart from './ChannelConversionChart';
import { Campaign } from '@/types';

interface AnalyticsTabsProps {
  campaigns: Campaign[];
  colors: string[];
}

const AnalyticsTabs: React.FC<AnalyticsTabsProps> = ({ campaigns, colors }) => {
  return (
    <Tabs defaultValue="overview" className="mb-8">
      <TabsList>
        <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
        <TabsTrigger value="performance">Performance</TabsTrigger>
        <TabsTrigger value="channels">Canaux</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatusDistributionChart campaigns={campaigns} colors={colors} />
          <ChannelsDistributionChart campaigns={campaigns} colors={colors} />
        </div>
      </TabsContent>
      
      <TabsContent value="performance" className="mt-6">
        <CampaignPerformanceChart campaigns={campaigns} />
      </TabsContent>
      
      <TabsContent value="channels" className="mt-6">
        <ChannelConversionChart />
      </TabsContent>
    </Tabs>
  );
};

export default AnalyticsTabs;
