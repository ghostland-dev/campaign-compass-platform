
import { z } from 'zod';
import { Channel, CampaignStatus } from '@/types';

export const formSchema = z.object({
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }).max(100, { message: 'Le titre ne doit pas dépasser 100 caractères' }),
  description: z.string().optional(),
  startDate: z.date({ required_error: 'La date de début est requise' }),
  endDate: z.date({ required_error: 'La date de fin est requise' })
    .refine(d => d instanceof Date, { message: 'Veuillez sélectionner une date valide' }),
  status: z.enum(['draft', 'active', 'paused', 'completed'] as const, {
    required_error: 'Le statut est requis',
    invalid_type_error: 'Statut invalide',
  }),
  channels: z.array(z.string().refine((val): val is Channel => {
    return ['email', 'social', 'blog', 'ads', 'sms', 'smtp', 'other'].includes(val);
  }, { message: 'Canal invalide' })).min(1, { message: 'Sélectionnez au moins un canal' }),
  channelDetails: z.object({
    sms: z.object({
      message: z.string().optional().default(''),
      recipients: z.number().optional().default(0),
    }).optional().default({ message: '', recipients: 0 }),
    smtp: z.object({
      subject: z.string().optional().default(''),
      template: z.string().optional().default(''),
      recipients: z.number().optional().default(0),
    }).optional().default({ subject: '', template: '', recipients: 0 }),
    social: z.object({
      platforms: z.array(z.string()).optional().default([]),
      content: z.string().optional().default(''),
    }).optional().default({ platforms: [], content: '' }),
  }).optional().default({
    sms: { message: '', recipients: 0 },
    smtp: { subject: '', template: '', recipients: 0 },
    social: { platforms: [], content: '' }
  }),
});

export type CampaignFormValues = z.infer<typeof formSchema>;

export const channelOptions = [
  { id: 'email' as Channel, label: 'Email', description: 'Campagnes par email direct' },
  { id: 'social' as Channel, label: 'Réseaux sociaux', description: 'Publications sur les plateformes sociales' },
  { id: 'blog' as Channel, label: 'Blog', description: 'Articles de blog et contenu web' },
  { id: 'ads' as Channel, label: 'Publicités', description: 'Annonces payantes en ligne' },
  { id: 'sms' as Channel, label: 'SMS', description: 'Messages texte vers mobiles' },
  { id: 'smtp' as Channel, label: 'SMTP (Email avancé)', description: 'Emails personnalisés via SMTP' },
  { id: 'other' as Channel, label: 'Autre', description: 'Autres types de canaux' },
];

export const socialPlatformOptions = [
  { id: 'facebook', label: 'Facebook', icon: 'facebook' },
  { id: 'instagram', label: 'Instagram', icon: 'instagram' },
  { id: 'twitter', label: 'Twitter', icon: 'twitter' },
  { id: 'linkedin', label: 'LinkedIn', icon: 'linkedin' },
  { id: 'tiktok', label: 'TikTok', icon: 'tiktok' },
];
