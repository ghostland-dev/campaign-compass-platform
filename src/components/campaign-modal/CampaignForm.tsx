
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
import { motion } from 'framer-motion';

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
  
  // Animation variants for staggered animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <motion.div variants={item} className="bg-card shadow-sm rounded-lg p-5 border border-border">
            <h3 className="font-semibold text-lg mb-4 text-primary flex items-center">
              <span className="inline-block w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
              Informations de base
            </h3>
            <BasicInfoFields form={form} />
          </motion.div>
          
          <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card shadow-sm rounded-lg p-5 border border-border">
              <h3 className="font-semibold text-lg mb-4 text-primary flex items-center">
                <span className="inline-block w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
                Planification
              </h3>
              <DateFields form={form} />
            </div>
            
            <div className="bg-card shadow-sm rounded-lg p-5 border border-border">
              <h3 className="font-semibold text-lg mb-4 text-primary flex items-center">
                <span className="inline-block w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
                Statut
              </h3>
              <StatusField form={form} />
            </div>
          </motion.div>
          
          <motion.div variants={item} className="bg-card shadow-sm rounded-lg p-5 border border-border">
            <h3 className="font-semibold text-lg mb-4 text-primary flex items-center">
              <span className="inline-block w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
              Canaux de diffusion
            </h3>
            <ChannelsField form={form} />
          </motion.div>
          
          <motion.div variants={item} className="bg-card shadow-sm rounded-lg p-5 border border-border">
            <h3 className="font-semibold text-lg mb-4 text-primary flex items-center">
              <span className="inline-block w-1.5 h-6 bg-primary rounded-full mr-2.5"></span>
              Paramètres des canaux
            </h3>
            <ChannelDetailsFields form={form} />
          </motion.div>
        </motion.div>
        
        <DialogFooter className="gap-3 pt-6 border-t mt-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            className="gap-2 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30 transition-colors"
          >
            <X className="h-4 w-4" />
            Annuler
          </Button>
          <Button 
            type="submit" 
            className="gap-2 bg-primary/90 hover:bg-primary transition-colors"
          >
            <Save className="h-4 w-4" />
            {submitButtonText}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default CampaignForm;
