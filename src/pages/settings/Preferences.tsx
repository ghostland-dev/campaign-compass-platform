
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const Preferences = () => {
  const { toast } = useToast();
  
  const handleSavePreferences = () => {
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences d'affichage ont été mises à jour.",
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Préférences</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Préférences d'affichage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Thème</Label>
              <RadioGroup defaultValue="light" className="flex gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light">Clair</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark">Sombre</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system">Système</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Langue</Label>
              <Select defaultValue="fr">
                <SelectTrigger id="language">
                  <SelectValue placeholder="Sélectionner une langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timezone">Fuseau horaire</Label>
              <Select defaultValue="europe-paris">
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Sélectionner un fuseau horaire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                  <SelectItem value="europe-london">Europe/London (GMT+0)</SelectItem>
                  <SelectItem value="america-new_york">America/New_York (GMT-5)</SelectItem>
                  <SelectItem value="asia-tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date-format">Format de date</Label>
              <Select defaultValue="dd-mm-yyyy">
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Sélectionner un format de date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY/MM/DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleSavePreferences}>Enregistrer les préférences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Preferences;
