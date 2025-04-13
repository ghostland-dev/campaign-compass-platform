
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { CalendarIcon, Layers } from 'lucide-react';

export default function Auth() {
  const [activeTab, setActiveTab] = useState<string>('login');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-muted/50">
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/landing" className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CampaignCompass</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Layers className="h-10 w-10 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Bienvenue</h1>
            <p className="text-muted-foreground mt-2">
              Gérez vos campagnes marketing en toute simplicité
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Connexion</TabsTrigger>
                <TabsTrigger value="register">Inscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <LoginForm />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Pas encore de compte ?{' '}
                    <Button variant="link" className="p-0" onClick={() => setActiveTab('register')}>
                      S'inscrire
                    </Button>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <RegisterForm />
                <div className="mt-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    Déjà un compte ?{' '}
                    <Button variant="link" className="p-0" onClick={() => setActiveTab('login')}>
                      Se connecter
                    </Button>
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-center"
          >
            <Link to="/landing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Retour à l'accueil
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
