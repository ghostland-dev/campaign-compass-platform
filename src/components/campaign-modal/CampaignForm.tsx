
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

interface CampaignFormProps {
  onSubmit: (values: CampaignFormValues) => void;
  onCancel: () => void;
}

const CampaignForm: React.FC<CampaignFormProps> = ({ onSubmit, onCancel }) => {
  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <BasicInfoFields form={form} />
        <DateFields form={form} />
        <StatusField form={form} />
        <ChannelsField form={form} />
        <ChannelDetailsFields form={form} />
        
        <DialogFooter className="pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
          >
            Annuler
          </Button>
          <Button type="submit">Créer la campagne</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CampaignForm;
