
import { useState, useEffect } from 'react';
import { Campaign, CalendarEvent } from '@/types';
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

  // Charger les campagnes depuis localStorage au chargement
  useEffect(() => {
    loadCampaigns();
    
    // Récupérer la préférence d'affichage (grille/liste) depuis localStorage si disponible
    const viewPreference = localStorage.getItem('campaignViewPreference');
    if (viewPreference) {
      setIsGridView(viewPreference === 'grid');
    }
    
    // Récupérer l'onglet actif depuis localStorage si disponible
    const savedTab = localStorage.getItem('campaignActiveTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);
  
  // Sauvegarder les préférences d'affichage dans localStorage lorsqu'elles changent
  useEffect(() => {
    localStorage.setItem('campaignViewPreference', isGridView ? 'grid' : 'list');
  }, [isGridView]);
  
  // Sauvegarder l'onglet actif dans localStorage lorsqu'il change
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
    
    // Filter by status (tab)
    if (activeTab !== "all") {
      filtered = filtered.filter(campaign => campaign.status === activeTab);
    }
    
    // Filter by search term
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
    // Extract the necessary fields
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
      channelDetails: formData.channelDetails
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
    // Supprimer la campagne
    const updatedCampaigns = deleteCampaign(campaignId);
    setCampaigns(updatedCampaigns);
    
    // Supprimer les événements du calendrier liés à cette campagne
    deleteCalendarEventsForCampaign(campaignId);
    
    toast({
      title: "Campagne supprimée",
      description: "La campagne a été supprimée avec succès.",
    });
  };

  // Fonction pour mettre à jour une campagne existante
  const handleUpdateCampaign = (updatedCampaign: Campaign) => {
    updateCampaign(updatedCampaign);
    loadCampaigns(); // Recharger les campagnes pour refléter les changements
    
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
