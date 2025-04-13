
import { Campaign, CalendarEvent } from "@/types";

// Clés de stockage
const STORAGE_KEYS = {
  CAMPAIGNS: 'campaigns',
  CALENDAR_EVENTS: 'calendar_events',
  THEME: 'theme',
  VIEW_PREFERENCE: 'campaignViewPreference',
  ACTIVE_TAB: 'campaignActiveTab'
};

// Récupérer les campagnes du localStorage
export const getCampaigns = (): Campaign[] => {
  try {
    const storedCampaigns = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
    return storedCampaigns ? JSON.parse(storedCampaigns) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des campagnes:', error);
    return [];
  }
};

// Sauvegarder les campagnes dans localStorage
export const saveCampaigns = (campaigns: Campaign[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des campagnes:', error);
  }
};

// Ajouter une nouvelle campagne
export const addCampaign = (campaign: Campaign): Campaign[] => {
  const campaigns = getCampaigns();
  const updatedCampaigns = [campaign, ...campaigns];
  saveCampaigns(updatedCampaigns);
  return updatedCampaigns;
};

// Supprimer une campagne
export const deleteCampaign = (campaignId: string): Campaign[] => {
  const campaigns = getCampaigns();
  const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
  saveCampaigns(updatedCampaigns);
  return updatedCampaigns;
};

// Mettre à jour une campagne
export const updateCampaign = (updatedCampaign: Campaign): Campaign[] => {
  const campaigns = getCampaigns();
  const updatedCampaigns = campaigns.map(campaign => 
    campaign.id === updatedCampaign.id ? updatedCampaign : campaign
  );
  
  saveCampaigns(updatedCampaigns);
  return updatedCampaigns;
};

// Récupérer une campagne par son ID
export const getCampaignById = (campaignId: string): Campaign | undefined => {
  const campaigns = getCampaigns();
  return campaigns.find(campaign => campaign.id === campaignId);
};

// Supprimer les événements du calendrier liés à une campagne
export const deleteCalendarEventsForCampaign = (campaignId: string): CalendarEvent[] => {
  const events = getCalendarEvents();
  const updatedEvents = events.filter(event => event.campaignId !== campaignId);
  saveCalendarEvents(updatedEvents);
  return updatedEvents;
};

// Récupérer les événements du calendrier
export const getCalendarEvents = (): CalendarEvent[] => {
  try {
    const storedEvents = localStorage.getItem(STORAGE_KEYS.CALENDAR_EVENTS);
    return storedEvents ? JSON.parse(storedEvents) : [];
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    return [];
  }
};

// Sauvegarder les événements du calendrier
export const saveCalendarEvents = (events: CalendarEvent[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CALENDAR_EVENTS, JSON.stringify(events));
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des événements:', error);
  }
};

// Ajouter un événement au calendrier
export const addCalendarEvent = (event: CalendarEvent): CalendarEvent[] => {
  const events = getCalendarEvents();
  const updatedEvents = [event, ...events];
  saveCalendarEvents(updatedEvents);
  return updatedEvents;
};

// Mettre à jour un événement du calendrier
export const updateCalendarEvent = (updatedEvent: CalendarEvent): CalendarEvent[] => {
  const events = getCalendarEvents();
  const updatedEvents = events.map(event => 
    event.id === updatedEvent.id ? updatedEvent : event
  );
  
  saveCalendarEvents(updatedEvents);
  return updatedEvents;
};

// Fonctions pour gérer les préférences utilisateur
export const getThemePreference = (): 'light' | 'dark' | 'system' => {
  try {
    const theme = localStorage.getItem(STORAGE_KEYS.THEME);
    return (theme as 'light' | 'dark' | 'system') || 'system';
  } catch (error) {
    console.error('Erreur lors de la récupération des préférences de thème:', error);
    return 'system';
  }
};

export const saveThemePreference = (theme: 'light' | 'dark' | 'system'): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des préférences de thème:', error);
  }
};

export const getViewPreference = (): boolean => {
  try {
    const preference = localStorage.getItem(STORAGE_KEYS.VIEW_PREFERENCE);
    return preference ? preference === 'grid' : true;
  } catch (error) {
    console.error('Erreur lors de la récupération des préférences d\'affichage:', error);
    return true;
  }
};

export const saveViewPreference = (isGrid: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.VIEW_PREFERENCE, isGrid ? 'grid' : 'list');
  } catch (error) {
    console.error('Erreur lors de la sauvegarde des préférences d\'affichage:', error);
  }
};

export const getActiveTabPreference = (): string => {
  try {
    const tab = localStorage.getItem(STORAGE_KEYS.ACTIVE_TAB);
    return tab || 'all';
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'onglet actif:', error);
    return 'all';
  }
};

export const saveActiveTabPreference = (tab: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TAB, tab);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de l\'onglet actif:', error);
  }
};
