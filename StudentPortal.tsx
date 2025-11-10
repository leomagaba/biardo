import { useState } from "react";
import Header from "@/components/Header";
import StudentMenuSelection from "@/components/StudentMenuSelection";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { mockMenuItems, mockAttendanceData } from "@/lib/data";
import { 
  Calendar,
  Clock,
  UtensilsCrossed,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  User
} from "lucide-react";

const StudentPortal = () => {
  const { user } = useAuth();
  const [selectedMeal, setSelectedMeal] = useState<string | null>(null);

  const todayAttendance = mockAttendanceData[mockAttendanceData.length - 1];
  const weeklyAttendance = Math.round((todayAttendance.present / (todayAttendance.present + todayAttendance.absent + todayAttendance.late)) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-secondary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-secondary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Olá, {user?.full_name}!</h2>
              <p className="text-muted-foreground">Turma: {user?.class}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Status da Frequência */}
          <Card className="glass bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status Hoje</CardTitle>
              <CheckCircle className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">Presente</div>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Chegada: 08:15</p>
              </div>
            </CardContent>
          </Card>

          {/* Frequência Semanal */}
          <Card className="glass bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Frequência Semanal</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{weeklyAttendance}%</div>
              <p className="text-xs text-muted-foreground">Excelente desempenho!</p>
            </CardContent>
          </Card>

          {/* Próxima Refeição */}
          <Card className="glass bg-card border-border shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próxima Refeição</CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">11:30</div>
              <p className="text-xs text-muted-foreground">Intervalo do almoço</p>
            </CardContent>
          </Card>
        </div>

        {/* Menu do Dia */}
        <div className="mt-6">
          <StudentMenuSelection />
        </div>

        {/* Histórico Rápido */}
        <Card className="mt-6 glass bg-card border-border shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Histórico da Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs font-medium text-muted-foreground mb-1">{day}</div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto ${
                    index < 5 ? 'bg-secondary/20 text-secondary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < 5 ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default StudentPortal;