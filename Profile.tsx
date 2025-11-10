import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, User, Mail, Phone, Lock, Shield, Loader2 } from "lucide-react";
import Header from "@/components/Header";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || "");
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    phone: "",
    class: user?.class || "",
    subject: user?.subject || ""
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [emailData, setEmailData] = useState({
    newEmail: "",
    password: ""
  });

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Math.random()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast({
        title: "Avatar atualizado!",
        description: "Sua foto de perfil foi atualizada com sucesso."
      });
    } catch (error: any) {
      toast({
        title: "Erro ao fazer upload",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          phone: formData.phone,
          class: formData.class,
          subject: formData.subject
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso."
      });
      
      // Recarregar a página para atualizar os dados
      setTimeout(() => window.location.reload(), 1000);
    } catch (error: any) {
      toast({
        title: "Erro ao atualizar",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter no mínimo 6 caracteres.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast({
        title: "Senha alterada!",
        description: "Sua senha foi atualizada com sucesso."
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error: any) {
      toast({
        title: "Erro ao alterar senha",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailData.newEmail || !emailData.password) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: emailData.newEmail
      });

      if (error) throw error;

      toast({
        title: "Email atualizado!",
        description: "Verifique seu novo email para confirmar a alteração."
      });
      setEmailData({ newEmail: "", password: "" });
    } catch (error: any) {
      toast({
        title: "Erro ao alterar email",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background animate-slide-in">
      <Header />
      <main className="container mx-auto p-6 space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Meu Perfil
          </h1>
          <p className="text-muted-foreground">Gerencie suas informações e configurações de conta</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="security" className="gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
            <TabsTrigger value="account" className="gap-2">
              <Mail className="h-4 w-4" />
              Conta
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="glass border-primary/20 hover-glow md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Foto de Perfil
                  </CardTitle>
                  <CardDescription>Clique para alterar sua foto</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="w-32 h-32 border-4 border-primary/20 hover-lift">
                    <AvatarImage src={avatarUrl} />
                    <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl">
                      {user.full_name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <Label htmlFor="avatar-upload" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-neon smooth-transition hover-lift">
                      {uploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Upload className="h-4 w-4" />
                      )}
                      {uploading ? "Enviando..." : "Alterar Foto"}
                    </div>
                    <Input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                    />
                  </Label>

                  <div className="text-center space-y-3 pt-4 border-t w-full">
                    <div className="flex items-center justify-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="px-3 py-1 bg-gradient-accent text-accent-foreground rounded-full text-xs font-semibold capitalize">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-primary/20 hover-glow md:col-span-2">
                <CardHeader>
                  <CardTitle>Informações Pessoais</CardTitle>
                  <CardDescription>Atualize seus dados cadastrais</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="full_name">Nome Completo</Label>
                        <Input
                          id="full_name"
                          value={formData.full_name}
                          onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                          placeholder="Seu nome completo"
                          className="smooth-transition"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          <Phone className="h-4 w-4 inline mr-2" />
                          Telefone
                        </Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="(00) 00000-0000"
                          className="smooth-transition"
                        />
                      </div>

                      {user.role === 'student' && (
                        <div className="space-y-2">
                          <Label htmlFor="class">Turma</Label>
                          <Input
                            id="class"
                            value={formData.class}
                            onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                            placeholder="Ex: 3º Ano A"
                            className="smooth-transition"
                          />
                        </div>
                      )}

                      {user.role === 'teacher' && (
                        <div className="space-y-2">
                          <Label htmlFor="subject">Disciplina</Label>
                          <Input
                            id="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="Ex: Matemática"
                            className="smooth-transition"
                          />
                        </div>
                      )}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-primary hover:shadow-neon smooth-transition hover-lift"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        "Salvar Alterações"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="glass border-primary/20 hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Alterar Senha
                </CardTitle>
                <CardDescription>Mantenha sua conta segura com uma senha forte</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Mínimo 6 caracteres"
                      className="smooth-transition"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Digite a senha novamente"
                      className="smooth-transition"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-neon smooth-transition hover-lift"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Alterando...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Alterar Senha
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="glass border-primary/20 hover-glow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Alterar Email
                </CardTitle>
                <CardDescription>Atualize seu endereço de email principal</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangeEmail} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentEmail">Email Atual</Label>
                    <Input
                      id="currentEmail"
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-muted"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newEmail">Novo Email</Label>
                    <Input
                      id="newEmail"
                      type="email"
                      value={emailData.newEmail}
                      onChange={(e) => setEmailData({ ...emailData, newEmail: e.target.value })}
                      placeholder="novo@email.com"
                      className="smooth-transition"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-primary hover:shadow-neon smooth-transition hover-lift"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Atualizando...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Atualizar Email
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Profile;