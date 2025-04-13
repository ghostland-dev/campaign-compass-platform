
import React from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { UseFormReturn } from 'react-hook-form';
import { CalendarIcon } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CampaignFormValues } from './CampaignFormSchema';

interface DateFieldsProps {
  form: UseFormReturn<CampaignFormValues>;
}

const DateFields: React.FC<DateFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 gap-5">
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel className="text-base font-medium">Date de début</FormLabel>
            <FormDescription className="text-sm text-muted-foreground">
              Quand votre campagne commencera-t-elle?
            </FormDescription>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="h-11 pl-3 text-left font-normal transition-shadow focus-visible:shadow-md w-full justify-start"
                  >
                    {field.value ? (
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 opacity-70" />
                        {format(field.value, 'd MMMM yyyy', { locale: fr })}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                        <span>Sélectionner une date</span>
                      </span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className="p-3 pointer-events-auto border rounded-md shadow-md"
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
            <FormLabel className="text-base font-medium">Date de fin</FormLabel>
            <FormDescription className="text-sm text-muted-foreground">
              Quand votre campagne se terminera-t-elle?
            </FormDescription>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className="h-11 pl-3 text-left font-normal transition-shadow focus-visible:shadow-md w-full justify-start"
                  >
                    {field.value ? (
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 opacity-70" />
                        {format(field.value, 'd MMMM yyyy', { locale: fr })}
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 opacity-50" />
                        <span>Sélectionner une date</span>
                      </span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date < new Date() || (form.watch('startDate') && date < form.watch('startDate'))}
                  initialFocus
                  className="p-3 pointer-events-auto border rounded-md shadow-md"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DateFields;
