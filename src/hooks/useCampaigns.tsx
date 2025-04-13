
import { useState, useEffect } from 'react';
import { Campaign, CalendarEvent, Channel } from '@/types';
import { 
  getCampaigns, 
  deleteCampaign, 
  deleteCalendarEventsForCampaign, 
  addCampaign, 
  addCalendarEvent,
  updateCampaign
} from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';
import { CampaignFormValues } from '@/components/campaign-modal/CampaignFormSchema';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    loadCampaigns();
    
    const viewPreference = localStorage.getItem('campaignViewPreference');
    if (viewPreference) {
      setIsGridView(viewPreference === 'grid');
    }
    
    const savedTab = localStorage.getItem('campaignActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem('campaignViewPreference', isGridView ? 'grid' : 'list');
  }, [isGridView]);
  
  useEffect(() => {
    localStorage.setItem('campaignActiveTab', activeTab);
  }, [activeTab]);
  
  useEffect(() => {
    filterCampaigns();
  }, [searchTerm, campaigns, activeTab]);
  
  const loadCampaigns = () => {
    const storedCampaigns = getCampaigns();
    setCampaigns(storedCampaigns);
  };
  
  const filterCampaigns = () => {
    let filtered = [...campaigns];
    
    if (activeTab !== "all") {
      filtered = filtered.filter(campaign => campaign.status === activeTab);
    }
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(campaign => 
        campaign.title.toLowerCase().includes(term) || 
        campaign.description.toLowerCase().includes(term) ||
        campaign.status.toLowerCase().includes(term) ||
        campaign.channels.some(channel => channel.toLowerCase().includes(term))
      );
    }
    
    setFilteredCampaigns(filtered);
  };
  
  const handleCreateCampaign = (formData: CampaignFormValues) => {
    const newCampaign: Campaign = {
      id: `camp${Date.now()}`,
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
    
    const updatedCampaigns = addCampaign(newCampaign);
    setCampaigns(updatedCampaigns);
    
    const newEvent: CalendarEvent = {
      id: `event${Date.now()}`,
      campaignId: newCampaign.id,
      title: newCampaign.title,
      date: newCampaign.startDate,
      channel: newCampaign.channels[0] || 'other',
      status: newCampaign.status
    };
    
    addCalendarEvent(newEvent);
    
    let channelDescription = '';
    if (newCampaign.channels.includes('sms')) {
      channelDescription = 'SMS';
    } else if (newCampaign.channels.includes('smtp')) {
      channelDescription = 'Email (SMTP)';
    } else if (newCampaign.channels.includes('social')) {
      channelDescription = 'Réseaux sociaux';
    } else {
      channelDescription = newCampaign.channels.join(', ');
    }
    
    toast({
      title: "Campagne créée",
      description: `La campagne "${formData.title}" a été créée avec succès (${channelDescription}).`,
    });
  };
  
  const handleDeleteCampaign = (campaignId: string) => {
    const updatedCampaigns = deleteCampaign(campaignId);
    setCampaigns(updatedCampaigns);
    
    deleteCalendarEventsForCampaign(campaignId);
    
    toast({
      title: "Campagne supprimée",
      description: "La campagne a été supprimée avec succès.",
    });
  };

  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    updateCampaign(updatedCampaign);
    loadCampaigns();
    
    toast({
      title: "Campagne mise à jour",
      description: `La campagne "${updatedCampaign.title}" a été mise à jour avec succès.`,
    });
  };

  return {
    campaigns: filteredCampaigns,
    allCampaigns: campaigns,
    searchTerm,
    setSearchTerm,
    isGridView,
    setIsGridView,
    showCampaignModal,
    setShowCampaignModal,
    activeTab,
    setActiveTab,
    handleCreateCampaign,
    handleDeleteCampaign,
    handleUpdateCampaign,
    refreshCampaigns: loadCampaigns
  };
}
