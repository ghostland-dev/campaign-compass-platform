
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
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <div className="flex items-center gap-2">
            <PlusCircle className="h-5 w-5 text-primary" />
            <DialogTitle className="text-xl">Créer une nouvelle campagne</DialogTitle>
          </div>
          <DialogDescription className="text-base mt-2">
            Définissez les détails de votre campagne marketing. Cliquez sur sauvegarder lorsque vous avez terminé.
          </DialogDescription>
        </DialogHeader>
        <CampaignForm 
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModal;
