
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, MoreHorizontal, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CampaignActionsProps {
  campaignId: string;
  onDelete: (id: string) => void;
}

const CampaignActions: React.FC<CampaignActionsProps> = ({ campaignId, onDelete }) => {
  return (
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
          <Link to={`/campaign/${campaignId}`} className="flex items-center">
            <ExternalLink className="mr-2 h-4 w-4" />
            Voir les détails
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(campaignId)} className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Supprimer
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CampaignActions;
