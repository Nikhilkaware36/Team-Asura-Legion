import { MatrixBackground } from '@/components/MatrixBackground';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Shield, ArrowDown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-cyber-dark relative overflow-hidden">
      <MatrixBackground />
      <Navigation />

      <main className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-cyber border border-primary/50 glow-green animate-glow-pulse">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-mono text-primary">Elite Cybersecurity Unit</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold text-primary text-glow-green leading-tight">
              ⚡ TEAM ASURA LEGION ⚡
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl font-rajdhani text-secondary max-w-3xl text-glow-cyan">
              Elite Indian CTF & Cybersecurity Unit
            </p>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl font-mono">
              Founded by <span className="text-accent font-bold">Mr. Black Rat</span>, we are a team of elite security researchers specializing in exploit development, network penetration, and advanced CTF competitions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <Link to="/projects">
                <Button className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-6 text-lg font-orbitron glow-green transition-all hover:scale-105">
                  <Shield className="w-5 h-5 mr-2" />
                  View Projects
                </Button>
              </Link>

              <Link to="/team">
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-lg font-orbitron glow-cyan transition-all hover:scale-105">
                  Meet The Team
                </Button>
              </Link>
            </div>

            <div className="pt-12 animate-float">
              <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">
            <div className="glass-cyber p-8 rounded-xl border border-primary/30 hover:border-primary/60 transition-all hover:glow-green group">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-orbitron font-bold text-primary mb-3 group-hover:text-glow-green">
                Exploit Development
              </h3>
              <p className="text-muted-foreground font-mono">
                Advanced binary exploitation, reverse engineering, and vulnerability research
              </p>
            </div>

            <div className="glass-cyber p-8 rounded-xl border border-secondary/30 hover:border-secondary/60 transition-all hover:glow-cyan group">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-2xl font-orbitron font-bold text-secondary mb-3 group-hover:text-glow-cyan">
                Network Security
              </h3>
              <p className="text-muted-foreground font-mono">
                Penetration testing, network forensics, and infrastructure security
              </p>
            </div>

            <div className="glass-cyber p-8 rounded-xl border border-accent/30 hover:border-accent/60 transition-all hover:glow-purple group">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-orbitron font-bold text-accent mb-3 group-hover:text-glow-purple">
                CTF Champions
              </h3>
              <p className="text-muted-foreground font-mono">
                Competitive hacking, capture the flag competitions, and security challenges
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
