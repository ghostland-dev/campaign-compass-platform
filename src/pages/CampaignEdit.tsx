
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, ArrowLeft } from 'lucide-react';

import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Campaign, Channel } from '@/types';
import { getCampaigns, updateCampaign } from '@/services/storageService';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  title: z.string().min(2, { message: 'Le titre doit contenir au moins 2 caractères' }),
  description: z.string().optional(),
  startDate: z.date({ required_error: 'La date de début est requise' }),
  endDate: z.date({ required_error: 'La date de fin est requise' }),
  status: z.enum(['draft', 'active', 'paused', 'completed']),
  channels: z.array(z.string()).min(1, { message: 'Sélectionnez au moins un canal' }),
});

const CampaignEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      status: 'draft',
      channels: [],
    },
  });

  useEffect(() => {
    const loadCampaign = () => {
      setLoading(true);
      const campaigns = getCampaigns();
      const foundCampaign = campaigns.find(c => c.id === id);
      
      if (foundCampaign) {
        setCampaign(foundCampaign);
        
        // Set form values
        form.reset({
          title: foundCampaign.title,
          description: foundCampaign.description,
          startDate: new Date(foundCampaign.startDate),
          endDate: new Date(foundCampaign.endDate),
          status: foundCampaign.status,
          channels: foundCampaign.channels,
        });
      }
      setLoading(false);
    };

    loadCampaign();
  }, [id, form]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (!campaign) return;
    
    const updatedCampaign = {
      ...campaign,
      title: values.title,
      description: values.description || '',
      startDate: format(values.startDate, 'yyyy-MM-dd'),
      endDate: format(values.endDate, 'yyyy-MM-dd'),
      status: values.status,
      channels: values.channels as Channel[],
    };
    
    updateCampaign(updatedCampaign);
    
    toast({
      title: "Campagne modifiée",
      description: `La campagne "${values.title}" a été modifiée avec succès.`,
    });
    
    navigate(`/campaign/${id}`);
  };
  
  const channelOptions = [
    { id: 'email', label: 'Email' },
    { id: 'social', label: 'Réseaux sociaux' },
    { id: 'blog', label: 'Blog' },
    { id: 'ads', label: 'Publicités' },
    { id: 'other', label: 'Autre' },
  ];
  
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Chargement de la campagne...</p>
        </div>
      </Layout>
    );
  }

  if (!campaign) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <p>Campagne non trouvée.</p>
          <Button variant="link" onClick={() => navigate('/')}>
            Retour au tableau de bord
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="mb-8">
        <Button variant="outline" onClick={() => navigate(`/campaign/${id}`)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour aux détails de la campagne
        </Button>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Modifier la campagne</h1>
        <p className="text-muted-foreground mt-2">
          Modifiez les détails de votre campagne marketing.
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Informations de la campagne</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titre</FormLabel>
                    <FormControl>
                      <Input placeholder="Titre de la campagne" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description de la campagne" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de début</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, 'P', { locale: fr })
                              ) : (
                                <span>Sélectionner une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Date de fin</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="pl-3 text-left font-normal"
                            >
                              {field.value ? (
                                format(field.value, 'P', { locale: fr })
                              ) : (
                                <span>Sélectionner une date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Statut</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un statut" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Brouillon</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="paused">En pause</SelectItem>
                        <SelectItem value="completed">Terminée</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="channels"
                render={() => (
                  <FormItem>
                    <div className="mb-2">
                      <FormLabel>Canaux</FormLabel>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {channelOptions.map((channel) => (
                        <FormField
                          key={channel.id}
                          control={form.control}
                          name="channels"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={channel.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(channel.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, channel.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== channel.id
                                            )
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {channel.label}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate(`/campaign/${id}`)}
                >
                  Annuler
                </Button>
                <Button type="submit">Enregistrer les modifications</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default CampaignEdit;
