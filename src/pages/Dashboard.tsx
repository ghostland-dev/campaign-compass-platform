
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import CalendarWrapper from '@/components/CalendarWrapper';
import CampaignModal from '@/components/campaign-modal';
import { Campaign, CalendarEvent, Channel } from '@/types';
import { 
  getCampaigns, 
  saveCampaigns, 
  addCampaign, 
  getCalendarEvents, 
  addCalendarEvent,
  deleteCampaign,
  deleteCalendarEventsForCampaign 
} from '@/services/storageService';

// Import the refactored components
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsOverview from '@/components/dashboard/StatsOverview';
import CampaignList from '@/components/dashboard/CampaignList';
import RecentActivity from '@/components/dashboard/RecentActivity';
import { mockCalendarEvents } from '@/data/mockData';
import { CampaignFormValues } from '@/components/campaign-modal/CampaignFormSchema';

const Dashboard = () => {
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
  
  const handleCreateCampaign = (formData: CampaignFormValues) => {
    const newCampaign: Campaign = {
      id: `camp${Date.now()}`,  // Utiliser un timestamp pour l'ID
      title: formData.title,
      description: formData.description || '',
      status: formData.status,
      startDate: formData.startDate.toISOString().split('T')[0],
      endDate: formData.endDate.toISOString().split('T')[0],
      channels: formData.channels as Channel[],
      owner: 'user1',
      team: ['team1'],
      channelDetails: {
        sms: formData.channelDetails?.sms ? {
          message: formData.channelDetails.sms.message,
          recipients: formData.channelDetails.sms.recipients
        } : undefined,
        smtp: formData.channelDetails?.smtp ? {
          subject: formData.channelDetails.smtp.subject,
          template: formData.channelDetails.smtp.template,
          recipients: formData.channelDetails.smtp.recipients
        } : undefined,
        social: formData.channelDetails?.social ? {
          platforms: formData.channelDetails.social.platforms,
          content: formData.channelDetails.social.content
        } : undefined
      }
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
  
  return (
    <Layout>
      {/* Header with title and new campaign button */}
      <DashboardHeader onCreateCampaign={() => setShowCampaignModal(true)} />
      
      {/* Stats overview cards */}
      <StatsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
          {/* Campaign list with tabs */}
          <CampaignList 
            campaigns={campaigns} 
            onDelete={handleDeleteCampaign}
            onCreateCampaign={() => setShowCampaignModal(true)} 
          />
          
          {/* Recent activity section */}
          <RecentActivity />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Calendrier</h2>
          <CalendarWrapper events={calendarEvents} />
        </div>
      </div>
      
      <CampaignModal 
        open={showCampaignModal} 
        onOpenChange={setShowCampaignModal}
        onSubmit={handleCreateCampaign}
      />
    </Layout>
  );
};

export default Dashboard;
