
import { TeamMember } from '@/components/team/types';

// Membres d'équipe fictifs
export const initialTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sophie Martin',
    role: 'Directrice Marketing',
    email: 'sophie.martin@example.com',
    phone: '+33 6 12 34 56 78',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    campaigns: 8
  },
  {
    id: '2',
    name: 'Thomas Dubois',
    role: 'Responsable Réseaux Sociaux',
    email: 'thomas.dubois@example.com',
    phone: '+33 6 23 45 67 89',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    campaigns: 5
  },
  {
    id: '3',
    name: 'Julie Legrand',
    role: 'Graphiste',
    email: 'julie.legrand@example.com',
    phone: '+33 6 34 56 78 90',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    campaigns: 12
  },
  {
    id: '4',
    name: 'Antoine Moreau',
    role: 'Rédacteur Web',
    email: 'antoine.moreau@example.com',
    phone: '+33 6 45 67 89 01',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    campaigns: 6
  }
];

export const getRoleBadgeColor = (role: string): string => {
  const roleColors: Record<string, string> = {
    'Directrice Marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200',
    'Directeur Marketing': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 hover:bg-purple-200',
    'Responsable Réseaux Sociaux': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 hover:bg-blue-200',
    'Graphiste': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 hover:bg-pink-200',
    'Rédacteur Web': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 hover:bg-green-200',
    'Chef de Projet': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 hover:bg-orange-200',
  };
  
  return roleColors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300 hover:bg-gray-200';
};

export const generateRandomAvatar = (): string => {
  const gender = Math.random() > 0.5 ? 'men' : 'women';
  const randomId = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
};
