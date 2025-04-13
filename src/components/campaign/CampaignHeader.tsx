
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Campaign } from '@/types';

interface CampaignHeaderProps {
  campaign: Campaign;
  onDelete: () => void;
}

const CampaignHeader: React.FC<CampaignHeaderProps> = ({ campaign, onDelete }) => {
  const navigate = useNavigate();
  
  const getStatusColor = (status: string) => {
    const statusColors = {
      'active': 'bg-green-100 text-green-800',
      'draft': 'bg-blue-100 text-blue-800',
      'completed': 'bg-gray-100 text-gray-800',
      'paused': 'bg-yellow-100 text-yellow-800'
    };
    return statusColors[status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <>
      <div className="mb-8">
        <Button variant="outline" onClick={() => navigate('/')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour au tableau de bord
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{campaign.title}</h1>
          <div className="flex items-center mt-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
              {campaign.status === 'active' ? 'Active' : 
               campaign.status === 'draft' ? 'Planifiée' : 
               campaign.status === 'completed' ? 'Terminée' : 'En pause'}
            </span>
            <span className="ml-4 text-sm text-muted-foreground">
              {campaign.startDate} - {campaign.endDate}
            </span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-2">
          <Button variant="outline" onClick={() => navigate(`/campaign/${campaign.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Modifier
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Supprimer
          </Button>
        </div>
      </div>
    </>
  );
};

export default CampaignHeader;
