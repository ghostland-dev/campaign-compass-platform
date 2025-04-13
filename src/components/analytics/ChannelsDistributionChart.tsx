
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/types';

interface ChannelsDistributionChartProps {
  campaigns: Campaign[];
  colors: string[];
}

const ChannelsDistributionChart: React.FC<ChannelsDistributionChartProps> = ({ campaigns, colors }) => {
  // Prepare data for the chart
  const channelData = [
    { name: 'Email', value: campaigns.filter(c => c.channels.includes('email')).length },
    { name: 'Réseaux sociaux', value: campaigns.filter(c => c.channels.includes('social')).length },
    { name: 'Blog', value: campaigns.filter(c => c.channels.includes('blog')).length },
    { name: 'Publicités', value: campaigns.filter(c => c.channels.includes('ads')).length },
    { name: 'Autre', value: campaigns.filter(c => c.channels.includes('other')).length }
  ].filter(item => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition par canal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={channelData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {channelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelsDistributionChart;
