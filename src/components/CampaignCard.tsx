
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ExternalLink, MoreHorizontal, Trash2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Campaign } from '@/types';

interface CampaignCardProps {
  campaign: Campaign;
  onDelete: (id: string) => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onDelete }) => {
  // Calculate days left and progress
  const calculateDaysLeft = () => {
    const endDate = new Date(campaign.endDate);
    const today = new Date();
    
    if (today > endDate) return 0;
    
    return Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  };
  
  const calculateProgress = () => {
    const endDate = new Date(campaign.endDate);
    const startDate = new Date(campaign.startDate);
    const today = new Date();
    
    if (today < startDate) return 0;
    if (today > endDate) return 100;
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.min(100, Math.max(0, Math.floor((daysPassed / totalDays) * 100)));
  };
  
  const daysLeft = calculateDaysLeft();
  const progress = calculateProgress();
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Link to={`/campaign/${campaign.id}`} className="text-lg font-semibold hover:text-marketing-primary transition-colors">
            {campaign.title}
          </Link>
          <div className="flex items-center mt-1">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
              {campaign.status === 'active' ? 'Active' : 
               campaign.status === 'planned' ? 'Planifiée' : 
               campaign.status === 'completed' ? 'Terminée' : 'En pause'}
            </span>
            <span className="ml-2 text-xs text-muted-foreground flex items-center">
              <Calendar className="h-3 w-3 mr-1" /> 
              {campaign.startDate}
            </span>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to={`/campaign/${campaign.id}`} className="flex items-center">
                <ExternalLink className="mr-2 h-4 w-4" />
                Voir les détails
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(campaign.id)} className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {campaign.description || "Aucune description disponible pour cette campagne."}
      </p>
      
      <div className="mt-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Progression</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="mt-2 text-xs text-muted-foreground">
          {daysLeft} jour{daysLeft !== 1 ? 's' : ''} restant{daysLeft !== 1 ? 's' : ''}
        </div>
      </div>
      
      <div className="mt-4 flex">
        <div className="flex -space-x-2">
          {campaign.team.slice(0, 3).map((member, index) => (
            <div 
              key={index}
              className="h-6 w-6 rounded-full bg-marketing-primary text-white flex items-center justify-center text-xs font-medium border-2 border-white"
            >
              {member.charAt(0).toUpperCase()}
            </div>
          ))}
        </div>
        <div className="flex ml-2 space-x-1">
          {campaign.channels.slice(0, 2).map((channel, index) => (
            <span 
              key={index}
              className="px-2 py-0.5 bg-gray-100 rounded-full text-xs"
            >
              {channel === 'email' ? 'Email' : 
               channel === 'social' ? 'Social' : 
               channel === 'web' ? 'Web' : 
               channel === 'mobile' ? 'Mobile' : channel}
            </span>
          ))}
          {campaign.channels.length > 2 && (
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-xs">
              +{campaign.channels.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
