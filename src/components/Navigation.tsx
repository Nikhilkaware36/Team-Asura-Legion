import { Link, useLocation } from 'react-router-dom';
import { Shield, Users, FolderGit2, Lock } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-cyber border-b border-primary/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <Shield className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
            <span className="font-orbitron font-bold text-xl text-primary group-hover:text-secondary transition-colors text-glow-green">
              ASURA LEGION
            </span>
          </Link>

          <div className="flex items-center space-x-1 md:space-x-2">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/')
                  ? 'bg-primary/20 text-primary glow-green'
                  : 'text-foreground hover:bg-muted hover:text-primary'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span className="hidden md:inline font-medium">Home</span>
            </Link>

            <Link
              to="/team"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/team')
                  ? 'bg-secondary/20 text-secondary glow-cyan'
                  : 'text-foreground hover:bg-muted hover:text-secondary'
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="hidden md:inline font-medium">Team</span>
            </Link>

            <Link
              to="/projects"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/projects')
                  ? 'bg-accent/20 text-accent glow-purple'
                  : 'text-foreground hover:bg-muted hover:text-accent'
              }`}
            >
              <FolderGit2 className="w-4 h-4" />
              <span className="hidden md:inline font-medium">Projects</span>
            </Link>

            <Link
              to="/admin"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/admin')
                  ? 'bg-destructive/20 text-destructive'
                  : 'text-muted-foreground hover:bg-muted hover:text-destructive'
              }`}
            >
              <Lock className="w-4 h-4" />
              <span className="hidden md:inline font-medium">Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
