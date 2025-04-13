
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  campaigns: number;
}

export interface NewTeamMember {
  name: string;
  role: string;
  email: string;
  phone: string;
}
