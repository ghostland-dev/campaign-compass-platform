
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface EmptyTeamStateProps {
  onAddMember: () => void;
}

const EmptyTeamState: React.FC<EmptyTeamStateProps> = ({ onAddMember }) => {
  return (
    <div className="rounded-lg border border-dashed p-10 text-center">
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="rounded-full bg-muted p-3">
          <Plus className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Aucun membre d'équipe</h3>
          <p className="text-sm text-muted-foreground">
            Commencez à ajouter des membres à votre équipe.
          </p>
        </div>
        <Button 
          onClick={onAddMember}
          className="mt-3"
        >
          Ajouter un membre
        </Button>
      </div>
    </div>
  );
};

export default EmptyTeamState;
