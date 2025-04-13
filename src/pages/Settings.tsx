
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Bell, Globe, Lock, User, Shield, Moon, Sun } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);

  const handleSaveSettings = () => {
    // In a real app, we would save these settings to a backend or localStorage
    toast({
      title: "Paramètres enregistrés",
      description: "Vos préférences ont été mises à jour avec succès.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="outline" onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Paramètres</h1>
          <p className="text-muted-foreground mt-1">
            Gérez vos préférences et paramètres du compte
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-medium text-lg mb-4">Catégories</h3>
              <nav className="space-y-2">
                <a href="#account" className="flex items-center p-2 rounded-md text-marketing-primary bg-gray-100">
                  <User className="mr-2 h-4 w-4" />
                  <span>Compte</span>
                </a>
                <a href="#notifications" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </a>
                <a href="#appearance" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Apparence</span>
                </a>
                <a href="#security" className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors">
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Sécurité</span>
                </a>
              </nav>
            </div>
          </div>
          
          <div className="space-y-8">
            <section id="account" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2 h-5 w-5" />
                Compte
              </h2>
              <Separator className="mb-6" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Nom d'utilisateur</h3>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded-md"
                    defaultValue="user@example.com" 
                    disabled
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Contactez un administrateur pour modifier cette information
                  </p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center">
                    <Globe className="mr-2 h-4 w-4" />
                    Langue
                  </h3>
                  <RadioGroup 
                    value={language} 
                    onValueChange={setLanguage}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fr" id="lang-fr" />
                      <label htmlFor="lang-fr">Français</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="en" id="lang-en" />
                      <label htmlFor="lang-en">English</label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </section>
            
            <section id="notifications" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Notifications
              </h2>
              <Separator className="mb-6" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications par e-mail</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications par e-mail
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={emailNotifications}
                      onChange={() => setEmailNotifications(!emailNotifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-marketing-primary"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notifications push</h3>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications dans le navigateur
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={() => setPushNotifications(!pushNotifications)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-marketing-primary"></div>
                  </label>
                </div>
              </div>
            </section>
            
            <section id="appearance" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Sun className="mr-2 h-5 w-5" />
                Apparence
              </h2>
              <Separator className="mb-6" />
              
              <div>
                <h3 className="text-sm font-medium mb-4">Thème</h3>
                <RadioGroup 
                  value={theme} 
                  onValueChange={setTheme}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="bg-white border rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex items-center">
                    <RadioGroupItem value="light" id="theme-light" />
                    <label htmlFor="theme-light" className="ml-2 flex items-center cursor-pointer">
                      <Sun className="mr-2 h-4 w-4" />
                      Clair
                    </label>
                  </div>
                  <div className="bg-white border rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex items-center">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <label htmlFor="theme-dark" className="ml-2 flex items-center cursor-pointer">
                      <Moon className="mr-2 h-4 w-4" />
                      Sombre
                    </label>
                  </div>
                  <div className="bg-white border rounded-lg p-4 hover:bg-gray-50 cursor-pointer flex items-center">
                    <RadioGroupItem value="system" id="theme-system" />
                    <label htmlFor="theme-system" className="ml-2 flex items-center cursor-pointer">
                      <span className="mr-2">🖥️</span>
                      Système
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </section>
            
            <section id="security" className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Sécurité
              </h2>
              <Separator className="mb-6" />
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Changer le mot de passe</h3>
                  <Button variant="outline">Modifier le mot de passe</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Sessions actives</h3>
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Navigateur actuel</p>
                        <p className="text-sm text-muted-foreground">Paris, France · Dernière activité aujourd'hui</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Actif</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => navigate('/')}>Annuler</Button>
              <Button onClick={handleSaveSettings}>Enregistrer les modifications</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
