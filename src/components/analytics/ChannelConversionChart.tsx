
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ChannelConversionChart: React.FC = () => {
  // Static data for the chart
  const conversionData = [
    { name: 'Email', taux: 3.2 },
    { name: 'Réseaux sociaux', taux: 2.1 },
    { name: 'Blog', taux: 1.8 },
    { name: 'Publicités', taux: 2.8 },
    { name: 'Autre', taux: 1.5 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Taux de conversion par canal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={conversionData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Taux de conversion']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="taux" 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
                name="Taux de conversion (%)" 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChannelConversionChart;
