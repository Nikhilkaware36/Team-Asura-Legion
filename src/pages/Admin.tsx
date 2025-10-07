import { useState, useEffect } from 'react';
import { MatrixBackground } from '@/components/MatrixBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  verifyPassword,
  getData,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  addProject,
  updateProject,
  deleteProject,
  exportData,
  importData,
} from '@/lib/storage';
import { TeamMember, Project } from '@/types';
import { Lock, Users, FolderGit2, Download, Upload, Trash2, Edit, Plus, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = () => {
    const data = getData();
    setMembers(data.teamMembers);
    setProjects(data.projects);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword(password)) {
      setIsAuthenticated(true);
      toast({
        title: 'Access Granted',
        description: 'Welcome to the admin panel',
      });
    } else {
      toast({
        title: 'Access Denied',
        description: 'Invalid password',
        variant: 'destructive',
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'member' | 'project') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      if (type === 'member' && editingMember) {
        setEditingMember({ ...editingMember, avatar: base64 });
      } else if (type === 'project' && editingProject) {
        setEditingProject({ ...editingProject, image: base64 });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveMember = () => {
    if (!editingMember) return;

    if (editingMember.id) {
      updateTeamMember(editingMember.id, editingMember);
      toast({ title: 'Member updated successfully' });
    } else {
      addTeamMember(editingMember);
      toast({ title: 'Member added successfully' });
    }

    setEditingMember(null);
    loadData();
  };

  const handleDeleteMember = (id: string) => {
    deleteTeamMember(id);
    toast({ title: 'Member deleted successfully' });
    loadData();
  };

  const handleSaveProject = () => {
    if (!editingProject) return;

    if (editingProject.id) {
      updateProject(editingProject.id, editingProject);
      toast({ title: 'Project updated successfully' });
    } else {
      addProject(editingProject);
      toast({ title: 'Project added successfully' });
    }

    setEditingProject(null);
    loadData();
  };

  const handleDeleteProject = (id: string) => {
    deleteProject(id);
    toast({ title: 'Project deleted successfully' });
    loadData();
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'asura-legion-data.json';
    a.click();
    toast({ title: 'Data exported successfully' });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (importData(content)) {
        loadData();
        toast({ title: 'Data imported successfully' });
      } else {
        toast({ title: 'Import failed', description: 'Invalid JSON format', variant: 'destructive' });
      }
    };
    reader.readAsText(file);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-cyber-dark relative overflow-hidden flex items-center justify-center">
        <MatrixBackground />
        <Navigation />

        <Card className="w-full max-w-md mx-4 glass-cyber border-primary/30">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-orbitron text-center text-primary">
              ADMIN ACCESS
            </CardTitle>
            <CardDescription className="text-center font-mono">
              Enter password to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password" className="font-mono">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 bg-input border-primary/30 font-mono"
                  placeholder="Enter admin password"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/80 font-orbitron glow-green">
                <Lock className="w-4 h-4 mr-2" />
                ACCESS PANEL
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      <MatrixBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-primary text-glow-green mb-4">
              ADMIN DASHBOARD
            </h1>
            <p className="text-muted-foreground font-mono">Manage team members and projects</p>
          </div>

          <div className="flex justify-center gap-4 mb-8">
            <Button onClick={handleExport} variant="outline" className="border-primary text-primary font-mono">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <label>
              <Button variant="outline" className="border-secondary text-secondary font-mono" asChild>
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </span>
              </Button>
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>
          </div>

          <Tabs defaultValue="members" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 glass-cyber">
              <TabsTrigger value="members" className="font-orbitron data-[state=active]:bg-primary/20 data-[state=active]:text-primary">
                <Users className="w-4 h-4 mr-2" />
                Team Members
              </TabsTrigger>
              <TabsTrigger value="projects" className="font-orbitron data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary">
                <FolderGit2 className="w-4 h-4 mr-2" />
                Projects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="members" className="space-y-6">
              <Card className="glass-cyber border-primary/30">
                <CardHeader>
                  <CardTitle className="font-orbitron text-primary">
                    {editingMember?.id ? 'Edit Member' : 'Add New Member'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="font-mono">Name</Label>
                      <Input
                        value={editingMember?.name || ''}
                        onChange={(e) => setEditingMember({ ...editingMember!, name: e.target.value })}
                        className="bg-input border-primary/30 font-mono"
                        placeholder="Full name"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">Nickname</Label>
                      <Input
                        value={editingMember?.nickname || ''}
                        onChange={(e) => setEditingMember({ ...editingMember!, nickname: e.target.value })}
                        className="bg-input border-primary/30 font-mono"
                        placeholder="Hacker alias"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">Role</Label>
                      <Input
                        value={editingMember?.role || ''}
                        onChange={(e) => setEditingMember({ ...editingMember!, role: e.target.value })}
                        className="bg-input border-primary/30 font-mono"
                        placeholder="e.g., Exploit Dev"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">City</Label>
                      <Input
                        value={editingMember?.city || ''}
                        onChange={(e) => setEditingMember({ ...editingMember!, city: e.target.value })}
                        className="bg-input border-primary/30 font-mono"
                        placeholder="Location"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">GitHub URL</Label>
                      <Input
                        value={editingMember?.github || ''}
                        onChange={(e) => setEditingMember({ ...editingMember!, github: e.target.value })}
                        className="bg-input border-primary/30 font-mono"
                        placeholder="https://github.com/username"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">LinkedIn URL</Label>
                      <Input
                        value={editingMember?.linkedin || ''}
                        onChange={(e) => setEditingMember({ ...editingMember!, linkedin: e.target.value })}
                        className="bg-input border-primary/30 font-mono"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">Twitter/X URL</Label>
                      <Input
                        value={editingMember?.twitter || ''}
                        onChange={(e) => setEditingMember({ ...editingMember!, twitter: e.target.value })}
                        className="bg-input border-primary/30 font-mono"
                        placeholder="https://twitter.com/username"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">Avatar Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'member')}
                        className="bg-input border-primary/30 font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveMember} className="bg-primary hover:bg-primary/80 font-orbitron">
                      <Save className="w-4 h-4 mr-2" />
                      Save Member
                    </Button>
                    {editingMember && (
                      <Button onClick={() => setEditingMember(null)} variant="outline" className="font-mono">
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-orbitron text-primary">Current Members</h3>
                  <Button
                    onClick={() =>
                      setEditingMember({ id: '', name: '', nickname: '', role: '', city: '' })
                    }
                    className="bg-primary hover:bg-primary/80 font-orbitron"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                  </Button>
                </div>
                {members.map((member) => (
                  <Card key={member.id} className="glass-cyber border-primary/30">
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center space-x-4">
                        {member.avatar && (
                          <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full" />
                        )}
                        <div>
                          <p className="font-orbitron font-bold text-foreground">{member.name}</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            {member.role} • {member.city}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingMember(member)}
                          variant="outline"
                          size="sm"
                          className="border-secondary text-secondary font-mono"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteMember(member.id)}
                          variant="outline"
                          size="sm"
                          className="border-destructive text-destructive font-mono"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <Card className="glass-cyber border-secondary/30">
                <CardHeader>
                  <CardTitle className="font-orbitron text-secondary">
                    {editingProject?.id ? 'Edit Project' : 'Add New Project'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label className="font-mono">Project Name</Label>
                      <Input
                        value={editingProject?.name || ''}
                        onChange={(e) => setEditingProject({ ...editingProject!, name: e.target.value })}
                        className="bg-input border-secondary/30 font-mono"
                        placeholder="Tool or framework name"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">Description</Label>
                      <Textarea
                        value={editingProject?.description || ''}
                        onChange={(e) => setEditingProject({ ...editingProject!, description: e.target.value })}
                        className="bg-input border-secondary/30 font-mono"
                        placeholder="Brief description"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label className="font-mono">GitHub URL</Label>
                      <Input
                        value={editingProject?.githubUrl || ''}
                        onChange={(e) => setEditingProject({ ...editingProject!, githubUrl: e.target.value })}
                        className="bg-input border-secondary/30 font-mono"
                        placeholder="https://github.com/team/repo"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">Tags (comma-separated)</Label>
                      <Input
                        value={editingProject?.tags?.join(', ') || ''}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject!,
                            tags: e.target.value.split(',').map((t) => t.trim()),
                          })
                        }
                        className="bg-input border-secondary/30 font-mono"
                        placeholder="Python, Security, Web"
                      />
                    </div>
                    <div>
                      <Label className="font-mono">Project Image</Label>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, 'project')}
                        className="bg-input border-secondary/30 font-mono"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProject} className="bg-secondary hover:bg-secondary/80 font-orbitron">
                      <Save className="w-4 h-4 mr-2" />
                      Save Project
                    </Button>
                    {editingProject && (
                      <Button onClick={() => setEditingProject(null)} variant="outline" className="font-mono">
                        Cancel
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-orbitron text-secondary">Current Projects</h3>
                  <Button
                    onClick={() =>
                      setEditingProject({ id: '', name: '', description: '', githubUrl: '', tags: [] })
                    }
                    className="bg-secondary hover:bg-secondary/80 font-orbitron"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                  </Button>
                </div>
                {projects.map((project) => (
                  <Card key={project.id} className="glass-cyber border-secondary/30">
                    <CardContent className="flex items-center justify-between p-4">
                      <div>
                        <p className="font-orbitron font-bold text-foreground">{project.name}</p>
                        <p className="text-sm text-muted-foreground font-mono">{project.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setEditingProject(project)}
                          variant="outline"
                          size="sm"
                          className="border-secondary text-secondary font-mono"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteProject(project.id)}
                          variant="outline"
                          size="sm"
                          className="border-destructive text-destructive font-mono"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
