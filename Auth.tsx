import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Loader2, GraduationCap, Mail, Lock, User, ArrowLeft } from "lucide-react";
import sigeaLogo from "@/assets/sigea-logo.png";

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    role: "student",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  useEffect(() => {
    if (user) {
      const roleRoutes = {
        admin: '/admin',
        teacher: '/teacher',
        student: '/student',
        kitchen: '/kitchen',
        library: '/library'
      };
      
      const from = location.state?.from?.pathname;
      const targetRoute = from || roleRoutes[user.role as keyof typeof roleRoutes] || '/';
      
      navigate(targetRoute, { replace: true });
    }
  }, [user, navigate, location]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(signInData.email, signInData.password);

    if (error) {
      let errorMessage = error.message;
      
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Email ou senha incorretos. Verifique seus dados e tente novamente.';
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = 'Por favor, confirme seu email antes de fazer login.';
      }
      
      toast({
        title: "Erro ao fazer login",
        description: errorMessage,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signUpData.password !== signUpData.confirmPassword) {
      toast({
        title: "Erro no cadastro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (signUpData.password.length < 6) {
      toast({
        title: "Erro no cadastro",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await signUp(signUpData.email, signUpData.password, {
      full_name: signUpData.full_name,
      role: signUpData.role
    });

    if (error) {
      if (error.message.includes("already registered")) {
        toast({
          title: "Email já cadastrado",
          description: "Este email já está registrado. Faça login ou use outro email.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive",
        });
      }
      setLoading(false);
    } else {
      toast({
        title: "Cadastro realizado!",
        description: "Bem-vindo ao SIGEA! Redirecionando...",
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      toast({
        title: "Email enviado!",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      });
      setShowForgotPassword(false);
      setForgotEmail("");
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Não foi possível enviar o email. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-slide-in">
        <Card className="w-full max-w-md glass border-primary/20 shadow-neon">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="logo-container">
                <img src={sigeaLogo} alt="SIGEA Logo" className="w-24 h-24 object-contain logo-professional" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl bg-gradient-hero bg-clip-text text-transparent">
                Esqueceu sua senha?
              </CardTitle>
              <CardDescription>
                Digite seu email para receber instruções de recuperação
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="seu@email.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="pl-10 smooth-transition"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:shadow-neon smooth-transition"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  "Enviar Email de Recuperação"
                )}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={() => setShowForgotPassword(false)}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4 animate-slide-in">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <Card className="w-full max-w-md glass border-primary/30 hover-glow relative z-10 smooth-transition">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <div className="logo-container">
              <img src={sigeaLogo} alt="SIGEA Logo" className="w-32 h-32 object-contain logo-professional" />
            </div>
          </div>
          <div>
            <CardTitle className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              SIGEA
            </CardTitle>
            <CardDescription className="mt-2 text-base">Gestão Escolar & Culinária</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 p-1 bg-muted/50">
              <TabsTrigger value="signin" className="smooth-transition data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="signup" className="smooth-transition data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                Cadastrar
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-6">
              <form onSubmit={handleSignIn} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="signin-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={signInData.email}
                      onChange={(e) =>
                        setSignInData({ ...signInData, email: e.target.value })
                      }
                      className="pl-10 smooth-transition focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password" className="text-sm font-medium">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signin-password"
                      type="password"
                      placeholder="••••••••"
                      value={signInData.password}
                      onChange={(e) =>
                        setSignInData({ ...signInData, password: e.target.value })
                      }
                      className="pl-10 smooth-transition focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="link"
                  className="text-sm text-primary hover:text-primary/80 p-0 h-auto"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Esqueceu sua senha?
                </Button>

                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-neon smooth-transition hover-lift text-primary-foreground font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Entrar no Sistema
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-6">
              <form onSubmit={handleSignUp} className="space-y-5">
                <Alert className="border-primary/30 bg-primary/5">
                  <AlertDescription className="text-sm">
                    Escolha o tipo de conta que você precisa. Após o cadastro, você será redirecionado para a área correspondente.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm font-medium">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Seu nome completo"
                      value={signUpData.full_name}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, full_name: e.target.value })
                      }
                      className="pl-10 smooth-transition focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={signUpData.email}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, email: e.target.value })
                      }
                      className="pl-10 smooth-transition focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-role" className="text-sm font-medium">Tipo de Conta</Label>
                  <select
                    id="signup-role"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background smooth-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:border-primary"
                    value={signUpData.role}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, role: e.target.value })
                    }
                    required
                  >
                    <option value="student">🎓 Estudante</option>
                    <option value="teacher">👨‍🏫 Professor</option>
                    <option value="admin">⚙️ Administrador</option>
                    <option value="kitchen">🍳 Cozinha</option>
                    <option value="library">📚 Biblioteca</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm font-medium">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="Mínimo 6 caracteres"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, password: e.target.value })
                      }
                      className="pl-10 smooth-transition focus:border-primary focus:ring-primary"
                      required
                      minLength={6}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm" className="text-sm font-medium">Confirmar Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-confirm"
                      type="password"
                      placeholder="Digite a senha novamente"
                      value={signUpData.confirmPassword}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, confirmPassword: e.target.value })
                      }
                      className="pl-10 smooth-transition focus:border-primary focus:ring-primary"
                      required
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-accent hover:shadow-neon smooth-transition hover-lift text-accent-foreground font-semibold"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Cadastrando...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="mr-2 h-5 w-5" />
                      Criar Conta
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate('/')}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
