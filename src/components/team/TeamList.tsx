
import React from 'react';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { TeamMember } from '@/components/team/types';
import { getRoleBadgeColor } from '@/components/team/utils';

interface TeamListProps {
  members: TeamMember[];
  onDeleteClick: (id: string) => void;
}

const TeamList: React.FC<TeamListProps> = ({ members, onDeleteClick }) => {
  if (members.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {members.map((member) => (
        <TeamMemberCard 
          key={member.id} 
          member={member} 
          getRoleBadgeColor={getRoleBadgeColor}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
};

export default TeamList;
