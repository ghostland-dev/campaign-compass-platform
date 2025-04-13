
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TeamMember } from '@/components/team/types';

interface DeleteMemberDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  memberToDelete: TeamMember | null;
  onConfirmDelete: () => void;
}

const DeleteMemberDialog: React.FC<DeleteMemberDialogProps> = ({
  isOpen,
  onOpenChange,
  memberToDelete,
  onConfirmDelete
}) => {
  if (!memberToDelete) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer ce membre ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. {memberToDelete.name} sera définitivement supprimé de l'équipe.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirmDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMemberDialog;
