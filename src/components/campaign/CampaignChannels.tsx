
import React from 'react';
import { Channel } from '@/types';
import { cn } from '@/lib/utils';

interface CampaignChannelsProps {
  channels: Channel[];
}

const CampaignChannels: React.FC<CampaignChannelsProps> = ({ channels }) => {
  const getChannelLabel = (channel: Channel) => {
    return channel === 'email' ? 'Email' : 
           channel === 'social' ? 'Social' : 
           channel === 'blog' ? 'Blog' : 
           channel === 'ads' ? 'Ads' : 
           channel === 'sms' ? 'SMS' : 
           channel === 'smtp' ? 'SMTP' : 'Autre';
  };

  return (
    <div className="flex ml-2 space-x-1">
      {channels.slice(0, 2).map((channel, index) => (
        <span 
          key={index}
          className={cn(
            "px-2 py-0.5 rounded-full text-xs",
            "bg-muted text-muted-foreground dark:bg-muted/80"
          )}
        >
          {getChannelLabel(channel)}
        </span>
      ))}
      {channels.length > 2 && (
        <span className={cn(
          "px-2 py-0.5 rounded-full text-xs",
          "bg-muted text-muted-foreground dark:bg-muted/80"
        )}>
          +{channels.length - 2}
        </span>
      )}
    </div>
  );
};

export default CampaignChannels;
