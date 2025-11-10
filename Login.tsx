import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, GraduationCap, BookOpen, ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import sigeaLogo from "@/assets/sigea-logo.png";

const Login = () => {
  const navigate = useNavigate();

  const goToAuth = () => navigate('/auth');

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="w-full max-w-md space-y-8 relative z-10">
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8 animate-float">
            <div className="logo-container">
              <img 
                src={sigeaLogo} 
                alt="SIGEA" 
                className="w-40 h-40 object-contain logo-professional"
              />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent tracking-tight">SIGEA</h1>
            <p className="text-lg text-muted-foreground font-medium">Sistema Integrado de Gestão Educacional e Alimentar</p>
          </div>
        </div>

        <Card className="glass border-border/50 backdrop-blur-xl shadow-strong hover-lift">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl">Acesso ao Sistema</CardTitle>
            <CardDescription className="text-base">Selecione seu perfil para continuar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={goToAuth} 
              className="w-full h-16 bg-gradient-primary hover:shadow-neon smooth-transition text-lg font-medium group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-100 smooth-transition"></div>
              <UserCog className="w-6 h-6 mr-3 relative z-10" />
              <div className="text-left flex-1 relative z-10">
                <div className="font-bold">Administrador</div>
                <div className="text-xs opacity-90">Gestão completa do sistema</div>
              </div>
            </Button>
            
            <Button 
              onClick={goToAuth} 
              variant="outline"
              className="w-full h-16 border-accent/50 hover:bg-accent/10 hover:border-accent hover:shadow-neon-secondary smooth-transition text-lg font-medium group"
            >
              <BookOpen className="w-6 h-6 mr-3 text-accent group-hover:scale-110 smooth-transition" />
              <div className="text-left flex-1">
                <div className="font-bold">Professor</div>
                <div className="text-xs opacity-80">Portal educacional</div>
              </div>
            </Button>
            
            <Button 
              onClick={goToAuth} 
              variant="outline"
              className="w-full h-16 border-secondary/50 hover:bg-secondary/10 hover:border-secondary hover:shadow-neon smooth-transition text-lg font-medium group"
            >
              <GraduationCap className="w-6 h-6 mr-3 text-secondary group-hover:scale-110 smooth-transition" />
              <div className="text-left flex-1">
                <div className="font-bold">Estudante</div>
                <div className="text-xs opacity-80">Portal do aluno</div>
              </div>
            </Button>

            <Button 
              onClick={goToAuth} 
              variant="outline"
              className="w-full h-16 border-[hsl(var(--orange))]/50 hover:bg-[hsl(var(--orange))]/10 hover:border-[hsl(var(--orange))] hover:shadow-neon-accent smooth-transition text-lg font-medium group"
            >
              <ChefHat className="w-6 h-6 mr-3 text-[hsl(var(--orange))] group-hover:scale-110 smooth-transition" />
              <div className="text-left flex-1">
                <div className="font-bold">Cozinha</div>
                <div className="text-xs opacity-80">Gestão do cardápio</div>
              </div>
            </Button>

            <div className="text-center pt-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full backdrop-blur-sm">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </div>
                <p className="text-sm text-foreground font-medium">
                  Sistema Online - Clique para acessar
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;