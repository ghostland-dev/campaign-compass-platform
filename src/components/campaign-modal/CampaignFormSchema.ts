
import { z } from 'zod';
import { Channel, CampaignStatus } from '@/types';

export const formSchema = z.object({
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }),
  description: z.string().optional(),
  startDate: z.date({ required_error: 'La date de début est requise' }),
  endDate: z.date({ required_error: 'La date de fin est requise' }),
  status: z.enum(['draft', 'active', 'paused', 'completed'] as const),
  channels: z.array(z.string().refine((val): val is Channel => {
    return ['email', 'social', 'blog', 'ads', 'sms', 'smtp', 'other'].includes(val);
  }, { message: 'Canal invalide' })),
  channelDetails: z.object({
    sms: z.object({
      message: z.string().default(''),
      recipients: z.number().default(0),
    }).optional(),
    smtp: z.object({
      subject: z.string().default(''),
      template: z.string().default(''),
      recipients: z.number().default(0),
    }).optional(),
    social: z.object({
      platforms: z.array(z.string()).default([]),
      content: z.string().default(''),
    }).optional(),
  }).optional(),
});

export type CampaignFormValues = z.infer<typeof formSchema>;

export const channelOptions = [
  { id: 'email' as Channel, label: 'Email' },
  { id: 'social' as Channel, label: 'Réseaux sociaux' },
  { id: 'blog' as Channel, label: 'Blog' },
  { id: 'ads' as Channel, label: 'Publicités' },
  { id: 'sms' as Channel, label: 'SMS' },
  { id: 'smtp' as Channel, label: 'SMTP (Email avancé)' },
  { id: 'other' as Channel, label: 'Autre' },
];

export const socialPlatformOptions = [
  { id: 'facebook', label: 'Facebook' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'twitter', label: 'Twitter' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'tiktok', label: 'TikTok' },
];
