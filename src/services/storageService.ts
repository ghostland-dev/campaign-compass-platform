import { Campaign, CalendarEvent } from '@/types';

const CAMPAIGNS_KEY = 'campaigns';
const CALENDAR_EVENTS_KEY = 'calendarEvents';

// Campaigns
export const getCampaigns = (): Campaign[] => {
  const storedCampaigns = localStorage.getItem(CAMPAIGNS_KEY);
  return storedCampaigns ? JSON.parse(storedCampaigns) : [];
};

export const saveCampaigns = (campaigns: Campaign[]): void => {
  localStorage.setItem(CAMPAIGNS_KEY, JSON.stringify(campaigns));
};

export const addCampaign = (newCampaign: Campaign): Campaign[] => {
  const campaigns = getCampaigns();
  const updatedCampaigns = [...campaigns, newCampaign];
  saveCampaigns(updatedCampaigns);
  return updatedCampaigns;
};

export const deleteCampaign = (campaignId: string): Campaign[] => {
  const campaigns = getCampaigns();
  const updatedCampaigns = campaigns.filter(campaign => campaign.id !== campaignId);
  saveCampaigns(updatedCampaigns);
  return updatedCampaigns;
};

// Update an existing campaign
export const updateCampaign = (updatedCampaign: Campaign): Campaign[] => {
  const campaigns = getCampaigns();
  const updatedCampaigns = campaigns.map(campaign => 
    campaign.id === updatedCampaign.id ? updatedCampaign : campaign
  );
  
  saveCampaigns(updatedCampaigns);
  return updatedCampaigns;
};

// Calendar Events
export const getCalendarEvents = (): CalendarEvent[] => {
  const storedEvents = localStorage.getItem(CALENDAR_EVENTS_KEY);
  return storedEvents ? JSON.parse(storedEvents) : [];
};

export const saveCalendarEvents = (events: CalendarEvent[]): void => {
  localStorage.setItem(CALENDAR_EVENTS_KEY, JSON.stringify(events));
};

export const addCalendarEvent = (newEvent: CalendarEvent): CalendarEvent[] => {
  const events = getCalendarEvents();
  const updatedEvents = [...events, newEvent];
  saveCalendarEvents(updatedEvents);
  return updatedEvents;
};

export const deleteCalendarEvent = (eventId: string): CalendarEvent[] => {
  const events = getCalendarEvents();
  const updatedEvents = events.filter(event => event.id !== eventId);
  saveCalendarEvents(updatedEvents);
  return updatedEvents;
};

export const deleteCalendarEventsForCampaign = (campaignId: string): CalendarEvent[] => {
  const events = getCalendarEvents();
  const updatedEvents = events.filter(event => event.campaignId !== campaignId);
  saveCalendarEvents(updatedEvents);
  return updatedEvents;
};

// Theme Preference
const THEME_PREFERENCE_KEY = 'theme';

export const getThemePreference = (): 'light' | 'dark' | 'system' => {
  const storedTheme = localStorage.getItem(THEME_PREFERENCE_KEY);
  return (storedTheme === 'light' || storedTheme === 'dark' || storedTheme === 'system') ? storedTheme : 'system';
};

export const saveThemePreference = (theme: 'light' | 'dark' | 'system'): void => {
  localStorage.setItem(THEME_PREFERENCE_KEY, theme);
};
