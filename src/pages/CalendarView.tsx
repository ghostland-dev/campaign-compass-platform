
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { getCampaigns, getCalendarEvents } from '@/services/storageService';
import { Campaign, CalendarEvent } from '@/types';
import CalendarDetailed from '@/components/CalendarDetailed';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import CampaignModal from '@/components/CampaignModal';
import { addCalendarEvent, addCampaign } from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';

const CalendarView = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = () => {
      const storedCampaigns = getCampaigns();
      const storedEvents = getCalendarEvents();
      
      setCampaigns(storedCampaigns);
      setCalendarEvents(storedEvents);
    };

    loadData();
  }, []);

  const handleCreateCampaign = (formData: any) => {
    const newCampaign: Campaign = {
      id: `camp${Date.now()}`,
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Calendrier</h1>
            <p className="text-muted-foreground mt-1">
              Visualisez et gérez la planification de vos campagnes
            </p>
          </div>
          <Button onClick={() => setShowCampaignModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nouvelle Campagne
          </Button>
        </div>
        
        <CalendarDetailed events={calendarEvents} campaigns={campaigns} />
      </main>
      
      <CampaignModal 
        open={showCampaignModal} 
        onOpenChange={setShowCampaignModal}
        onSubmit={handleCreateCampaign}
      />
    </div>
  );
};

export default CalendarView;
