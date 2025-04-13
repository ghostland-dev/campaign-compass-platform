
import React from 'react';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Bell, 
  Settings as SettingsIcon,
  HelpCircle
} from 'lucide-react';

// Import des sous-pages
import Account from './settings/Account';
import Notifications from './settings/Notifications';
import Preferences from './settings/Preferences';

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  const isActive = (path: string) => {
    if (path === '/settings' && currentPath === '/settings') {
      return true;
    }
    return currentPath.includes(path);
  };
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Paramètres</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
            <Button
              variant={isActive('/settings/account') ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate('/settings/account')}
            >
              <User className="mr-2 h-4 w-4" />
              Compte
            </Button>
            <Button
              variant={isActive('/settings/notifications') ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate('/settings/notifications')}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button
              variant={isActive('/settings/preferences') ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => navigate('/settings/preferences')}
            >
              <SettingsIcon className="mr-2 h-4 w-4" />
              Préférences
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Aide et support
            </Button>
          </div>
        </div>
        
        <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-sm">
          <Routes>
            <Route path="/" element={<Account />} />
            <Route path="/account" element={<Account />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/preferences" element={<Preferences />} />
          </Routes>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
