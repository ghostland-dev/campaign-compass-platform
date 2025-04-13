
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { CampaignFormValues, channelOptions } from './CampaignFormSchema';

interface ChannelsFieldProps {
  form: UseFormReturn<CampaignFormValues>;
}

const ChannelsField: React.FC<ChannelsFieldProps> = ({ form }) => {
  return (
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
  );
};

export default ChannelsField;
