
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
    <div className="space-y-5">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-base font-medium">Titre</FormLabel>
            <FormDescription className="text-sm text-muted-foreground">
              Donnez un nom descriptif à votre campagne
            </FormDescription>
            <FormControl>
              <Input 
                placeholder="Exemple: Promotion de Noël 2025" 
                {...field} 
                className="h-11 transition-shadow focus-visible:shadow-md"
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
            <FormLabel className="text-base font-medium">Description</FormLabel>
            <FormDescription className="text-sm text-muted-foreground">
              Décrivez l'objectif et le contenu de votre campagne
            </FormDescription>
            <FormControl>
              <Textarea 
                placeholder="Décrivez brièvement cette campagne..." 
                {...field} 
                className="min-h-[120px] resize-y transition-shadow focus-visible:shadow-md"
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
