
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getCampaigns } from '@/services/storageService';
import { Campaign } from '@/types';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

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
  
  // Données pour les graphiques
  const channelData = [
    { name: 'Email', value: campaigns.filter(c => c.channels.includes('email')).length },
    { name: 'Réseaux sociaux', value: campaigns.filter(c => c.channels.includes('social')).length },
    { name: 'Blog', value: campaigns.filter(c => c.channels.includes('blog')).length },
    { name: 'Publicités', value: campaigns.filter(c => c.channels.includes('ads')).length },
    { name: 'Autre', value: campaigns.filter(c => c.channels.includes('other')).length }
  ].filter(item => item.value > 0);
  
  const statusData = [
    { name: 'Actives', value: campaigns.filter(c => c.status === 'active').length },
    { name: 'Brouillons', value: campaigns.filter(c => c.status === 'draft').length },
    { name: 'Terminées', value: campaigns.filter(c => c.status === 'completed').length },
    { name: 'En pause', value: campaigns.filter(c => c.status === 'paused').length }
  ].filter(item => item.value > 0);
  
  const performanceData = campaigns.map(campaign => ({
    name: campaign.title.substring(0, 15) + (campaign.title.length > 15 ? '...' : ''),
    impressions: campaign.metrics?.impressions || 0,
    clicks: campaign.metrics?.clicks || 0,
    conversions: campaign.metrics?.conversions || 0,
    ctr: campaign.metrics ? Math.round((campaign.metrics.clicks / campaign.metrics.impressions) * 100) / 100 : 0
  }));
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Analyses</h1>
        
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="channels">Canaux</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
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
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="mt-6">
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
          </TabsContent>
          
          <TabsContent value="channels" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Taux de conversion par canal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { name: 'Email', taux: 3.2 },
                        { name: 'Réseaux sociaux', taux: 2.1 },
                        { name: 'Blog', taux: 1.8 },
                        { name: 'Publicités', taux: 2.8 },
                        { name: 'Autre', taux: 1.5 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value}%`, 'Taux de conversion']} />
                      <Legend />
                      <Line type="monotone" dataKey="taux" stroke="#8884d8" activeDot={{ r: 8 }} name="Taux de conversion (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Analytics;
