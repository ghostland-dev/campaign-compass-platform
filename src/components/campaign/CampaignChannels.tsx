
import React from 'react';
import { Channel } from '@/types';

interface CampaignChannelsProps {
  channels: Channel[];
}

const CampaignChannels: React.FC<CampaignChannelsProps> = ({ channels }) => {
  const getChannelLabel = (channel: Channel) => {
    return channel === 'email' ? 'Email' : 
           channel === 'social' ? 'Social' : 
           channel === 'blog' ? 'Blog' : 
           channel === 'ads' ? 'Ads' : 'Autre';
  };

  return (
    <div className="flex ml-2 space-x-1">
      {channels.slice(0, 2).map((channel, index) => (
        <span 
          key={index}
          className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs"
        >
          {getChannelLabel(channel)}
        </span>
      ))}
      {channels.length > 2 && (
        <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs">
          +{channels.length - 2}
        </span>
      )}
    </div>
  );
};

export default CampaignChannels;
