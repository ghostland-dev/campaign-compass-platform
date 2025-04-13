
import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle, 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Preferences = () => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [notifications, setNotifications] = useState(true);
  const [emailDigest, setEmailDigest] = useState(true);
  
  useEffect(() => {
    // Load theme preference from localStorage
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system' | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);
  
  const handleThemeChange = (value: 'light' | 'dark' | 'system') => {
    setTheme(value);
    localStorage.setItem('theme', value);
    
    // Apply the theme change
    const root = document.documentElement;
    
    if (value === 'dark' || 
        (value === 'system' && 
         window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-medium">Préférences</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Gérez vos préférences d'affichage et de notifications.
        </p>
      </div>
      
      <Separator />
      
      <Card>
        <CardHeader>
          <CardTitle>Apparence</CardTitle>
          <CardDescription>
            Personnalisez l'apparence de l'application selon vos préférences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="theme">Thème</Label>
            <Select value={theme} onValueChange={(value) => handleThemeChange(value as 'light' | 'dark' | 'system')}>
              <SelectTrigger id="theme" className="w-full">
                <SelectValue placeholder="Sélectionner un thème" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Clair</SelectItem>
                <SelectItem value="dark">Sombre</SelectItem>
                <SelectItem value="system">Système</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground mt-1">
              Choisissez le thème qui convient le mieux à vos préférences.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configurez comment et quand vous souhaitez être notifié.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications">Notifications dans l'application</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications en temps réel dans l'application.
              </p>
            </div>
            <Switch 
              id="notifications" 
              checked={notifications} 
              onCheckedChange={setNotifications} 
            />
          </div>
          
          <Separator />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-digest">Résumé par e-mail</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir un résumé hebdomadaire des activités par e-mail.
              </p>
            </div>
            <Switch 
              id="email-digest" 
              checked={emailDigest} 
              onCheckedChange={setEmailDigest} 
            />
          </div>
        </CardContent>
      </Card>
      
      <div className="text-right">
        <p className="text-sm text-muted-foreground flex items-center justify-end">
          <Check className="h-4 w-4 mr-1 text-green-500" />
          Les préférences sont enregistrées automatiquement
        </p>
      </div>
    </div>
  );
};

export default Preferences;
