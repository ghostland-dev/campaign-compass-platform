
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CampaignForm from './CampaignForm';
import { CampaignFormValues } from './CampaignFormSchema';
import { PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CampaignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: CampaignFormValues) => void;
}

const CampaignModal: React.FC<CampaignModalProps> = ({ 
  open, 
  onOpenChange, 
  onSubmit 
}) => {
  const handleSubmit = (values: CampaignFormValues) => {
    if (onSubmit) {
      onSubmit(values);
    }
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-6 border-2 border-primary/10">
        <DialogHeader className="mb-6">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-primary/10 p-2 rounded-full">
              <PlusCircle className="h-6 w-6 text-primary" />
            </div>
            <DialogTitle className="text-2xl font-bold">Créer une nouvelle campagne</DialogTitle>
          </motion.div>
          <DialogDescription className="text-base mt-3 text-muted-foreground">
            Définissez les détails de votre campagne marketing. Cliquez sur sauvegarder lorsque vous avez terminé.
          </DialogDescription>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <CampaignForm 
            onSubmit={handleSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModal;
