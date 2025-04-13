
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TeamMember } from '@/components/team/types';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Mail, Phone, Edit, Save, X } from 'lucide-react';

interface TeamMemberDetailProps {
  member: TeamMember | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdate: (updatedMember: TeamMember) => void;
}

const TeamMemberDetail: React.FC<TeamMemberDetailProps> = ({
  member,
  isOpen,
  onOpenChange,
  onUpdate
}) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedMember, setEditedMember] = useState<TeamMember | null>(null);
  
  React.useEffect(() => {
    if (member) {
      setEditedMember({ ...member });
    }
    setIsEditing(false);
  }, [member]);
  
  if (!member || !editedMember) return null;
  
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleSave = () => {
    if (!editedMember) return;
    
    onUpdate(editedMember);
    setIsEditing(false);
    
    toast({
      title: "Membre mis à jour",
      description: `Les informations de ${editedMember.name} ont été mises à jour.`
    });
  };
  
  const handleCancel = () => {
    if (member) {
      setEditedMember({ ...member });
    }
    setIsEditing(false);
  };
  
  const handleChange = (field: keyof TeamMember, value: string) => {
    if (editedMember) {
      setEditedMember({
        ...editedMember,
        [field]: value
      });
    }
  };
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {isEditing ? "Modifier le membre" : "Détails du membre"}
          </DialogTitle>
          <DialogDescription>
            {isEditing 
              ? "Modifiez les informations et cliquez sur Enregistrer." 
              : "Informations détaillées du membre de l'équipe."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center space-y-3">
            <Avatar className="h-20 w-20">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-lg">{getInitials(member.name)}</AvatarFallback>
            </Avatar>
            
            {isEditing ? (
              <Input 
                value={editedMember.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="text-center font-semibold text-lg"
              />
            ) : (
              <motion.h2 
                className="text-xl font-semibold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {member.name}
              </motion.h2>
            )}
            
            {isEditing ? (
              <Select 
                value={editedMember.role} 
                onValueChange={(value) => handleChange('role', value)}
              >
                <SelectTrigger className="w-full">
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
            ) : (
              <Badge className="mt-1 px-3 py-1 font-normal bg-primary/10 text-primary hover:bg-primary/20">
                {member.role}
              </Badge>
            )}
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Email</Label>
              {isEditing ? (
                <Input 
                  value={editedMember.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  type="email"
                />
              ) : (
                <div className="flex items-center gap-2 group">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span 
                    className="text-muted-foreground cursor-copy group-hover:text-primary transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(member.email);
                      toast({ description: "Email copié dans le presse-papier" });
                    }}
                  >
                    {member.email}
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Téléphone</Label>
              {isEditing ? (
                <Input 
                  value={editedMember.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  type="tel"
                />
              ) : (
                <div className="flex items-center gap-2 group">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span 
                    className="text-muted-foreground cursor-copy group-hover:text-primary transition-colors"
                    onClick={() => {
                      navigator.clipboard.writeText(member.phone);
                      toast({ description: "Numéro copié dans le presse-papier" });
                    }}
                  >
                    {member.phone}
                  </span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Campagnes</Label>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {member.campaigns} campagne{member.campaigns !== 1 ? 's' : ''}
                </Badge>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          {isEditing ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                className="gap-2"
              >
                <X className="h-4 w-4" />
                Annuler
              </Button>
              <Button 
                onClick={handleSave}
                className="gap-2"
              >
                <Save className="h-4 w-4" />
                Enregistrer
              </Button>
            </>
          ) : (
            <Button 
              onClick={handleEdit}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Modifier
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TeamMemberDetail;
