
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
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout, user } = useAuth();
  
  const menuItems = [
    { icon: Home, label: 'Tableau de bord', path: '/' },
    { icon: Calendar, label: 'Calendrier', path: '/calendar' },
    { icon: BarChart3, label: 'Analyses', path: '/analytics' },
    { icon: Layers, label: 'Campagnes', path: '/campaigns' },
    { icon: Users, label: 'Équipe', path: '/team' },
    { icon: Settings, label: 'Paramètres', path: '/settings' },
  ];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };
  
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden dark:bg-black/80 backdrop-blur-sm" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 border-r shadow-sm transform transition-transform duration-300 ease-in-out bg-card",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">CampaignCompass</span>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* User Profile */}
          {user && (
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar || undefined} alt={user.name || "User"} />
                  <AvatarFallback>{user.name ? getInitials(user.name) : "U"}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name || user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all hover:bg-muted",
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground"
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
            <Button 
              variant="outline" 
              className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-destructive/10 transition-colors"
              onClick={logout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
