
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { CampaignFormValues } from './CampaignFormSchema';

interface BasicInfoFieldsProps {
  form: UseFormReturn<CampaignFormValues>;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base">Titre</FormLabel>
            <FormDescription>
              Donnez un nom descriptif à votre campagne
            </FormDescription>
            <FormControl>
              <Input 
                placeholder="Exemple: Promotion de Noël 2025" 
                {...field} 
                className="h-11"
              />
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
            <FormLabel className="text-base">Description</FormLabel>
            <FormDescription>
              Décrivez l'objectif et le contenu de votre campagne
            </FormDescription>
            <FormControl>
              <Textarea 
                placeholder="Décrivez brièvement cette campagne..." 
                {...field} 
                className="min-h-[100px] resize-y"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
