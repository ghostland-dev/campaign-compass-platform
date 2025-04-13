
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Calendar, 
  Home, 
  Settings, 
  Users, 
  LogOut, 
  Menu, 
  X,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  
  const menuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/' },
    { icon: Calendar, label: 'Calendrier', path: '/calendar' },
    { icon: BarChart3, label: 'Analyses', path: '/analytics' },
    { icon: Layers, label: 'Campagnes', path: '/campaigns' },
    { icon: Users, label: 'Équipe', path: '/team' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
  ];
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden dark:bg-black/80" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r transform transition-transform duration-300 ease-in-out bg-card",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-marketing-primary" />
              <span className="text-xl font-bold text-marketing-primary">CampaignCompass</span>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Footer */}
          <div className="p-4 border-t">
            <Button variant="ghost" className="w-full justify-start text-muted-foreground hover:text-foreground" asChild>
              <Link to="/landing">
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
