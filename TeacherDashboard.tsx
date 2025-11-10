import { useState } from "react";
import Header from "@/components/Header";
import MetricsCard from "@/components/Dashboard/MetricsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { 
  Users, 
  BookOpen, 
  Award,
  Calendar,
  MessageSquare,
  PlusCircle,
  FileText,
  Clock,
  TrendingUp,
  CheckCircle2
} from "lucide-react";

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useAuth();

  const students = [
    { id: 1, name: "Ana Silva", grade: 8.5, attendance: 95, avatar: "AS" },
    { id: 2, name: "Carlos Santos", grade: 7.2, attendance: 88, avatar: "CS" },
    { id: 3, name: "Maria Oliveira", grade: 9.1, attendance: 97, avatar: "MO" },
    { id: 4, name: "João Pedro", grade: 6.8, attendance: 82, avatar: "JP" },
    { id: 5, name: "Laura Costa", grade: 8.9, attendance: 93, avatar: "LC" },
  ];

  const assignments = [
    { id: 1, title: "Equações do 2º Grau", dueDate: "2024-03-15", submitted: 18, total: 25 },
    { id: 2, title: "Funções Logarítmicas", dueDate: "2024-03-20", submitted: 22, total: 25 },
    { id: 3, title: "Geometria Analítica", dueDate: "2024-03-25", submitted: 15, total: 25 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Olá, {user?.full_name}! 👋
          </h2>
          <p className="text-muted-foreground">
            {user?.subject} - Turma {user?.class}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/80 glass">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Alunos
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Atividades
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Horários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <MetricsCard
                title="Total de Alunos"
                value="25"
                description="Sua turma"
                icon={Users}
                color="primary"
                trend={{ value: 0, isPositive: true }}
              />
              <MetricsCard
                title="Média da Turma"
                value="8.1"
                description="Desempenho geral"
                icon={Award}
                color="secondary"
                trend={{ value: 5.2, isPositive: true }}
              />
              <MetricsCard
                title="Frequência Média"
                value="91%"
                description="Presença dos alunos"
                icon={CheckCircle2}
                color="accent"
                trend={{ value: 2.1, isPositive: true }}
              />
              <MetricsCard
                title="Atividades Pendentes"
                value="3"
                description="Para correção"
                icon={Clock}
                color="destructive"
                trend={{ value: -1, isPositive: false }}
              />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Próximas Aulas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Geometria Analítica</p>
                      <p className="text-sm text-muted-foreground">Hoje - 08:00</p>
                    </div>
                    <Badge variant="secondary">9º A</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">Álgebra Linear</p>
                      <p className="text-sm text-muted-foreground">Amanhã - 10:00</p>
                    </div>
                    <Badge variant="secondary">9º B</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Últimas Interações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Ana Silva</p>
                      <p className="text-xs text-muted-foreground">Dúvida sobre exercício 5</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2h</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Carlos Santos</p>
                      <p className="text-xs text-muted-foreground">Entregou atividade</p>
                    </div>
                    <span className="text-xs text-muted-foreground">4h</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Gestão de Alunos</CardTitle>
                <CardDescription>Acompanhe o desempenho da sua turma</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Input placeholder="Buscar aluno..." className="flex-1" />
                    <Button>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Adicionar Nota
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {students.map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{student.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Frequência: {student.attendance}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={student.grade >= 7 ? "default" : "destructive"}>
                            Nota: {student.grade}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Atividades e Avaliações</CardTitle>
                <CardDescription>Gerencie tarefas e acompanhe entregas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full md:w-auto">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Nova Atividade
                  </Button>
                  
                  <div className="space-y-3">
                    {assignments.map((assignment) => (
                      <div key={assignment.id} className="p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <Badge variant="outline">
                            Prazo: {new Date(assignment.dueDate).toLocaleDateString()}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground">
                              {assignment.submitted}/{assignment.total} entregas
                            </span>
                            <div className="w-32 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all" 
                                style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}
                              />
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Revisar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <CardTitle>Horário da Semana</CardTitle>
                <CardDescription>Sua agenda semanal</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'].map((day, index) => (
                    <div key={day} className="space-y-2">
                      <h4 className="font-medium text-center">{day}</h4>
                      <div className="space-y-1">
                        <div className="p-2 bg-primary/10 rounded text-xs">
                          <p className="font-medium">08:00 - 09:30</p>
                          <p>9º A - Matemática</p>
                        </div>
                        <div className="p-2 bg-secondary/10 rounded text-xs">
                          <p className="font-medium">10:00 - 11:30</p>
                          <p>9º B - Matemática</p>
                        </div>
                        {index < 3 && (
                          <div className="p-2 bg-accent/10 rounded text-xs">
                            <p className="font-medium">14:00 - 15:30</p>
                            <p>Reforço</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default TeacherDashboard;