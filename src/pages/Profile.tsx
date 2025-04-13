
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, Shield, Key, LogOut } from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  position: string;
  location: string;
  joinDate: string;
  avatar: string;
}

const Profile = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  
  // Simulate profile data
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Sophie Martin',
    email: 'sophie.martin@exemple.fr',
    phone: '+33 6 12 34 56 78',
    position: 'Responsable Marketing',
    location: 'Paris, France',
    joinDate: '15 juin 2023',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  });

  // Handler for updating profile
  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profil mis à jour",
      description: "Vos informations de profil ont été mises à jour avec succès.",
    });
  };

  // Handler for changing password
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Mot de passe modifié",
      description: "Votre mot de passe a été modifié avec succès.",
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          {/* Profile Card */}
          <Card className="w-full md:w-80 h-fit">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </div>
              <CardTitle>{profile.name}</CardTitle>
              <CardDescription>{profile.position}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{profile.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{profile.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  <span>Membre depuis {profile.joinDate}</span>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline" className="bg-primary/10 text-primary">Marketing</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary">Email</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary">Stratégie</Badge>
                <Badge variant="outline" className="bg-primary/10 text-primary">Contenu</Badge>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" asChild>
                <a href="/settings">
                  <Shield className="mr-2 h-4 w-4" />
                  Paramètres du compte
                </a>
              </Button>
            </CardFooter>
          </Card>

          {/* Profile Settings */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="general" className="flex-1">
                  <User className="mr-2 h-4 w-4" />
                  Général
                </TabsTrigger>
                <TabsTrigger value="security" className="flex-1">
                  <Key className="mr-2 h-4 w-4" />
                  Sécurité
                </TabsTrigger>
                <TabsTrigger value="activity" className="flex-1">
                  <Calendar className="mr-2 h-4 w-4" />
                  Activité
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>Informations du profil</CardTitle>
                    <CardDescription>
                      Mettez à jour vos informations personnelles et professionnelles.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleUpdateProfile}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom complet</Label>
                          <Input id="name" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input id="phone" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="position">Poste</Label>
                          <Input id="position" value={profile.position} onChange={(e) => setProfile({...profile, position: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Localisation</Label>
                          <Input id="location" value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="avatar">Photo de profil</Label>
                          <Input id="avatar" type="file" className="cursor-pointer" />
                        </div>
                      </div>
                      <Button type="submit" className="mt-6">Enregistrer les modifications</Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Sécurité du compte</CardTitle>
                    <CardDescription>
                      Mettez à jour votre mot de passe et les paramètres de sécurité.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleChangePassword}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Mot de passe actuel</Label>
                          <Input id="current-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="new-password">Nouveau mot de passe</Label>
                          <Input id="new-password" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirmer le mot de passe</Label>
                          <Input id="confirm-password" type="password" />
                        </div>
                      </div>
                      <Button type="submit" className="mt-6">Modifier le mot de passe</Button>
                    </form>

                    <Separator className="my-8" />

                    <div>
                      <h3 className="text-lg font-medium mb-4">Sessions et appareils</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between p-4 border rounded-md">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <Briefcase className="h-4 w-4 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">Windows PC - Chrome</p>
                              <p className="text-sm text-muted-foreground">Paris, France · Actif maintenant</p>
                            </div>
                          </div>
                          <Badge>Session courante</Badge>
                        </div>

                        <div className="flex justify-between p-4 border rounded-md">
                          <div className="flex items-center">
                            <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center mr-3">
                              <Briefcase className="h-4 w-4" />
                            </div>
                            <div>
                              <p className="font-medium">iPhone - Safari</p>
                              <p className="text-sm text-muted-foreground">Paris, France · Il y a 2 heures</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Déconnecter</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle>Activité récente</CardTitle>
                    <CardDescription>
                      Consultez votre historique d'activité sur la plateforme.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { action: "Création de campagne", campaign: "Soldes d'été", date: "Aujourd'hui, 14:32" },
                        { action: "Modification de campagne", campaign: "Lancement produit", date: "Hier, 10:15" },
                        { action: "Connexion", campaign: "", date: "Hier, 09:45" },
                        { action: "Ajout de membre", campaign: "Équipe marketing", date: "3 avril, 16:20" },
                        { action: "Création de campagne", campaign: "Newsletter avril", date: "1 avril, 11:05" }
                      ].map((item, index) => (
                        <div key={index} className="flex items-start p-3 border rounded-md">
                          <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center mr-3">
                            <User className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{item.action}</p>
                            {item.campaign && (
                              <p className="text-sm">{item.campaign}</p>
                            )}
                            <p className="text-sm text-muted-foreground">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <Card className="p-6 bg-muted/50 border-dashed border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold">Se déconnecter</h3>
              <p className="text-muted-foreground">
                Vous quittez votre compte? Vous pourrez vous reconnecter à tout moment.
              </p>
            </div>
            <Button variant="destructive" className="shrink-0">
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
