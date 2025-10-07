import { AppData, TeamMember, Project } from '@/types';

const STORAGE_KEY = 'asura-legion-data';
const ADMIN_PASSWORD = 'asura2025';

// Initialize with default data
const defaultData: AppData = {
  teamMembers: [
    {
      id: '1',
      name: 'Mr. Black Rat',
      nickname: 'Black Rat',
      role: 'Founder / Exploit Dev',
      city: 'Nashik',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
    },
    {
      id: '2',
      name: 'Specter',
      nickname: 'Specter',
      role: 'Network Engineer',
      city: 'Pune',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    {
      id: '3',
      name: 'Neon',
      nickname: 'Neon',
      role: 'UI/UX & Recon',
      city: 'Mumbai',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
    },
    {
      id: '4',
      name: 'Cypher',
      nickname: 'Cypher',
      role: 'AI & Python Dev',
      city: 'Nagpur',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'SQLi Scanner Pro',
      description: 'Advanced SQL injection detection and exploitation framework',
      githubUrl: 'https://github.com/team-asura-legion/sqli-scanner',
      tags: ['Python', 'Security', 'Web'],
    },
    {
      id: '2',
      name: 'NetSweep',
      description: 'Network reconnaissance and vulnerability assessment tool',
      githubUrl: 'https://github.com/team-asura-legion/netsweep',
      tags: ['Go', 'Networking', 'Recon'],
    },
    {
      id: '3',
      name: 'CryptoBreaker',
      description: 'Cryptographic hash analysis and cracking toolkit',
      githubUrl: 'https://github.com/team-asura-legion/cryptobreaker',
      tags: ['C++', 'Cryptography'],
    },
  ],
};

export const initStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return defaultData;
  }
  return JSON.parse(stored) as AppData;
};

export const getData = (): AppData => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultData;
};

export const saveData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const exportData = (): string => {
  return JSON.stringify(getData(), null, 2);
};

export const importData = (jsonString: string): boolean => {
  try {
    const data = JSON.parse(jsonString);
    saveData(data);
    return true;
  } catch {
    return false;
  }
};

export const verifyPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD;
};

export const addTeamMember = (member: Omit<TeamMember, 'id'>) => {
  const data = getData();
  const newMember: TeamMember = {
    ...member,
    id: Date.now().toString(),
  };
  data.teamMembers.push(newMember);
  saveData(data);
  return newMember;
};

export const updateTeamMember = (id: string, member: Partial<TeamMember>) => {
  const data = getData();
  const index = data.teamMembers.findIndex((m) => m.id === id);
  if (index !== -1) {
    data.teamMembers[index] = { ...data.teamMembers[index], ...member };
    saveData(data);
    return true;
  }
  return false;
};

export const deleteTeamMember = (id: string) => {
  const data = getData();
  data.teamMembers = data.teamMembers.filter((m) => m.id !== id);
  saveData(data);
};

export const addProject = (project: Omit<Project, 'id'>) => {
  const data = getData();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
  };
  data.projects.push(newProject);
  saveData(data);
  return newProject;
};

export const updateProject = (id: string, project: Partial<Project>) => {
  const data = getData();
  const index = data.projects.findIndex((p) => p.id === id);
  if (index !== -1) {
    data.projects[index] = { ...data.projects[index], ...project };
    saveData(data);
    return true;
  }
  return false;
};

export const deleteProject = (id: string) => {
  const data = getData();
  data.projects = data.projects.filter((p) => p.id !== id);
  saveData(data);
};
