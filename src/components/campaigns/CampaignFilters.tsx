
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Grid, List } from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

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
    <div className="w-full">
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
              onChange={(e) => onSearchChange(e.target.value)}
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
    </div>
  );
};

export default CampaignFilters;
