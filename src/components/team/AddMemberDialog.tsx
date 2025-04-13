
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
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { NewTeamMember } from '@/components/team/types';

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
    setNewMember({ name: '', role: '', email: '', phone: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="transition-all duration-300 hover:scale-105">
          <Plus className="mr-2 h-4 w-4" /> Ajouter un membre
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un membre</DialogTitle>
          <DialogDescription>
            Ajoutez un nouveau membre à votre équipe.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet <span className="text-destructive">*</span></Label>
            <Input 
              id="name" 
              placeholder="Prénom Nom" 
              value={newMember.name}
              onChange={(e) => setNewMember({...newMember, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Rôle <span className="text-destructive">*</span></Label>
            <Select 
              onValueChange={(value) => setNewMember({...newMember, role: value})}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un rôle" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Directeur Marketing">Directeur Marketing</SelectItem>
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
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input 
              id="phone" 
              placeholder="+33 6 XX XX XX XX"
              value={newMember.phone}
              onChange={(e) => setNewMember({...newMember, phone: e.target.value})}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Annuler</Button>
          <Button onClick={handleAddMember}>Ajouter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberDialog;
