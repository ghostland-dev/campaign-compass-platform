
import { z } from 'zod';
import { Channel, CampaignStatus } from '@/types';

export const formSchema = z.object({
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }),
  description: z.string().optional(),
  startDate: z.date({ required_error: 'La date de début est requise' }),
  endDate: z.date({ required_error: 'La date de fin est requise' }),
  status: z.enum(['draft', 'active', 'paused', 'completed'] as const),
  channels: z.array(z.string()).min(1, { message: 'Sélectionnez au moins un canal' }),
  channelDetails: z.object({
    sms: z.object({
      message: z.string().optional(),
      recipients: z.number().optional(),
    }).optional(),
    smtp: z.object({
      subject: z.string().optional(),
      template: z.string().optional(),
      recipients: z.number().optional(),
    }).optional(),
    social: z.object({
      platforms: z.array(z.string()).optional(),
      content: z.string().optional(),
    }).optional(),
  }).optional(),
});

export type CampaignFormValues = z.infer<typeof formSchema>;

export const channelOptions = [
  { id: 'email', label: 'Email' },
  { id: 'social', label: 'Réseaux sociaux' },
  { id: 'blog', label: 'Blog' },
  { id: 'ads', label: 'Publicités' },
  { id: 'sms', label: 'SMS' },
  { id: 'smtp', label: 'SMTP (Email avancé)' },
  { id: 'other', label: 'Autre' },
];

export const socialPlatformOptions = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'tiktok', label: 'TikTok' },
];
