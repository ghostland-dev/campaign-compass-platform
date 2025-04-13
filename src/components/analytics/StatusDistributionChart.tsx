
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Campaign } from '@/types';

interface StatusDistributionChartProps {
  campaigns: Campaign[];
  colors: string[];
}

const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({ campaigns, colors }) => {
  // Prepare data for the chart
  const statusData = [
    { name: 'Actives', value: campaigns.filter(c => c.status === 'active').length },
    { name: 'Brouillons', value: campaigns.filter(c => c.status === 'draft').length },
    { name: 'Terminées', value: campaigns.filter(c => c.status === 'completed').length },
    { name: 'En pause', value: campaigns.filter(c => c.status === 'paused').length }
  ].filter(item => item.value > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statut des campagnes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
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

export default StatusDistributionChart;
