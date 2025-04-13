
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Notifications = () => {
  const { toast } = useToast();
  
  const handleSaveNotifications = () => {
    toast({
      title: "Préférences enregistrées",
      description: "Vos préférences de notifications ont été mises à jour.",
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Notifications</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Préférences de notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Notifications par email</Label>
                <p className="text-sm text-muted-foreground">Recevoir des notifications par email pour les activités importantes</p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="campaign-updates">Mises à jour de campagnes</Label>
                <p className="text-sm text-muted-foreground">Être notifié des modifications sur les campagnes</p>
              </div>
              <Switch id="campaign-updates" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="team-activities">Activités d'équipe</Label>
                <p className="text-sm text-muted-foreground">Être notifié des activités des membres de l'équipe</p>
              </div>
              <Switch id="team-activities" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="deadline-reminders">Rappels d'échéances</Label>
                <p className="text-sm text-muted-foreground">Recevoir des rappels pour les échéances à venir</p>
              </div>
              <Switch id="deadline-reminders" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-updates">Actualités marketing</Label>
                <p className="text-sm text-muted-foreground">Recevoir des informations sur les nouvelles fonctionnalités</p>
              </div>
              <Switch id="marketing-updates" />
            </div>
            
            <Button onClick={handleSaveNotifications} className="mt-4">Enregistrer les préférences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
