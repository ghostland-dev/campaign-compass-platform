
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { formSchema, CampaignFormValues } from './CampaignFormSchema';
import BasicInfoFields from './BasicInfoFields';
import DateFields from './DateFields';
import StatusField from './StatusField';
import ChannelsField from './ChannelsField';
import ChannelDetailsFields from './ChannelDetailsFields';
import { Save, X } from 'lucide-react';

interface CampaignFormProps {
  onSubmit: (values: CampaignFormValues) => void;
  onCancel: () => void;
  initialValues?: CampaignFormValues;
  submitButtonText?: string;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ 
  onSubmit, 
  onCancel, 
  initialValues,
  submitButtonText = 'Créer la campagne'
}) => {
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      title: '',
      description: '',
      status: 'draft',
      channels: [],
      channelDetails: {
        sms: { message: '', recipients: 0 },
        smtp: { subject: '', template: '', recipients: 0 },
        social: { platforms: [], content: '' }
      }
    },
  });
  
  const handleSubmit = (values: CampaignFormValues) => {
    onSubmit(values);
    form.reset();
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="bg-muted/30 rounded-lg p-5 border border-border/50">
          <h3 className="font-medium mb-4 text-primary">Informations de base</h3>
          <BasicInfoFields form={form} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-muted/30 rounded-lg p-5 border border-border/50">
            <h3 className="font-medium mb-4 text-primary">Planification</h3>
            <DateFields form={form} />
          </div>
          
          <div className="bg-muted/30 rounded-lg p-5 border border-border/50">
            <h3 className="font-medium mb-4 text-primary">Statut</h3>
            <StatusField form={form} />
          </div>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-5 border border-border/50">
          <h3 className="font-medium mb-4 text-primary">Canaux de diffusion</h3>
          <ChannelsField form={form} />
        </div>
        
        <div className="bg-muted/30 rounded-lg p-5 border border-border/50">
          <h3 className="font-medium mb-4 text-primary">Paramètres des canaux</h3>
          <ChannelDetailsFields form={form} />
        </div>
        
        <DialogFooter className="gap-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Annuler
          </Button>
          <Button type="submit" className="gap-2">
            <Save className="h-4 w-4" />
            {submitButtonText}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CampaignForm;
