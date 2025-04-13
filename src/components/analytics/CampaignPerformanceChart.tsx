
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/types';

interface CampaignPerformanceChartProps {
  campaigns: Campaign[];
}

const CampaignPerformanceChart: React.FC<CampaignPerformanceChartProps> = ({ campaigns }) => {
  // Prepare data for the chart
  const performanceData = campaigns.map(campaign => ({
    name: campaign.title.substring(0, 15) + (campaign.title.length > 15 ? '...' : ''),
    impressions: campaign.metrics?.impressions || 0,
    clicks: campaign.metrics?.clicks || 0,
    conversions: campaign.metrics?.conversions || 0,
    ctr: campaign.metrics ? Math.round((campaign.metrics.clicks / campaign.metrics.impressions) * 100) / 100 : 0
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance des campagnes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={performanceData}
              margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="impressions" fill="#8884d8" name="Impressions" />
              <Bar dataKey="clicks" fill="#82ca9d" name="Clics" />
              <Bar dataKey="conversions" fill="#ffc658" name="Conversions" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CampaignPerformanceChart;
