
import { Campaign, CalendarEvent } from "@/types";

// Clés de stockage
const STORAGE_KEYS = {
  CAMPAIGNS: 'campaigns',
  CALENDAR_EVENTS: 'calendar_events'
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
