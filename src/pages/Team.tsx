
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Plus, Mail, Phone, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Membres d'équipe fictifs
const teamMembers = [
  {
    id: '1',
    name: 'Sophie Martin',
    role: 'Directrice Marketing',
    email: 'sophie.martin@example.com',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    campaigns: 8
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    role: 'Responsable Réseaux Sociaux',
    email: 'thomas.dubois@example.com',
    phone: '+33 6 23 45 67 89',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    campaigns: 5
  },
  {
    id: '3',
    name: 'Julie Legrand',
    role: 'Graphiste',
    email: 'julie.legrand@example.com',
    phone: '+33 6 34 56 78 90',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    campaigns: 12
  },
  {
    id: '4',
    name: 'Antoine Moreau',
    role: 'Rédacteur Web',
    email: 'antoine.moreau@example.com',
    phone: '+33 6 45 67 89 01',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    campaigns: 6
  }
];

const getRoleBadgeColor = (role: string) => {
  const roleColors: Record<string, string> = {
    'Directrice Marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200',
    'Directeur Marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200',
    'Responsable Réseaux Sociaux': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200',
    'Graphiste': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 hover:bg-pink-200',
    'Rédacteur Web': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200',
    'Chef de Projet': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200',
  };
  
  return roleColors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200';
};

const Team = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState(teamMembers);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<string | null>(null);
  const [newMember, setNewMember] = useState({
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
    
    const member = {
      id: `member-${Date.now()}`,
      ...newMember,
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
      campaigns: 0
    };
    
    setMembers([...members, member]);
    setNewMember({ name: '', role: '', email: '', phone: '' });
    setIsAddMemberOpen(false);
    
    toast({
      title: "Membre ajouté",
      description: `${member.name} a été ajouté à l'équipe.`
    });
  };
  
  const confirmDeleteMember = (id: string) => {
    setMemberToDelete(id);
  };
  
  const handleDeleteMember = () => {
    if (!memberToDelete) return;
    
    const memberName = members.find(m => m.id === memberToDelete)?.name || 'Le membre';
    const updatedMembers = members.filter(member => member.id !== memberToDelete);
    setMembers(updatedMembers);
    setMemberToDelete(null);
    
    toast({
      title: "Membre supprimé",
      description: `${memberName} a été supprimé de l'équipe.`
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Équipe</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les membres de votre équipe marketing
            </p>
          </div>
          <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
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
                <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>Annuler</Button>
                <Button onClick={handleAddMember}>Ajouter</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {members.length === 0 ? (
          <div className="rounded-lg border border-dashed p-10 text-center">
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="rounded-full bg-muted p-3">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-medium">Aucun membre d'équipe</h3>
                <p className="text-sm text-muted-foreground">
                  Commencez à ajouter des membres à votre équipe.
                </p>
              </div>
              <Button 
                onClick={() => setIsAddMemberOpen(true)}
                className="mt-3"
              >
                Ajouter un membre
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {members.map((member) => (
              <Card 
                key={member.id} 
                className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="space-x-1">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Modifier"
                        className="hover:bg-secondary/80 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog open={memberToDelete === member.id} onOpenChange={(open) => !open && setMemberToDelete(null)}>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            title="Supprimer"
                            className="hover:bg-destructive/20 transition-colors duration-200"
                            onClick={() => confirmDeleteMember(member.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce membre ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Cette action est irréversible. {member.name} sera définitivement supprimé de l'équipe.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={handleDeleteMember}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <CardTitle className="mt-2">{member.name}</CardTitle>
                  <Badge className={`mt-1 font-normal ${getRoleBadgeColor(member.role)}`}>
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center group cursor-copy" onClick={() => {
                      navigator.clipboard.writeText(member.email);
                      toast({ description: "Email copié dans le presse-papier" });
                    }}>
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-muted-foreground truncate group-hover:text-primary transition-colors">{member.email}</span>
                    </div>
                    {member.phone && (
                      <div className="flex items-center group cursor-copy" onClick={() => {
                        navigator.clipboard.writeText(member.phone);
                        toast({ description: "Numéro copié dans le presse-papier" });
                      }}>
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">{member.phone}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Badge variant="secondary" className="ml-auto">
                    {member.campaigns} campagne{member.campaigns !== 1 ? 's' : ''}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Team;
