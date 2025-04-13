
import React from 'react';
import { Check, Trash2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Activité Récente</h2>
        <Button variant="ghost" size="sm">
          Voir tout
        </Button>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <Users className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Sophie a créé une nouvelle campagne</p>
            <p className="text-xs text-muted-foreground">Il y a 10 minutes</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <Check className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Thomas a approuvé "Newsletter Mensuelle"</p>
            <p className="text-xs text-muted-foreground">Il y a 45 minutes</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <Trash2 className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-medium">Julie a supprimé "Webinaire Marketing"</p>
            <p className="text-xs text-muted-foreground">Il y a 2 heures</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
