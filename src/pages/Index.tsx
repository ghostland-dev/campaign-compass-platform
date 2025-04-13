
import React, { useState, useEffect } from 'react';
import { Check, Plus, Presentation, Target, Trash2, TrendingUp, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import StatCard from '@/components/StatCard';
import CampaignCard from '@/components/CampaignCard';
import Calendar from '@/components/Calendar';
import CampaignModal from '@/components/CampaignModal';
import { mockCalendarEvents, mockStats } from '@/data/mockData';
import { Stat, Campaign, CalendarEvent } from '@/types';
import { 
  getCampaigns, 
  saveCampaigns, 
  addCampaign, 
  getCalendarEvents, 
  addCalendarEvent,
  deleteCampaign,
  deleteCalendarEventsForCampaign 
} from '@/services/storageService';

const Index = () => {
  const { toast } = useToast();
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  
  // Charger les données depuis localStorage au chargement de la page
  useEffect(() => {
    const storedCampaigns = getCampaigns();
    if (storedCampaigns.length > 0) {
      setCampaigns(storedCampaigns);
    } else {
      // Utiliser les données mock pour la première initialisation
      saveCampaigns([]); // Initialiser avec un tableau vide
      setCampaigns([]);
    }
    
    const storedEvents = getCalendarEvents();
    if (storedEvents.length > 0) {
      setCalendarEvents(storedEvents);
    } else {
      // Utiliser les données mock pour la première initialisation
      setCalendarEvents(mockCalendarEvents);
    }
  }, []);
  
  const handleCreateCampaign = (formData: any) => {
    const newCampaign: Campaign = {
      id: `camp${Date.now()}`,  // Utiliser un timestamp pour l'ID
      title: formData.title,
      description: formData.description || '',
      status: formData.status,
      startDate: formData.startDate.toISOString().split('T')[0],
      endDate: formData.endDate.toISOString().split('T')[0],
      channels: formData.channels,
      owner: 'user1',
      team: ['team1'],
    };
    
    // Ajouter la campagne et mettre à jour l'état
    const updatedCampaigns = addCampaign(newCampaign);
    setCampaigns(updatedCampaigns);
    
    // Ajouter automatiquement un événement au calendrier pour cette campagne
    const newEvent: CalendarEvent = {
      id: `event${Date.now()}`,
      campaignId: newCampaign.id,
      title: newCampaign.title,
      date: newCampaign.startDate,
      channel: newCampaign.channels[0] || 'other',
      status: newCampaign.status
    };
    
    const updatedEvents = addCalendarEvent(newEvent);
    setCalendarEvents(updatedEvents);
    
    toast({
      title: "Campagne créée",
      description: `La campagne "${formData.title}" a été créée avec succès.`,
    });
  };
  
  const handleDeleteCampaign = (campaignId: string) => {
    // Supprimer la campagne
    const updatedCampaigns = deleteCampaign(campaignId);
    setCampaigns(updatedCampaigns);
    
    // Supprimer les événements du calendrier liés à cette campagne
    const updatedEvents = deleteCalendarEventsForCampaign(campaignId);
    setCalendarEvents(updatedEvents);
  };
  
  // Filter campaigns by status
  const activeCampaigns = campaigns.filter(campaign => campaign.status === 'active');
  const draftCampaigns = campaigns.filter(campaign => campaign.status === 'draft');
  const completedCampaigns = campaigns.filter(campaign => campaign.status === 'completed');
  
  // Enhanced stats with icons
  const statsWithIcons: Stat[] = [
    {
      ...mockStats[0],
      icon: <Check className="h-5 w-5" />,
    },
    {
      ...mockStats[1],
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      ...mockStats[2],
      icon: <Presentation className="h-5 w-5" />,
    },
    {
      ...mockStats[3],
      icon: <Target className="h-5 w-5" />,
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de Bord</h1>
            <p className="text-muted-foreground mt-1">
              Gérez et surveillez vos campagnes marketing
            </p>
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => setShowCampaignModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nouvelle Campagne
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statsWithIcons.map((stat, index) => (
            <StatCard key={index} stat={stat} />
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Campagnes</h2>
                <TabsList>
                  <TabsTrigger value="all">Toutes</TabsTrigger>
                  <TabsTrigger value="active">Actives</TabsTrigger>
                  <TabsTrigger value="draft">Brouillons</TabsTrigger>
                  <TabsTrigger value="completed">Terminées</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaigns.length > 0 ? (
                    campaigns.map(campaign => (
                      <CampaignCard 
                        key={campaign.id} 
                        campaign={campaign} 
                        onDelete={handleDeleteCampaign} 
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                      <p className="text-muted-foreground">Aucune campagne disponible</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => setShowCampaignModal(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Créer une campagne
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="active" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeCampaigns.length > 0 ? (
                    activeCampaigns.map(campaign => (
                      <CampaignCard 
                        key={campaign.id} 
                        campaign={campaign} 
                        onDelete={handleDeleteCampaign}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                      <p className="text-muted-foreground">Aucune campagne active</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => setShowCampaignModal(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Créer une campagne
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="draft" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {draftCampaigns.length > 0 ? (
                    draftCampaigns.map(campaign => (
                      <CampaignCard 
                        key={campaign.id} 
                        campaign={campaign} 
                        onDelete={handleDeleteCampaign}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                      <p className="text-muted-foreground">Aucun brouillon disponible</p>
                      <Button 
                        className="mt-4" 
                        onClick={() => setShowCampaignModal(true)}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Créer un brouillon
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedCampaigns.length > 0 ? (
                    completedCampaigns.map(campaign => (
                      <CampaignCard 
                        key={campaign.id} 
                        campaign={campaign} 
                        onDelete={handleDeleteCampaign}
                      />
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-8 bg-gray-50 rounded-lg border border-dashed">
                      <p className="text-muted-foreground">Aucune campagne terminée</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="bg-white rounded-lg shadow p-4 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Activité Récente</h2>
                <Button variant="ghost" size="sm">
                  Voir tout
                </Button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Users className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sophie a créé une nouvelle campagne</p>
                    <p className="text-xs text-muted-foreground">Il y a 10 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <Check className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Thomas a approuvé "Newsletter Mensuelle"</p>
                    <p className="text-xs text-muted-foreground">Il y a 45 minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Julie a supprimé "Webinaire Marketing"</p>
                    <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Calendrier</h2>
            <Calendar events={calendarEvents} />
          </div>
        </div>
      </main>
      
      <CampaignModal 
        open={showCampaignModal} 
        onOpenChange={setShowCampaignModal}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
};

export default Index;
