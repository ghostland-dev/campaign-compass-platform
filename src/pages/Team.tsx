
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TeamList from '@/components/team/TeamList';
import TeamHeader from '@/components/team/TeamHeader';
import EmptyTeamState from '@/components/team/EmptyTeamState';
import AddMemberDialog from '@/components/team/AddMemberDialog';
import DeleteMemberDialog from '@/components/team/DeleteMemberDialog';
import TeamMemberDetail from '@/components/team/TeamMemberDetail';
import { initialTeamMembers, generateRandomAvatar } from '@/components/team/utils';
import { TeamMember, NewTeamMember } from '@/components/team/types';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

const Team = () => {
  const { toast } = useToast();
  const [members, setMembers] = useState<TeamMember[]>(initialTeamMembers);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);
  const [memberToView, setMemberToView] = useState<TeamMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  
  // Get unique roles from members for filtering
  const availableRoles = [...new Set(members.map(member => member.role))];
  
  // Load members from localStorage if available
  useEffect(() => {
    const savedMembers = localStorage.getItem('teamMembers');
    if (savedMembers) {
      try {
        setMembers(JSON.parse(savedMembers));
      } catch (e) {
        console.error("Error loading team members:", e);
      }
    }
  }, []);
  
  // Save members to localStorage when they change
  useEffect(() => {
    localStorage.setItem('teamMembers', JSON.stringify(members));
  }, [members]);
  
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
  
  const handleUpdateMember = (updatedMember: TeamMember) => {
    const updatedMembers = members.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    );
    
    setMembers(updatedMembers);
    setMemberToView(null);
  };
  
  const handleViewMember = (member: TeamMember) => {
    setMemberToView(member);
  };
  
  return (
    <Layout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold">Équipe</h1>
            <p className="text-muted-foreground mt-1">
              Gérez les membres de votre équipe marketing
            </p>
          </motion.div>
          <AddMemberDialog 
            isOpen={isAddMemberOpen}
            onOpenChange={setIsAddMemberOpen}
            onAddMember={handleAddMember}
          />
        </div>
        
        {members.length === 0 ? (
          <EmptyTeamState onAddMember={() => setIsAddMemberOpen(true)} />
        ) : (
          <>
            <TeamHeader 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              roleFilter={roleFilter}
              onRoleFilterChange={setRoleFilter}
              availableRoles={availableRoles}
            />
            
            <TeamList 
              members={members} 
              onDeleteClick={confirmDeleteMember}
              onViewClick={handleViewMember}
              searchTerm={searchTerm}
              roleFilter={roleFilter}
            />
          </>
        )}
        
        <DeleteMemberDialog 
          isOpen={memberToDelete !== null}
          onOpenChange={(open) => !open && setMemberToDelete(null)}
          memberToDelete={memberToDelete}
          onConfirmDelete={handleDeleteMember}
        />
        
        <TeamMemberDetail 
          isOpen={memberToView !== null}
          onOpenChange={(open) => !open && setMemberToView(null)}
          member={memberToView}
          onUpdate={handleUpdateMember}
        />
      </motion.div>
    </Layout>
  );
};

export default Team;
