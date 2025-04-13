
export type CampaignStatus = 'draft' | 'active' | 'completed' | 'paused';

export type Channel = 'email' | 'social' | 'blog' | 'ads' | 'other';

export interface Campaign {
  id: string;
  title: string;
  description: string;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  channels: Channel[];
  owner: string;
  team: string[];
  metrics?: {
    impressions: number;
    clicks: number;
    conversions: number;
    engagement: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

export interface CalendarEvent {
  id: string;
  campaignId: string;
  title: string;
  date: string;
  channel: Channel;
  status: CampaignStatus;
}

export interface Stat {
  title: string;
  value: number | string;
  change?: number;
  icon?: React.ReactNode;
}
