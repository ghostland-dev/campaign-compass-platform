
import React from 'react';
import { Campaign } from '@/types';
import CampaignCard from '@/components/CampaignCard';
import { Button } from '@/components/ui/button';
import { Plus, FileSpreadsheet } from 'lucide-react';
import { motion } from 'framer-motion';

interface CampaignGridProps {
  campaigns: Campaign[];
  isGridView: boolean;
  onDelete: (id: string) => void;
  searchTerm: string;
  activeTab: string;
  onCreateCampaign: () => void;
}

const CampaignGrid: React.FC<CampaignGridProps> = ({ 
  campaigns,
  isGridView,
  onDelete,
  searchTerm,
  activeTab,
  onCreateCampaign
}) => {
  // Variants pour l'animation des cartes
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div className="relative min-h-[300px]">
      {campaigns.length > 0 ? (
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className={isGridView 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }
        >
          {campaigns.map((campaign) => (
            <motion.div key={campaign.id} variants={item}>
              <CampaignCard
                campaign={campaign}
                onDelete={onDelete}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-full flex flex-col items-center justify-center py-16 px-6 bg-card rounded-lg shadow-sm border border-border"
        >
          <FileSpreadsheet className="h-16 w-16 text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-xl font-medium mb-2">Aucune campagne trouvée</h3>
          <p className="text-muted-foreground text-center max-w-md mb-6">
            {searchTerm.trim() 
              ? "Aucune campagne ne correspond à votre recherche."
              : activeTab !== "all"
                ? `Aucune campagne avec le statut "${activeTab}" trouvée.`
                : "Aucune campagne n'a encore été créée."}
          </p>
          {!searchTerm.trim() && (
            <Button 
              size="lg"
              onClick={onCreateCampaign}
              className="gap-2"
            >
              <Plus className="h-5 w-5" /> Créer une campagne
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CampaignGrid;
