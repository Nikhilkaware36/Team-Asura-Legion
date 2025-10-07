import { MatrixBackground } from '@/components/MatrixBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useEffect, useState } from 'react';
import { getData } from '@/lib/storage';
import { TeamMember } from '@/types';
import { Github, Linkedin, Twitter, MapPin, User } from 'lucide-react';

const Team = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const data = getData();
    setMembers(data.teamMembers);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      <MatrixBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-orbitron font-bold text-primary text-glow-green mb-4">
              OUR ELITE TEAM
            </h1>
            <p className="text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
              Meet the cybersecurity experts behind Team Asura Legion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="glass-cyber p-6 rounded-xl border border-primary/30 hover:border-primary/60 transition-all hover:glow-green group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    {member.avatar ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-32 h-32 rounded-full border-4 border-primary/50 group-hover:border-primary object-cover transition-all"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full border-4 border-primary/50 group-hover:border-primary bg-muted flex items-center justify-center transition-all">
                        <User className="w-16 h-16 text-primary" />
                      </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-mono">
                      {member.nickname}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-orbitron font-bold text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-secondary font-mono font-medium mt-1">{member.role}</p>
                    <div className="flex items-center justify-center space-x-2 mt-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span className="font-mono text-sm">{member.city}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 pt-2">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-secondary transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        href={member.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
