import { MatrixBackground } from '@/components/MatrixBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { getData } from '@/lib/storage';
import { Project } from '@/types';
import { Github, ExternalLink, FolderGit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const data = getData();
    setProjects(data.projects);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      <MatrixBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-primary text-glow-green mb-4">
              OUR PROJECTS
            </h1>
            <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
              Open-source security tools and frameworks developed by Team Asura Legion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="glass-cyber p-6 rounded-xl border border-primary/30 hover:border-primary/60 transition-all hover:glow-green group flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-1">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-48 object-cover rounded-lg mb-4 border border-primary/30"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted rounded-lg mb-4 flex items-center justify-center border border-primary/30">
                      <FolderGit2 className="w-16 h-16 text-primary" />
                    </div>
                  )}

                  <h3 className="text-2xl font-orbitron font-bold text-foreground group-hover:text-primary transition-colors mb-3">
                    {project.name}
                  </h3>

                  <p className="text-muted-foreground font-mono text-sm mb-4">
                    {project.description}
                  </p>

                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary/20 text-primary text-xs font-mono rounded border border-primary/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-orbitron glow-green transition-all">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center text-muted-foreground font-mono py-20">
              <FolderGit2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No projects available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Projects;
