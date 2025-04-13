
import React, { useState, useEffect } from 'react';
import { Campaign } from '@/types';
import { getCampaigns, deleteCampaign, deleteCalendarEventsForCampaign } from '@/services/storageService';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Grid, List, Plus, Search, Filter } from 'lucide-react';
import Layout from '@/components/Layout';
import CampaignCard from '@/components/CampaignCard';
import CampaignModal from '@/components/CampaignModal';
import { addCampaign, addCalendarEvent } from '@/services/storageService';
import { CalendarEvent } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState<Campaign[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isGridView, setIsGridView] = useState(true);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    loadCampaigns();
  }, []);
  
  useEffect(() => {
    filterCampaigns();
  }, [searchTerm, campaigns, activeTab]);
  
  const loadCampaigns = () => {
    const storedCampaigns = getCampaigns();
    setCampaigns(storedCampaigns);
  };
  
  const filterCampaigns = () => {
    let filtered = [...campaigns];
    
    // Filter by status (tab)
    if (activeTab !== "all") {
      filtered = filtered.filter(campaign => campaign.status === activeTab);
    }
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(campaign => 
        campaign.title.toLowerCase().includes(term) || 
        campaign.description.toLowerCase().includes(term) ||
        campaign.status.toLowerCase().includes(term) ||
        campaign.channels.some(channel => channel.toLowerCase().includes(term))
      );
    }
    
    setFilteredCampaigns(filtered);
  };
  
  const handleCreateCampaign = (formData: any) => {
    const newCampaign: Campaign = {
      id: `camp${Date.now()}`,
      title: formData.title,
      description: formData.description || '',
      status: formData.status,
      startDate: formData.startDate.toISOString().split('T')[0],
      endDate: formData.endDate.toISOString().split('T')[0],
      channels: formData.channels,
      owner: 'user1',
      team: ['team1'],
    };
    
    // Ajouter la campagne et mettre à jour l'état
    const updatedCampaigns = addCampaign(newCampaign);
    setCampaigns(updatedCampaigns);
    
    // Ajouter automatiquement un événement au calendrier pour cette campagne
    const newEvent: CalendarEvent = {
      id: `event${Date.now()}`,
      campaignId: newCampaign.id,
      title: newCampaign.title,
      date: newCampaign.startDate,
      channel: newCampaign.channels[0] || 'other',
      status: newCampaign.status
    };
    
    addCalendarEvent(newEvent);
    
    toast({
      title: "Campagne créée",
      description: `La campagne "${formData.title}" a été créée avec succès.`,
    });
  };
  
  const handleDeleteCampaign = (campaignId: string) => {
    // Supprimer la campagne
    const updatedCampaigns = deleteCampaign(campaignId);
    setCampaigns(updatedCampaigns);
    
    // Supprimer les événements du calendrier liés à cette campagne
    deleteCalendarEventsForCampaign(campaignId);
    
    toast({
      title: "Campagne supprimée",
      description: "La campagne a été supprimée avec succès.",
    });
  };
  
  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Campagnes</h1>
            <p className="text-muted-foreground mt-1">
              Gérez toutes vos campagnes marketing
            </p>
          </div>
          <Button onClick={() => setShowCampaignModal(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nouvelle Campagne
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <TabsList className="mb-2 md:mb-0">
              <TabsTrigger value="all">Toutes</TabsTrigger>
              <TabsTrigger value="active">Actives</TabsTrigger>
              <TabsTrigger value="draft">Planifiées</TabsTrigger>
              <TabsTrigger value="paused">En pause</TabsTrigger>
              <TabsTrigger value="completed">Terminées</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Rechercher par titre, statut ou canal..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtres</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Date de création</DropdownMenuItem>
                    <DropdownMenuItem>Canaux</DropdownMenuItem>
                    <DropdownMenuItem>Propriétaires</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                <Button
                  variant={isGridView ? "default" : "outline"}
                  size="icon"
                  onClick={() => setIsGridView(true)}
                  title="Vue grille"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={!isGridView ? "default" : "outline"}
                  size="icon"
                  onClick={() => setIsGridView(false)}
                  title="Vue liste"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <TabsContent value={activeTab} className="mt-0">
            <div className={isGridView ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
              {filteredCampaigns.length > 0 ? (
                filteredCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onDelete={handleDeleteCampaign}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-card rounded-lg shadow-sm border border-border">
                  <p className="text-muted-foreground">
                    {searchTerm.trim() 
                      ? "Aucune campagne ne correspond à votre recherche."
                      : activeTab !== "all"
                        ? `Aucune campagne avec le statut "${activeTab}" trouvée.`
                        : "Aucune campagne n'a encore été créée."}
                  </p>
                  {!searchTerm.trim() && activeTab === "all" && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setShowCampaignModal(true)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Créer votre première campagne
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <CampaignModal 
        open={showCampaignModal} 
        onOpenChange={setShowCampaignModal}
        onSubmit={handleCreateCampaign}
      />
    </Layout>
  );
};

export default Campaigns;
