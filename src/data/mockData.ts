
import { Campaign, CalendarEvent, TeamMember, User, Stat } from '../types';
import { format, sub, add } from 'date-fns';

// Generate dates relative to today
const today = new Date();
const yesterday = sub(today, { days: 1 });
const lastWeek = sub(today, { days: 7 });
const nextWeek = add(today, { days: 7 });
const nextMonth = add(today, { months: 1 });

// Mock users
export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Sophie Martin',
    email: 'sophie.martin@example.com',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    id: 'user2',
    name: 'Thomas Dubois',
    email: 'thomas.dubois@example.com',
    role: 'editor',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: 'user3',
    name: 'Julie Bernard',
    email: 'julie.bernard@example.com',
    role: 'viewer',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

// Mock team members
export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team1',
    name: 'Équipe Contenu',
    role: 'Création de contenu',
    avatar: '',
  },
  {
    id: 'team2',
    name: 'Équipe Social Media',
    role: 'Gestion des réseaux sociaux',
    avatar: '',
  },
  {
    id: 'team3',
    name: 'Équipe Ads',
    role: 'Gestion des publicités',
    avatar: '',
  },
];

// Mock campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: 'camp1',
    title: 'Lancement Produit Q2',
    description: 'Campagne de lancement du nouveau produit pour le Q2 2025.',
    status: 'active',
    startDate: format(today, 'yyyy-MM-dd'),
    endDate: format(add(today, { days: 30 }), 'yyyy-MM-dd'),
    channels: ['email', 'social', 'blog'],
    owner: 'user1',
    team: ['team1', 'team2'],
    metrics: {
      impressions: 15000,
      clicks: 3200,
      conversions: 450,
      engagement: 8.5,
    },
  },
  {
    id: 'camp2',
    title: 'Webinaire Technique',
    description: 'Webinaire sur les nouvelles fonctionnalités techniques de notre solution.',
    status: 'draft',
    startDate: format(add(today, { days: 15 }), 'yyyy-MM-dd'),
    endDate: format(add(today, { days: 16 }), 'yyyy-MM-dd'),
    channels: ['email', 'social'],
    owner: 'user2',
    team: ['team1'],
  },
  {
    id: 'camp3',
    title: 'Campagne Noël',
    description: 'Offres spéciales pour la période des fêtes.',
    status: 'paused',
    startDate: format(add(today, { months: 2 }), 'yyyy-MM-dd'),
    endDate: format(add(today, { months: 3 }), 'yyyy-MM-dd'),
    channels: ['email', 'social', 'ads'],
    owner: 'user1',
    team: ['team1', 'team2', 'team3'],
    metrics: {
      impressions: 8000,
      clicks: 1500,
      conversions: 200,
      engagement: 5.2,
    },
  },
  {
    id: 'camp4',
    title: 'Blog Series: Tendances 2025',
    description: 'Série d\'articles de blog sur les tendances marketing pour 2025.',
    status: 'completed',
    startDate: format(sub(today, { months: 1 }), 'yyyy-MM-dd'),
    endDate: format(sub(today, { days: 5 }), 'yyyy-MM-dd'),
    channels: ['blog', 'social'],
    owner: 'user3',
    team: ['team1'],
    metrics: {
      impressions: 20000,
      clicks: 4500,
      conversions: 750,
      engagement: 12.3,
    },
  },
  {
    id: 'camp5',
    title: 'Newsletter Mensuelle',
    description: 'Newsletter récapitulative du mois.',
    status: 'active',
    startDate: format(sub(today, { days: 3 }), 'yyyy-MM-dd'),
    endDate: format(add(today, { days: 2 }), 'yyyy-MM-dd'),
    channels: ['email'],
    owner: 'user2',
    team: ['team1'],
    metrics: {
      impressions: 5000,
      clicks: 1200,
      conversions: 180,
      engagement: 6.8,
    },
  },
];

// Mock calendar events based on campaigns
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: 'event1',
    campaignId: 'camp1',
    title: 'Lancement Email',
    date: format(today, 'yyyy-MM-dd'),
    channel: 'email',
    status: 'active',
  },
  {
    id: 'event2',
    campaignId: 'camp1',
    title: 'Post Instagram',
    date: format(add(today, { days: 2 }), 'yyyy-MM-dd'),
    channel: 'social',
    status: 'active',
  },
  {
    id: 'event3',
    campaignId: 'camp2',
    title: 'Email Invitation Webinaire',
    date: format(add(today, { days: 10 }), 'yyyy-MM-dd'),
    channel: 'email',
    status: 'draft',
  },
  {
    id: 'event4',
    campaignId: 'camp1',
    title: 'Publication Blog',
    date: format(add(today, { days: 5 }), 'yyyy-MM-dd'),
    channel: 'blog',
    status: 'active',
  },
  {
    id: 'event5',
    campaignId: 'camp5',
    title: 'Envoi Newsletter',
    date: format(today, 'yyyy-MM-dd'),
    channel: 'email',
    status: 'active',
  },
  {
    id: 'event6',
    campaignId: 'camp3',
    title: 'Planning Campagne Noël',
    date: format(add(today, { days: 12 }), 'yyyy-MM-dd'),
    channel: 'other',
    status: 'paused',
  },
];

// Mock statistics for dashboard
export const mockStats: Stat[] = [
  {
    title: 'Campagnes Actives',
    value: 8,
    change: 2,
  },
  {
    title: 'Taux d\'engagement moyen',
    value: '7.6%',
    change: 0.5,
  },
  {
    title: 'Publications Planifiées',
    value: 24,
    change: -3,
  },
  {
    title: 'Taux de Conversion',
    value: '3.2%',
    change: 0.8,
  },
];
