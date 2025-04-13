import React from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit
} from 'lucide-react';

const Profile = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Mon Profil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Photo de profil" 
                    className="h-24 w-24 rounded-full border-4 border-white shadow"
                  />
                  <Button size="icon" variant="outline" className="absolute -bottom-2 -right-2 rounded-full bg-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle>Sophie Martin</CardTitle>
              <p className="text-muted-foreground">Responsable Marketing</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>sophie.martin</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>sophie.martin@example.com</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>+33 6 12 34 56 78</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Paris, France</span>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Membre depuis Jan 2023</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="w-full">Modifier le profil</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="mb-6">
              <TabsTrigger value="activity">Activité récente</TabsTrigger>
              <TabsTrigger value="campaigns">Mes campagnes</TabsTrigger>
              <TabsTrigger value="stats">Statistiques</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="flex gap-4 pb-4 border-b last:border-0">
                        <div className="h-8 w-8 rounded-full bg-marketing-primary/20 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-marketing-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Campagne "Lancement été" modifiée</p>
                          <p className="text-xs text-muted-foreground">Il y a {item * 2} heures</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="campaigns">
              <Card>
                <CardHeader>
                  <CardTitle>Mes campagnes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex justify-between items-center pb-4 border-b last:border-0">
                        <div>
                          <p className="text-sm font-medium">Campagne #{item}</p>
                          <p className="text-xs text-muted-foreground">
                            {item === 1 ? 'Active' : item === 2 ? 'Planifiée' : 'Terminée'}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Voir</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Statistiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Campagnes créées</p>
                      <p className="text-2xl font-bold">24</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Campagnes actives</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Taux d'engagement</p>
                      <p className="text-2xl font-bold">67%</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Performance</p>
                      <p className="text-2xl font-bold">+12%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
