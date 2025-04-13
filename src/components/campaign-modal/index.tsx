
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
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Créer une nouvelle campagne</DialogTitle>
          <DialogDescription>
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
