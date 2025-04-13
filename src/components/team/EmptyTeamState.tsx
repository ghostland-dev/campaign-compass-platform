
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserPlus, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface EmptyTeamStateProps {
  onAddMember: () => void;
}

const EmptyTeamState: React.FC<EmptyTeamStateProps> = ({ onAddMember }) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center text-center p-8 rounded-lg border border-dashed border-border bg-muted/30 space-y-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="rounded-full bg-primary/10 p-4">
        <Users className="h-12 w-12 text-primary/70" />
      </div>
      <h3 className="text-xl font-semibold text-primary">Aucun membre dans l'équipe</h3>
      <p className="text-muted-foreground max-w-md">
        Votre équipe est vide. Commencez par ajouter des membres pour collaborer sur vos campagnes marketing.
      </p>
      <Button 
        onClick={onAddMember}
        size="lg"
        className="mt-4 gap-2"
      >
        <UserPlus className="h-5 w-5" />
        Ajouter votre premier membre
      </Button>
    </motion.div>
  );
};

export default EmptyTeamState;
