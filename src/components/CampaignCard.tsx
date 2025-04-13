import React from 'react';
import { Calendar, Clock, Edit, MoreHorizontal, Trash2, Users } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Campaign } from '@/types';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface CampaignCardProps {
  campaign: Campaign;
  onDelete?: (campaignId: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDelete }) => {
  const { toast } = useToast();
  
  // Function to get status text in French
  const getStatusText = (status: string) => {
    const statuses: Record<string, string> = {
      draft: 'Brouillon',
      active: 'Active',
      completed: 'Terminée',
      paused: 'En pause',
    };
    return statuses[status] || status;
  };

  // Function to get color for status
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-600',
      active: 'bg-green-100 text-green-600',
      completed: 'bg-blue-100 text-blue-600',
      paused: 'bg-amber-100 text-amber-600',
    };
    return colors[status] || 'bg-gray-100 text-gray-600';
  };

  // Function to get channel text in French
  const getChannelText = (channel: string) => {
    const channels: Record<string, string> = {
      email: 'Email',
      social: 'Réseaux sociaux',
      blog: 'Blog',
      ads: 'Publicités',
      other: 'Autre',
    };
    return channels[channel] || channel;
  };

  // Format dates for display
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(campaign.id);
      toast({
        title: "Campagne supprimée",
        description: `La campagne "${campaign.title}" a été supprimée avec succès.`,
      });
    }
  };

  return (
    <div className="campaign-card animate-fade-in border rounded-lg bg-white shadow p-4">
      <div className="flex items-start justify-between">
        <div>
          <Badge className={getStatusColor(campaign.status)}>
            {getStatusText(campaign.status)}
          </Badge>
          <h3 className="mt-2 font-medium text-lg">{campaign.title}</h3>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex gap-2 items-center">
              <Edit className="h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="flex gap-2 items-center text-destructive focus:text-destructive"
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{campaign.description}</p>
      <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        <span>
          {format(startDate, 'dd MMM', { locale: fr })} - {format(endDate, 'dd MMM yyyy', { locale: fr })}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {campaign.channels.map((channel) => (
          <Badge variant="outline" key={channel} className="text-xs">
            {getChannelText(channel)}
          </Badge>
        ))}
      </div>
      {campaign.metrics && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium mb-2">Performances</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Impressions</p>
              <p className="font-medium">{campaign.metrics.impressions.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Clics</p>
              <p className="font-medium">{campaign.metrics.clicks.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Conversions</p>
              <p className="font-medium">{campaign.metrics.conversions.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Engagement</p>
              <p className="font-medium">{campaign.metrics.engagement}%</p>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{campaign.team.length} membres</span>
        </div>
        <Button variant="outline" size="sm">
          Voir détails
        </Button>
      </div>
    </div>
  );
};

export default CampaignCard;
