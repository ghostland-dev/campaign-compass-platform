
import React from 'react';

interface CampaignTeamProps {
  team: string[];
}

const CampaignTeam: React.FC<CampaignTeamProps> = ({ team }) => {
  return (
    <div className="flex -space-x-2">
      {team.slice(0, 3).map((member, index) => (
        <div 
          key={index}
          className="h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium border-2 border-background"
        >
          {member.charAt(0).toUpperCase()}
        </div>
      ))}
    </div>
  );
};

export default CampaignTeam;
