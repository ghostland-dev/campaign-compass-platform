
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CampaignFormValues } from './CampaignFormSchema';
import { CheckCircle2, PauseCircle, Clock, CheckCheck } from 'lucide-react';

interface StatusFieldProps {
  form: UseFormReturn<CampaignFormValues>;
}

const StatusField: React.FC<StatusFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="status"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base font-medium">Statut</FormLabel>
          <FormDescription className="text-sm text-muted-foreground">
            Définissez l'état actuel de votre campagne
          </FormDescription>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="h-11 transition-shadow focus-visible:shadow-md">
                <SelectValue placeholder="Sélectionnez un statut" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="draft" className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>Brouillon</span>
                </div>
              </SelectItem>
              <SelectItem value="active">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span>Active</span>
                </div>
              </SelectItem>
              <SelectItem value="paused">
                <div className="flex items-center gap-2">
                  <PauseCircle className="h-4 w-4 text-amber-500" />
                  <span>En pause</span>
                </div>
              </SelectItem>
              <SelectItem value="completed">
                <div className="flex items-center gap-2">
                  <CheckCheck className="h-4 w-4 text-blue-500" />
                  <span>Terminée</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StatusField;
