
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CampaignFormValues, socialPlatformOptions } from './CampaignFormSchema';

interface ChannelDetailsFieldsProps {
  form: UseFormReturn<CampaignFormValues>;
}

const ChannelDetailsFields: React.FC<ChannelDetailsFieldsProps> = ({ form }) => {
  const selectedChannels = form.watch('channels') || [];
  
  const renderSmsFields = () => {
    if (!selectedChannels.includes('sms')) return null;
    
    return (
      <div className="space-y-4 p-4 bg-muted/30 rounded-md mt-4">
        <h3 className="font-medium">Configuration SMS</h3>
        <FormField
          control={form.control}
          name="channelDetails.sms.message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message SMS</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Votre message SMS..." 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="channelDetails.sms.recipients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de destinataires</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0" 
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  const renderSmtpFields = () => {
    if (!selectedChannels.includes('smtp')) return null;
    
    return (
      <div className="space-y-4 p-4 bg-muted/30 rounded-md mt-4">
        <h3 className="font-medium">Configuration SMTP (Email)</h3>
        <FormField
          control={form.control}
          name="channelDetails.smtp.subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sujet de l'email</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Sujet de l'email..." 
                  {...field}
                  value={field.value || ''} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="channelDetails.smtp.template"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Template HTML</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="<html>...</html>" 
                  {...field}
                  value={field.value || ''} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="channelDetails.smtp.recipients"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de destinataires</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0" 
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value) || 0)}
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  const renderSocialFields = () => {
    if (!selectedChannels.includes('social')) return null;
    
    return (
      <div className="space-y-4 p-4 bg-muted/30 rounded-md mt-4">
        <h3 className="font-medium">Configuration Réseaux Sociaux</h3>
        <FormField
          control={form.control}
          name="channelDetails.social.platforms"
          render={() => (
            <FormItem>
              <div className="mb-2">
                <FormLabel>Plateformes</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {socialPlatformOptions.map((platform) => (
                  <FormField
                    key={platform.id}
                    control={form.control}
                    name="channelDetails.social.platforms"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={platform.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(platform.id)}
                              onCheckedChange={(checked) => {
                                const currentValues = field.value || [];
                                return checked
                                  ? field.onChange([...currentValues, platform.id])
                                  : field.onChange(
                                      currentValues?.filter(
                                        (value) => value !== platform.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {platform.label}
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
        <FormField
          control={form.control}
          name="channelDetails.social.content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contenu du post</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Contenu de votre publication..." 
                  {...field}
                  value={field.value || ''} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };
  
  return (
    <div className="space-y-4">
      {renderSmsFields()}
      {renderSmtpFields()}
      {renderSocialFields()}
    </div>
  );
};

export default ChannelDetailsFields;
