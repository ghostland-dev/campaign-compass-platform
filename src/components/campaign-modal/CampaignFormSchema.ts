
import { z } from 'zod';
import { Channel, CampaignStatus } from '@/types';

export const formSchema = z.object({
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }),
  description: z.string().optional(),
  startDate: z.date({ required_error: 'La date de début est requise' }),
  endDate: z.date({ required_error: 'La date de fin est requise' }),
  status: z.enum(['draft', 'active', 'paused', 'completed'] as const),
  channels: z.array(z.string()).min(1, { message: 'Sélectionnez au moins un canal' }),
});

export type CampaignFormValues = z.infer<typeof formSchema>;

export const channelOptions = [
  { id: 'email', label: 'Email' },
  { id: 'social', label: 'Réseaux sociaux' },
  { id: 'blog', label: 'Blog' },
  { id: 'ads', label: 'Publicités' },
  { id: 'other', label: 'Autre' },
];
