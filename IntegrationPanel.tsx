import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sheet, Table, Webhook, BarChart3, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const IntegrationPanel = () => {
  const [googleSheetUrl, setGoogleSheetUrl] = useState("");
  const [n8nWebhookUrl, setN8nWebhookUrl] = useState("");
  const { toast } = useToast();

  const handleSaveGoogleSheet = () => {
    localStorage.setItem("sigea_google_sheet_url", googleSheetUrl);
    toast({
      title: "Google Sheets conectado",
      description: "Planilha integrada com sucesso",
    });
  };

  const handleSaveN8nWebhook = () => {
    localStorage.setItem("sigea_n8n_webhook_url", n8nWebhookUrl);
    toast({
      title: "n8n Webhook configurado",
      description: "Automações ativadas com sucesso",
    });
  };

  const testN8nConnection = async () => {
    const url = n8nWebhookUrl || localStorage.getItem("sigea_n8n_webhook_url");
    if (!url) {
      toast({
        title: "Erro",
        description: "Configure o webhook primeiro",
        variant: "destructive",
      });
      return;
    }

    try {
      await fetch(url, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: "SIGEA",
        }),
      });

      toast({
        title: "Teste enviado",
        description: "Verifique o histórico do n8n para confirmar",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao testar conexão",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Integrações SIGEA</h3>
      </div>

      <Tabs defaultValue="sheets" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="sheets">
            <Sheet className="w-4 h-4 mr-2" />
            Sheets
          </TabsTrigger>
          <TabsTrigger value="n8n">
            <Webhook className="w-4 h-4 mr-2" />
            n8n
          </TabsTrigger>
          <TabsTrigger value="charts">
            <BarChart3 className="w-4 h-4 mr-2" />
            Gráficos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sheets" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sheets-url">URL da Planilha Google Sheets</Label>
            <Input
              id="sheets-url"
              placeholder="https://docs.google.com/spreadsheets/d/..."
              value={googleSheetUrl}
              onChange={(e) => setGoogleSheetUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Cole o link da planilha com dados escolares e de cozinha
            </p>
          </div>
          <Button onClick={handleSaveGoogleSheet} className="w-full bg-gradient-primary hover:shadow-neon">
            Conectar Google Sheets
          </Button>
        </TabsContent>

        <TabsContent value="n8n" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="n8n-url">URL do Webhook n8n</Label>
            <Input
              id="n8n-url"
              placeholder="https://n8n.io/webhook/..."
              value={n8nWebhookUrl}
              onChange={(e) => setN8nWebhookUrl(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Cole o webhook do n8n para automações e cálculos
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSaveN8nWebhook} className="flex-1 bg-gradient-primary hover:shadow-neon">
              Salvar Webhook
            </Button>
            <Button onClick={testN8nConnection} variant="outline" className="hover-lift">
              Testar
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <h4 className="font-medium mb-2">Gráficos Disponíveis</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>✓ Frequência de alunos (diária/semanal/mensal)</li>
              <li>✓ Consumo de alimentos por refeição</li>
              <li>✓ Desempenho acadêmico por turma</li>
              <li>✓ Relatórios de estoque da cozinha</li>
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            Os gráficos são gerados automaticamente pelo assistente SIGEA quando você solicita relatórios.
          </p>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
