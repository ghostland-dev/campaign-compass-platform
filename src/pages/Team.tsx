
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import TeamList from '@/components/team/TeamList';
import EmptyTeamState from '@/components/team/EmptyTeamState';
import AddMemberDialog from '@/components/team/AddMemberDialog';
import DeleteMemberDialog from '@/components/team/DeleteMemberDialog';
import { initialTeamMembers, generateRandomAvatar } from '@/components/team/utils';
import { TeamMember, NewTeamMember } from '@/components/team/types';
import { useToast } from '@/hooks/use-toast';

const Team = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  
  const handleAddMember = (newMemberData: NewTeamMember) => {
    const member: TeamMember = {
      id: `member-${Date.now()}`,
      ...newMemberData,
      avatar: generateRandomAvatar(),
      campaigns: 0
    };
    
    setMembers([...members, member]);
    setIsAddMemberOpen(false);
    
    toast({
      title: "Membre ajouté",
      description: `${member.name} a été ajouté à l'équipe.`
    });
  };
  
  const confirmDeleteMember = (id: string) => {
    const member = members.find(m => m.id === id) || null;
    setMemberToDelete(member);
  };
  
  const handleDeleteMember = () => {
    if (!memberToDelete) return;
    
    const memberName = memberToDelete.name;
    const updatedMembers = members.filter(member => member.id !== memberToDelete.id);
    setMembers(updatedMembers);
    setMemberToDelete(null);
    
    toast({
      title: "Membre supprimé",
      description: `${memberName} a été supprimé de l'équipe.`
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Équipe</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les membres de votre équipe marketing
            </p>
          </div>
          <AddMemberDialog 
            isOpen={isAddMemberOpen}
            onOpenChange={setIsAddMemberOpen}
            onAddMember={handleAddMember}
          />
        </div>
        
        {members.length === 0 ? (
          <EmptyTeamState onAddMember={() => setIsAddMemberOpen(true)} />
        ) : (
          <TeamList 
            members={members} 
            onDeleteClick={confirmDeleteMember}
          />
        )}
        
        <DeleteMemberDialog 
          isOpen={memberToDelete !== null}
          onOpenChange={(open) => !open && setMemberToDelete(null)}
          memberToDelete={memberToDelete}
          onConfirmDelete={handleDeleteMember}
        />
      </div>
    </Layout>
  );
};

export default Team;
