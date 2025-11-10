import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import sigeaLogo from "@/assets/sigea-logo.png";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="glass border-b border-border/30 backdrop-blur-xl sticky top-0 z-50 smooth-transition shadow-medium">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer group smooth-transition" onClick={() => navigate('/')}>
            <div className="logo-container">
              <img src={sigeaLogo} alt="SIGEA Logo" className="w-14 h-14 object-contain logo-professional" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent tracking-tight group-hover:scale-105 smooth-transition">SIGEA</h1>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">Gestão Escolar & Alimentar</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </div>
                <span className="text-xs text-accent font-semibold">Sistema Online</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="premium"
              size="sm"
              onClick={() => navigate('/sigea-assistant')}
              className="hidden md:flex items-center gap-2"
            >
              <Bot className="w-4 h-4" />
              <span>Assistente IA</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 hover:bg-accent/10 rounded-full border border-transparent hover:border-accent/30"
            >
              <Avatar className="h-9 w-9 border-2 border-primary/30 shadow-soft">
                <AvatarImage src={user?.avatar_url} />
                <AvatarFallback className="bg-gradient-secondary text-primary font-bold">
                  {user?.full_name.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold">{user?.full_name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
            </Button>
            <ThemeToggle />
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground hover:shadow-medium"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;