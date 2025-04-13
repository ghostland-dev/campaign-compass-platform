
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from '@/components/ui/navigation-menu';
import { Button } from '@/components/ui/button';
import { CalendarIcon, BarChart, User, Layers, Mail, MessageSquare } from 'lucide-react';

const Landing = () => {
  // Apply dark mode on load if set in localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    
    if (storedTheme === 'dark' || 
        (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CampaignCompass</span>
          </div>
          
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex gap-6">
              <NavigationMenuItem>
                <NavigationMenuLink className="text-foreground/80 hover:text-foreground transition-colors" href="#features">
                  Fonctionnalités
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-foreground/80 hover:text-foreground transition-colors" href="#testimonials">
                  Témoignages
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className="text-foreground/80 hover:text-foreground transition-colors" href="#pricing">
                  Tarifs
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="hidden md:block">
              <Button asChild variant="outline" className="mr-2">
                <Link to="/">Connexion</Link>
              </Button>
              <Button asChild>
                <Link to="/">Essai gratuit</Link>
              </Button>
            </div>
            <Button asChild variant="outline" size="icon" className="md:hidden">
              <Link to="/">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gérez vos campagnes marketing en toute simplicité
          </h1>
          <p className="text-xl text-muted-foreground mb-8 md:mb-10">
            Une plateforme tout-en-un pour planifier, exécuter et analyser vos campagnes marketing sur tous les canaux.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/">Démarrer maintenant</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-8">
              <Link to="/">Voir la démo</Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Fonctionnalités principales</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Planification</h3>
              <p className="text-muted-foreground">
                Organisez votre calendrier marketing avec une vue claire de toutes vos campagnes à venir.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Layers className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Multi-canaux</h3>
              <p className="text-muted-foreground">
                Gérez vos campagnes sur tous les canaux : email, SMS, réseaux sociaux et plus encore.
              </p>
            </div>
            
            <div className="bg-card border rounded-lg p-6 shadow-sm">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Analyses</h3>
              <p className="text-muted-foreground">
                Suivez les performances de vos campagnes avec des rapports détaillés et des analyses en temps réel.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Channel Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Tous vos canaux au même endroit</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-card border rounded-lg p-6 shadow-sm flex items-start">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center mr-4">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email Marketing</h3>
              <p className="text-muted-foreground">
                Créez, envoyez et analysez vos campagnes d'email marketing avec des modèles personnalisables.
              </p>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm flex items-start">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/20 flex items-center justify-center mr-4">
              <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">SMS Marketing</h3>
              <p className="text-muted-foreground">
                Envoyez des messages ciblés directement sur les téléphones de vos clients pour des communications instantanées.
              </p>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm flex items-start">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mr-4">
              <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Médias Sociaux</h3>
              <p className="text-muted-foreground">
                Planifiez et publiez vos contenus sur tous les réseaux sociaux depuis une seule interface.
              </p>
            </div>
          </div>
          
          <div className="bg-card border rounded-lg p-6 shadow-sm flex items-start">
            <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mr-4">
              <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Marketing Web</h3>
              <p className="text-muted-foreground">
                Créez des landing pages et des formulaires pour capturer des leads et convertir vos visiteurs.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à optimiser vos campagnes marketing ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Commencez dès aujourd'hui et découvrez comment CampaignCompass peut transformer votre marketing.
          </p>
          <Button asChild size="lg" variant="secondary" className="px-8">
            <Link to="/">Commencer gratuitement</Link>
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">CampaignCompass</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                Simplifiez la gestion de vos campagnes marketing avec notre plateforme tout-en-un.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold mb-4">Produit</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Fonctionnalités</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Tarifs</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Démo</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Ressources</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Entreprise</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">À propos</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Blog</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Carrières</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Support</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Centre d'aide</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                  <li><a href="#" className="text-muted-foreground hover:text-foreground">Status</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm mb-4 md:mb-0">
              © 2025 CampaignCompass. Tous droits réservés.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Conditions d'utilisation
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Politique de confidentialité
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
