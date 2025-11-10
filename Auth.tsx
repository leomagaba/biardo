
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth, User } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Mail, Lock, User as UserIcon, ArrowLeft, Shield } from "lucide-react";
import sigeaLogo from "@/assets/sigea-logo.png";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("signin");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [signUpData, setSignUpData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    full_name: string;
    role: User['role'];
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    role: "student",
  });
  const [forgotEmail, setForgotEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    if (location.state?.role) {
      setSignUpData(prev => ({ ...prev, role: location.state.role }));
    }
  }, [location.state]);

  useEffect(() => {
    // Lida com o retorno do link de redefinição de senha
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsPasswordRecovery(true);
        toast({
          title: "Redefina sua senha",
          description: "Você agora pode definir uma nova senha para sua conta.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(signInData.email, signInData.password);
    
    if (error) {
      let errorMessage = error.message;
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Email ou senha inválidos. Por favor, verifique e tente novamente.";
      }
      toast({
        title: "Erro ao entrar",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setLoading(false);
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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signUpData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de e-mail válido.",
        variant: "destructive",
      });
      return;
    }
    if (signUpData.password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    const { error } = await signUp(signUpData.email, signUpData.password, signUpData.full_name, signUpData.role);
    if (error) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso. Agora você já pode fazer o login.",
      });
      setActiveTab("signin");
    }
    setLoading(false);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
      redirectTo: `${window.location.origin}/auth`,
    });
    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Verifique seu e-mail",
        description: "Um link para redefinir sua senha foi enviado.",
      });
      setShowForgotPassword(false);
    }
    setLoading(false);
  };

  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }
    if (newPassword.length < 6) {
      toast({ title: "Erro", description: "A nova senha deve ter no mínimo 6 caracteres.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      toast({ title: "Erro ao redefinir senha", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Senha redefinida!", description: "Sua senha foi alterada com sucesso. Você já pode fazer login." });
      setIsPasswordRecovery(false);
      setNewPassword("");
      setConfirmNewPassword("");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-mesh flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-3xl"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <Card className="w-full max-w-md space-y-4 relative z-10 glass border-border/50 backdrop-blur-xl shadow-strong hover-lift">
        <Button variant="ghost" size="sm" className="absolute top-4 left-4" onClick={() => navigate('/login')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>
        <CardHeader className="text-center pt-16">
          <div className="flex justify-center mb-4">
            <img src={sigeaLogo} alt="SIGEA" className="w-24 h-24 object-contain" />
          </div>
          <CardTitle className="text-2xl">
            {isPasswordRecovery ? "Crie uma Nova Senha" : showForgotPassword ? "Recuperar Senha" : "Acessar Conta"}
          </CardTitle>
          <CardDescription>
            {isPasswordRecovery ? "Digite sua nova senha abaixo." : showForgotPassword ? "Insira seu e-mail para receber o link de recuperação." : "Entre ou crie uma nova conta para acessar o SIGEA."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isPasswordRecovery ? (
            <form onSubmit={handlePasswordRecovery} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">Nova Senha</Label>
                <Input id="new-password" type="password" placeholder="Mínimo 6 caracteres" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-new-password">Confirmar Nova Senha</Label>
                <Input id="confirm-new-password" type="password" placeholder="Repita a nova senha" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:shadow-neon" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
                Salvar Nova Senha
              </Button>
            </form>
          ) : showForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email">Email</Label>
                <Input id="forgot-email" type="email" placeholder="seu@email.com" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full bg-gradient-primary hover:shadow-neon" disabled={loading}>
                {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Mail className="mr-2 h-4 w-4" />}
                Enviar Link
              </Button>
              <Button variant="link" className="w-full" onClick={() => setShowForgotPassword(false)}>Voltar para o login</Button>
            </form>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Entrar</TabsTrigger>
                <TabsTrigger value="signup">Cadastrar</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <form onSubmit={handleSignIn} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seu@email.com" value={signInData.email} onChange={(e) => setSignInData({ ...signInData, email: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" placeholder="********" value={signInData.password} onChange={(e) => setSignInData({ ...signInData, password: e.target.value })} required />
                  </div>
                  <Button type="submit" className="w-full bg-gradient-primary hover:shadow-neon" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Entrar
                  </Button>
                  <Button variant="link" size="sm" className="w-full" onClick={() => setShowForgotPassword(true)}>
                    Esqueceu sua senha?
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Nome Completo</Label>
                    <Input id="signup-name" placeholder="Seu Nome Completo" value={signUpData.full_name} onChange={(e) => setSignUpData({ ...signUpData, full_name: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input id="signup-email" type="email" placeholder="seu@email.com" value={signUpData.email} onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Senha</Label>
                    <Input id="signup-password" type="password" placeholder="Mínimo 6 caracteres" value={signUpData.password} onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password">Confirmar Senha</Label>
                    <Input id="signup-confirm-password" type="password" placeholder="Repita a senha" value={signUpData.confirmPassword} onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-role">Tipo de Conta</Label>
                    <Select 
                      value={signUpData.role} 
                      onValueChange={(value: User['role']) => setSignUpData({ ...signUpData, role: value })}
                      disabled={!!location.state?.role}
                    >
                      <SelectTrigger id="signup-role">
                        <SelectValue placeholder="Selecione o seu perfil" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Estudante</SelectItem>
                        <SelectItem value="teacher">Professor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button type="submit" className="w-full bg-gradient-accent hover:shadow-neon-secondary" disabled={loading}>
                    {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Criar Conta
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;