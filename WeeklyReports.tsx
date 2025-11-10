import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, UtensilsCrossed, BookOpen } from "lucide-react";
import ReportFilters from "./Dashboard/ReportFilters";

const WeeklyReports = () => {
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');

  const getAttendanceData = () => {
    if (period === 'day') {
      return [
        { time: '07:00', present: 45, late: 5, absent: 2 },
        { time: '08:00', present: 48, late: 3, absent: 1 },
        { time: '09:00', present: 50, late: 2, absent: 0 },
        { time: '10:00', present: 49, late: 2, absent: 1 },
      ];
    } else if (period === 'week') {
      return [
        { day: 'Seg', present: 245, late: 12, absent: 8 },
        { day: 'Ter', present: 238, late: 15, absent: 12 },
        { day: 'Qua', present: 250, late: 10, absent: 5 },
        { day: 'Qui', present: 242, late: 18, absent: 5 },
        { day: 'Sex', present: 235, late: 20, absent: 10 },
      ];
    } else {
      return [
        { week: 'Sem 1', present: 1180, late: 65, absent: 40 },
        { week: 'Sem 2', present: 1205, late: 52, absent: 38 },
        { week: 'Sem 3', present: 1195, late: 58, absent: 42 },
        { week: 'Sem 4', present: 1210, late: 55, absent: 30 },
      ];
    }
  };

  const getLunchData = () => {
    if (period === 'day') {
      return [
        { time: '11:00', served: 45, rating: 4.2 },
        { time: '11:30', served: 78, rating: 4.5 },
        { time: '12:00', served: 92, rating: 4.3 },
        { time: '12:30', served: 65, rating: 4.4 },
      ];
    } else if (period === 'week') {
      return [
        { day: 'Seg', served: 215, rating: 4.2 },
        { day: 'Ter', served: 228, rating: 4.5 },
        { day: 'Qua', served: 232, rating: 4.3 },
        { day: 'Qui', served: 220, rating: 4.4 },
        { day: 'Sex', served: 225, rating: 4.6 },
      ];
    } else {
      return [
        { week: 'Sem 1', served: 1020, rating: 4.3 },
        { week: 'Sem 2', served: 1100, rating: 4.4 },
        { week: 'Sem 3', served: 1085, rating: 4.2 },
        { week: 'Sem 4', served: 1120, rating: 4.5 },
      ];
    }
  };

  const getLibraryData = () => {
    if (period === 'day') {
      return [
        { name: 'Empréstimos', value: 12 },
        { name: 'Devoluções', value: 8 },
        { name: 'Atrasados', value: 3 },
      ];
    } else if (period === 'week') {
      return [
        { name: 'Empréstimos', value: 85 },
        { name: 'Devoluções', value: 72 },
        { name: 'Atrasados', value: 15 },
      ];
    } else {
      return [
        { name: 'Empréstimos', value: 340 },
        { name: 'Devoluções', value: 298 },
        { name: 'Atrasados', value: 42 },
      ];
    }
  };

  const attendanceData = getAttendanceData();
  const lunchData = getLunchData();
  const libraryData = getLibraryData();

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  const periodLabels = {
    day: 'Hoje',
    week: 'Esta Semana',
    month: 'Este Mês'
  };

  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent flex items-center gap-2">
            <TrendingUp className="h-8 w-8 text-primary" />
            Relatórios - {periodLabels[period]}
          </h2>
          <p className="text-muted-foreground mt-2">Análise completa das atividades escolares</p>
        </div>
        <ReportFilters period={period} onPeriodChange={setPeriod} />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="glass border-primary/20 hover-glow hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Taxa de Presença
            </CardTitle>
            <CardDescription>Acompanhamento detalhado de frequência</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {period === 'day' ? '94%' : period === 'week' ? '92%' : '95%'}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {period === 'day' ? '47 de 50 alunos' : period === 'week' ? '1210 de 1315 presenças' : '4790 de 5040 presenças'}
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-primary/20 hover-glow hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-accent" />
              Refeições Servidas
            </CardTitle>
            <CardDescription>Total de alimentação fornecida</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              {period === 'day' ? '280' : period === 'week' ? '1.120' : '4.325'}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Avaliação média: <span className="font-semibold text-accent">
                {period === 'day' ? '4.4/5' : period === 'week' ? '4.4/5' : '4.35/5'}
              </span>
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-primary/20 hover-glow hover-lift">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-secondary" />
              Biblioteca
            </CardTitle>
            <CardDescription>Atividades de empréstimo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {period === 'day' ? '12' : period === 'week' ? '85' : '340'}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {period === 'day' ? '8 devoluções, 3 atrasados' : period === 'week' ? '72 devoluções, 15 atrasados' : '298 devoluções, 42 atrasados'}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass border-primary/20 hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Frequência Detalhada
            </CardTitle>
            <CardDescription>
              Presente, atrasados e ausentes - {periodLabels[period].toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey={period === 'day' ? 'time' : period === 'week' ? 'day' : 'week'} 
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Bar dataKey="present" name="Presentes" fill="hsl(var(--chart-1))" radius={[8, 8, 0, 0]} />
                <Bar dataKey="late" name="Atrasados" fill="hsl(var(--chart-3))" radius={[8, 8, 0, 0]} />
                <Bar dataKey="absent" name="Ausentes" fill="hsl(var(--destructive))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="glass border-primary/20 hover-glow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UtensilsCrossed className="h-5 w-5 text-accent" />
              Análise de Refeições
            </CardTitle>
            <CardDescription>
              Quantidade servida e avaliação - {periodLabels[period].toLowerCase()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lunchData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey={period === 'day' ? 'time' : period === 'week' ? 'day' : 'week'}
                  stroke="hsl(var(--muted-foreground))"
                />
                <YAxis yAxisId="left" stroke="hsl(var(--muted-foreground))" />
                <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  yAxisId="left" 
                  type="monotone" 
                  dataKey="served" 
                  name="Servidas" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
                <Line 
                  yAxisId="right" 
                  type="monotone" 
                  dataKey="rating" 
                  name="Avaliação" 
                  stroke="hsl(var(--chart-3))" 
                  strokeWidth={3}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-primary/20 hover-glow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            Distribuição de Atividades da Biblioteca
          </CardTitle>
          <CardDescription>
            Visão geral dos empréstimos, devoluções e atrasos - {periodLabels[period].toLowerCase()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={libraryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {libraryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyReports;
