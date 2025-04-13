
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid, List, Calendar, Clock, Users } from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface CampaignFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  activeTab: string;
  onTabChange: (value: string) => void;
  isGridView: boolean;
  setIsGridView: (isGrid: boolean) => void;
}

const CampaignFilters: React.FC<CampaignFiltersProps> = ({
  searchTerm,
  onSearchChange,
  activeTab,
  onTabChange,
  isGridView,
  setIsGridView
}) => {
  return (
    <div className="w-full bg-card shadow-sm rounded-lg p-4 border border-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
        <TabsList className="h-11 p-1 mb-2 md:mb-0 bg-muted/50">
          <TabsTrigger value="all" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Toutes
          </TabsTrigger>
          <TabsTrigger value="active" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <div className="flex items-center">
              Actives
              <Badge className="ml-2 bg-marketing-campaign-active text-white">
                {activeTab === 'active' ? '5' : ''}
              </Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="draft" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Planifiées
          </TabsTrigger>
          <TabsTrigger value="paused" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            En pause
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
            Terminées
          </TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher par titre, statut ou canal..."
              className="pl-9 pr-4 h-11 border-muted-foreground/20"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <TooltipProvider>
              <DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="h-11 w-11">
                        <Filter className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Filtres avancés</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Filtres avancés</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Date de création</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>Date de fin</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Propriétaires</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={isGridView ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsGridView(true)}
                    className="h-11 w-11"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Vue grille</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={!isGridView ? "default" : "outline"}
                    size="icon"
                    onClick={() => setIsGridView(false)}
                    className="h-11 w-11"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Vue liste</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignFilters;
