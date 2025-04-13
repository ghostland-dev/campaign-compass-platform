
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Edit, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Campaign } from '@/types';
import { getCampaigns, deleteCampaign, deleteCalendarEventsForCampaign } from '@/services/storageService';

const CampaignDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCampaign = () => {
      setLoading(true);
      const campaigns = getCampaigns();
      const foundCampaign = campaigns.find(c => c.id === id);
      
      if (foundCampaign) {
        setCampaign(foundCampaign);
      }
      setLoading(false);
    };

    loadCampaign();
  }, [id]);

  const handleDelete = () => {
    if (!campaign) return;
    
    deleteCampaign(campaign.id);
    deleteCalendarEventsForCampaign(campaign.id);
    
    toast({
      title: "Campagne supprimée",
      description: `La campagne "${campaign.title}" a été supprimée avec succès.`,
    });
    
    navigate('/');
  };

  // Calculate days left and progress
  const calculateDaysLeft = () => {
    if (!campaign) return 0;
    
    const endDate = new Date(campaign.endDate);
    const startDate = new Date(campaign.startDate);
    const today = new Date();
    
    if (today > endDate) return 0;
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysLeft = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.max(0, daysLeft);
  };
  
  const calculateProgress = () => {
    if (!campaign) return 0;
    
    const endDate = new Date(campaign.endDate);
    const startDate = new Date(campaign.startDate);
    const today = new Date();
    
    if (today < startDate) return 0;
    if (today > endDate) return 100;
    
    const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    return Math.min(100, Math.max(0, Math.floor((daysPassed / totalDays) * 100)));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="h-32 bg-gray-200 rounded mb-6"></div>
            <div className="h-16 bg-gray-200 rounded mb-6"></div>
            <div className="h-16 bg-gray-200 rounded mb-6"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold mb-4">Campagne non trouvée</h1>
            <p className="text-muted-foreground mb-6">La campagne que vous recherchez n'existe pas ou a été supprimée.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour au tableau de bord
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const daysLeft = calculateDaysLeft();
  const progress = calculateProgress();
  const statusColors = {
    'active': 'bg-green-100 text-green-800',
    'planned': 'bg-blue-100 text-blue-800',
    'completed': 'bg-gray-100 text-gray-800',
    'paused': 'bg-yellow-100 text-yellow-800'
  };
  const statusColor = statusColors[campaign.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
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
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                {campaign.status === 'active' ? 'Active' : 
                 campaign.status === 'planned' ? 'Planifiée' : 
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
            <Button variant="destructive" onClick={handleDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Supprimer
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-sm text-muted-foreground mb-1">Progression</div>
            <div className="flex items-center mb-2">
              <Progress value={progress} className="h-2 flex-1" />
              <span className="ml-2 text-sm font-medium">{progress}%</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {daysLeft} jour{daysLeft !== 1 ? 's' : ''} restant{daysLeft !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-sm text-muted-foreground mb-1">Canaux</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {campaign.channels.map(channel => (
                <span 
                  key={channel}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium"
                >
                  {channel === 'email' ? 'Email' : 
                   channel === 'social' ? 'Réseaux Sociaux' : 
                   channel === 'web' ? 'Web' : 
                   channel === 'mobile' ? 'Mobile' : channel}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="text-sm text-muted-foreground mb-1">Équipe</div>
            <div className="flex items-center mt-2">
              <div className="flex -space-x-2">
                {campaign.team.map((member, index) => (
                  <div 
                    key={index}
                    className="h-8 w-8 rounded-full bg-marketing-primary text-white flex items-center justify-center text-xs font-medium border-2 border-white"
                  >
                    {member.charAt(0).toUpperCase()}
                  </div>
                ))}
              </div>
              <span className="ml-3 text-sm">{campaign.owner}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700">
            {campaign.description || "Aucune description disponible pour cette campagne."}
          </p>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Calendrier de la campagne</h2>
          <div className="flex items-center text-muted-foreground text-sm mb-6">
            <Calendar className="h-4 w-4 mr-2" />
            Événements programmés pour cette campagne
          </div>
          
          <div className="text-center py-8 text-muted-foreground">
            Cette fonctionnalité sera bientôt disponible
          </div>
        </div>
      </main>
    </div>
  );
};

export default CampaignDetails;
