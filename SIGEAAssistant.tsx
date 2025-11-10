import Header from "@/components/Header";
import { ChatInterface } from "@/components/SIGEA/ChatInterface";
import { IntegrationPanel } from "@/components/SIGEA/IntegrationPanel";
import { Card } from "@/components/ui/card";
import { Bot, Brain, TrendingUp } from "lucide-react";

const SIGEAAssistant = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8 text-center animate-slide-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Assistente SIGEA
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sistema Inteligente de Gestão Escolar e Alimentar - Seu assistente digital para gerenciar atividades, 
            responder dúvidas e gerar relatórios automáticos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="p-6 hover-lift bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">IA Inteligente</h3>
            <p className="text-sm text-muted-foreground">
              Responde perguntas sobre horários, notas, frequência e eventos escolares
            </p>
          </Card>

          <Card className="p-6 hover-lift bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Cálculos Automáticos</h3>
            <p className="text-sm text-muted-foreground">
              Calcula quantidades de alimentos por aluno e gera relatórios de consumo
            </p>
          </Card>

          <Card className="p-6 hover-lift bg-card/50 backdrop-blur-sm border-primary/20">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Automações</h3>
            <p className="text-sm text-muted-foreground">
              Integrado com Google Sheets e n8n para automações completas
            </p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ChatInterface />
          </div>
          <div>
            <IntegrationPanel />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SIGEAAssistant;
