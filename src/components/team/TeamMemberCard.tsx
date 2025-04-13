
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Mail, Phone, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TeamMember } from '@/components/team/types';

interface TeamMemberCardProps {
  member: TeamMember;
  getRoleBadgeColor: (role: string) => string;
  onDeleteClick: (id: string) => void;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ 
  member, 
  getRoleBadgeColor,
  onDeleteClick 
}) => {
  const { toast } = useToast();

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md animate-fade-in">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <Avatar className="h-12 w-12">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="space-x-1">
            <Button 
              variant="ghost" 
              size="icon" 
              title="Modifier"
              className="hover:bg-secondary/80 transition-colors duration-200"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              title="Supprimer"
              className="hover:bg-destructive/20 transition-colors duration-200"
              onClick={() => onDeleteClick(member.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <CardTitle className="mt-2">{member.name}</CardTitle>
        <Badge className={`mt-1 font-normal ${getRoleBadgeColor(member.role)}`}>
          {member.role}
        </Badge>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center group cursor-copy" onClick={() => {
            navigator.clipboard.writeText(member.email);
            toast({ description: "Email copié dans le presse-papier" });
          }}>
            <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-muted-foreground truncate group-hover:text-primary transition-colors">{member.email}</span>
          </div>
          {member.phone && (
            <div className="flex items-center group cursor-copy" onClick={() => {
              navigator.clipboard.writeText(member.phone);
              toast({ description: "Numéro copié dans le presse-papier" });
            }}>
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-muted-foreground group-hover:text-primary transition-colors">{member.phone}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Badge variant="secondary" className="ml-auto">
          {member.campaigns} campagne{member.campaigns !== 1 ? 's' : ''}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default TeamMemberCard;
