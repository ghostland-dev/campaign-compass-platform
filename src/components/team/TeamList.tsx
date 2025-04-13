
import React from 'react';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { TeamMember } from '@/components/team/types';
import { getRoleBadgeColor } from '@/components/team/utils';
import { motion } from 'framer-motion';

interface TeamListProps {
  members: TeamMember[];
  onDeleteClick: (id: string) => void;
  onViewClick: (member: TeamMember) => void;
  searchTerm: string;
  roleFilter: string;
}

const TeamList: React.FC<TeamListProps> = ({ 
  members, 
  onDeleteClick,
  onViewClick,
  searchTerm,
  roleFilter
}) => {
  // Filter members based on search term and role filter
  const filteredMembers = members.filter(member => {
    const matchesSearch = searchTerm === '' || 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === '' || member.role === roleFilter;
    
    return matchesSearch && matchesRole;
  });
  
  if (filteredMembers.length === 0) {
    return (
      <motion.div 
        className="text-center py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-muted-foreground">
          {members.length === 0 
            ? "Aucun membre dans l'équipe." 
            : "Aucun membre ne correspond à vos critères de recherche."}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {filteredMembers.map((member) => (
        <TeamMemberCard 
          key={member.id} 
          member={member} 
          getRoleBadgeColor={getRoleBadgeColor}
          onDeleteClick={onDeleteClick}
          onViewClick={onViewClick}
        />
      ))}
    </div>
  );
};

export default TeamList;
