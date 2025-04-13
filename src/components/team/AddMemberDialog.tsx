
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, UserPlus, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NewTeamMember } from '@/components/team/types';
import { motion } from 'framer-motion';

interface AddMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember: (member: NewTeamMember) => void;
}

const AddMemberDialog: React.FC<AddMemberDialogProps> = ({ 
  isOpen, 
  onOpenChange,
  onAddMember 
}) => {
  const { toast } = useToast();
  const [newMember, setNewMember] = useState<NewTeamMember>({
    name: '',
    role: '',
    email: '',
    phone: ''
  });
  
  const resetForm = () => {
    setNewMember({ name: '', role: '', email: '', phone: '' });
  };
  
  React.useEffect(() => {
    if (!isOpen) {
      // Reset form when dialog closes
      resetForm();
    }
  }, [isOpen]);

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email || !newMember.role) {
      toast({
        title: "Formulaire incomplet",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    
    onAddMember(newMember);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="transition-all duration-300 hover:shadow-md">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <UserPlus className="h-4 w-4" />
            <span>Ajouter un membre</span>
          </motion.div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogTitle className="text-xl flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <UserPlus className="h-4 w-4 text-primary" />
              </div>
              Ajouter un membre
            </DialogTitle>
            <DialogDescription className="text-base mt-2">
              Ajoutez un nouveau membre à votre équipe marketing.
            </DialogDescription>
          </motion.div>
        </DialogHeader>
        <motion.div 
          className="space-y-4 py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet <span className="text-destructive">*</span></Label>
            <Input 
              id="name" 
              placeholder="Prénom Nom" 
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rôle <span className="text-destructive">*</span></Label>
            <Select 
              onValueChange={(value) => setNewMember({...newMember, role: value})}
              value={newMember.role}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Directeur Marketing">Directeur Marketing</SelectItem>
                <SelectItem value="Directrice Marketing">Directrice Marketing</SelectItem>
                <SelectItem value="Responsable Réseaux Sociaux">Responsable Réseaux Sociaux</SelectItem>
                <SelectItem value="Graphiste">Graphiste</SelectItem>
                <SelectItem value="Rédacteur Web">Rédacteur Web</SelectItem>
                <SelectItem value="Chef de Projet">Chef de Projet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="email@example.com"
              value={newMember.email}
              onChange={(e) => setNewMember({...newMember, email: e.target.value})}
              className="h-10"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input 
              id="phone" 
              placeholder="+33 6 XX XX XX XX"
              value={newMember.phone}
              onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
              className="h-10"
            />
          </div>
        </motion.div>
        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Annuler
          </Button>
          <Button 
            onClick={handleAddMember}
            className="gap-2"
          >
            <Save className="h-4 w-4" />
            Ajouter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
