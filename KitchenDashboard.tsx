import Header from "@/components/Header";
import OrdersList from "@/components/Kitchen/OrdersList";
import ReportsManager from "@/components/Kitchen/ReportsManager";
import MenuManager from "@/components/Lunch/MenuManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChefHat } from "lucide-react";

const KitchenDashboard = () => {

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-neon">
            <ChefHat className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Cozinha SIGEA
            </h1>
            <p className="text-muted-foreground">
              Gestão completa do cardápio escolar
            </p>
          </div>
        </div>

        <Tabs defaultValue="pedidos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
            <TabsTrigger value="cardapio">Cardápio</TabsTrigger>
            <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos">
            <OrdersList />
          </TabsContent>

          <TabsContent value="cardapio">
            <MenuManager />
          </TabsContent>

          <TabsContent value="relatorios">
            <ReportsManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default KitchenDashboard;