export interface TeamMember {
  id: string;
  name: string;
  nickname: string;
  role: string;
  city: string;
  avatar?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  githubUrl: string;
  image?: string;
  tags?: string[];
}

export interface AppData {
  teamMembers: TeamMember[];
  projects: Project[];
}
