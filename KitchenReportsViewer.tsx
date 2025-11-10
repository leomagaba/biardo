import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { FileText, Calendar, TrendingUp, Loader2, ChefHat } from "lucide-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";

interface Report {
  id: string;
  report_date: string;
  total_meals_served: number;
  meals_by_type: any;
  observations: string;
  created_at: string;
}

const KitchenReportsViewer = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReports();
    
    // Realtime subscription
    const subscription = supabase
      .channel('kitchen_reports_changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'kitchen_reports' }, () => {
        loadReports();
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadReports = async () => {
    try {
      const { data, error } = await supabase
        .from('kitchen_reports')
        .select('*')
        .order('report_date', { ascending: false })
        .limit(30);

      if (error) throw error;
      setReports(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar relatórios",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getChartData = () => {
    return reports.slice(0, 7).reverse().map(report => ({
      date: new Date(report.report_date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      total: report.total_meals_served,
      ...report.meals_by_type
    }));
  };

  const totalMealsLastWeek = reports.slice(0, 7).reduce((sum, report) => sum + report.total_meals_served, 0);
  const avgMealsPerDay = reports.length > 0 ? Math.round(totalMealsLastWeek / Math.min(7, reports.length)) : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalMealsLastWeek}</p>
                <p className="text-sm text-muted-foreground">Refeições (7 dias)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-accent/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{avgMealsPerDay}</p>
                <p className="text-sm text-muted-foreground">Média por dia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-secondary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{reports.length}</p>
                <p className="text-sm text-muted-foreground">Total de Relatórios</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {reports.length > 0 && (
        <Card className="glass border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Refeições Servidas - Últimos 7 Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getChartData()}>
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Bar dataKey="total" name="Total" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      <Card className="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Relatórios Diários da Cozinha
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhum relatório disponível ainda
            </p>
          ) : (
            <div className="space-y-3">
              {reports.map((report) => (
                <Card key={report.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">
                            {new Date(report.report_date).toLocaleDateString('pt-BR', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                        <Badge variant="secondary">
                          {report.total_meals_served} refeições
                        </Badge>
                      </div>

                      {report.meals_by_type && Object.keys(report.meals_by_type).length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {Object.entries(report.meals_by_type).map(([type, count]) => (
                            <Badge key={type} variant="outline">
                              {type}: {count as number}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {report.observations && (
                        <div className="pt-2 border-t">
                          <p className="text-sm font-medium mb-1">Observações:</p>
                          <p className="text-sm text-muted-foreground">{report.observations}</p>
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground">
                        Criado em: {new Date(report.created_at).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default KitchenReportsViewer;