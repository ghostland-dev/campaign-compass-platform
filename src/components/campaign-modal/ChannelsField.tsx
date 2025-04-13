
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { CampaignFormValues, channelOptions } from './CampaignFormSchema';
import { Mail, MessageSquare, Share2, Globe } from 'lucide-react';

interface ChannelsFieldProps {
  form: UseFormReturn<CampaignFormValues>;
}

// Helper function to get the icon for each channel
const getChannelIcon = (channelId: string) => {
  switch (channelId) {
    case 'smtp':
      return <Mail className="h-4 w-4 text-blue-500" />;
    case 'sms':
      return <MessageSquare className="h-4 w-4 text-green-500" />;
    case 'social':
      return <Share2 className="h-4 w-4 text-purple-500" />;
    default:
      return <Globe className="h-4 w-4 text-gray-500" />;
  }
};

const ChannelsField: React.FC<ChannelsFieldProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="channels"
      render={() => (
        <FormItem>
          <FormLabel className="text-base font-medium">Canaux</FormLabel>
          <FormDescription className="text-sm text-muted-foreground mb-3">
            Sélectionnez les canaux que vous souhaitez utiliser pour cette campagne
          </FormDescription>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {channelOptions.map((channel) => (
              <FormField
                key={channel.id}
                control={form.control}
                name="channels"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={channel.id}
                      className="flex items-center space-x-3 space-y-0 bg-muted/30 p-3 rounded-md border border-border/50 transition-all hover:bg-muted/50"
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
                          className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                        />
                      </FormControl>
                      <div className="flex items-center gap-2">
                        {getChannelIcon(channel.id)}
                        <FormLabel className="font-medium text-sm cursor-pointer">
                          {channel.label}
                        </FormLabel>
                      </div>
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
