
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';

const Landing = () => {
  // Appliquer la classe dark au body si nécessaire
  useEffect(() => {
    // Vérifier le thème stocké
    const storedTheme = localStorage.getItem('theme');
    
    // Appliquer le thème
    if (storedTheme === 'dark' || 
        (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 dark:text-white transition-colors">
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-marketing-primary dark:text-blue-400" />
          <span className="text-xl font-bold text-marketing-primary dark:text-blue-400">CampaignCompass</span>
        </div>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <Link to="/profile">
            <Button variant="ghost">Mon Compte</Button>
          </Link>
          <Link to="/">
            <Button>Tableau de bord</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 dark:text-white">
            Gérez vos campagnes marketing avec facilité
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            CampaignCompass vous aide à planifier, exécuter et analyser vos campagnes marketing dans une interface simple et intuitive.
          </p>
          <Link to="/">
            <Button size="lg" className="gap-2">
              Commencer maintenant
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Fonctionnalités principales</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <Calendar className="h-10 w-10 text-marketing-primary dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Planification simplifiée</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Organisez vos campagnes marketing à l'aide d'un calendrier intuitif et d'outils de planification avancés.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <BarChart3 className="h-10 w-10 text-marketing-primary dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Analyse des performances</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Suivez les performances de vos campagnes avec des tableaux de bord détaillés et des rapports personnalisables.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 dark:text-white p-6 rounded-lg shadow-md">
            <Users className="h-10 w-10 text-marketing-primary dark:text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Collaboration d'équipe</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Travaillez en équipe sur vos campagnes, partagez des commentaires et assignez des tâches à vos collaborateurs.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-marketing-primary dark:bg-blue-600 text-white p-10 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à optimiser vos campagnes marketing ?</h2>
          <p className="text-xl mb-8">
            Rejoignez des milliers d'entreprises qui utilisent CampaignCompass pour leurs stratégies marketing.
          </p>
          <Link to="/">
            <Button variant="outline" size="lg" className="bg-white text-marketing-primary hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
              Accéder à mon tableau de bord
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 dark:text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Calendar className="h-5 w-5 text-marketing-primary dark:text-blue-400" />
              <span className="text-lg font-bold text-marketing-primary dark:text-blue-400">CampaignCompass</span>
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              © {new Date().getFullYear()} CampaignCompass. Tous droits réservés.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
