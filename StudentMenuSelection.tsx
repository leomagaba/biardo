import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UtensilsCrossed, Clock, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface MenuItemCard {
  id: string;
  name: string;
  description: string;
  category: string;
  meal_type: string;
  allergens: string[];
  nutritional_info: {
    calories: number;
    protein: number;
    carbs: number;
  };
  image_url?: string;
}

const StudentMenuSelection = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [menu, setMenu] = useState<MenuItemCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('*')
        .eq('is_active', true)
        .order('meal_type', { ascending: true });

      if (error) throw error;
      setMenu(data || []);
    } catch (error: any) {
      toast({
        title: "Erro ao carregar cardápio",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSelection = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmitOrder = async () => {
    if (selectedItems.length === 0 || !user) {
      toast({
        title: "Selecione pelo menos um item",
        description: "Escolha os itens que deseja para sua refeição.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const orders = selectedItems.map(itemId => {
        const item = menu.find(m => m.id === itemId);
        return {
          student_id: user.id,
          student_name: user.full_name,
          menu_item: item?.name || '',
          meal_type: item?.meal_type || '',
          status: 'pending'
        };
      });

      const { error } = await supabase
        .from('menu_orders')
        .insert(orders);

      if (error) throw error;
      
      toast({
        title: "Pedido enviado!",
        description: `${selectedItems.length} item(ns) enviado(s) para a cozinha.`,
      });

      setSelectedItems([]);
    } catch (error: any) {
      toast({
        title: "Erro ao enviar pedido",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Principal: "bg-primary/20 text-primary border-primary/30",
      Acompanhamento: "bg-secondary/20 text-secondary border-secondary/30",
      Lanche: "bg-accent/20 text-accent border-accent/30",
      Bebida: "bg-orange/20 text-orange border-orange/30",
    };
    return colors[category] || "bg-muted/20 text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
            Cardápio do Dia
          </h2>
          <p className="text-muted-foreground">Escolha seus itens para a refeição</p>
        </div>
        {selectedItems.length > 0 && (
          <Button
            onClick={handleSubmitOrder}
            disabled={submitting}
            className="bg-gradient-accent hover:shadow-neon smooth-transition hover-lift"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Enviar Pedido ({selectedItems.length})
              </>
            )}
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menu.map((item) => (
          <Card
            key={item.id}
            className={`glass cursor-pointer smooth-transition hover-lift ${
              selectedItems.includes(item.id)
                ? "border-primary shadow-neon"
                : "border-border/50 hover-glow"
            }`}
            onClick={() => toggleSelection(item.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                {selectedItems.includes(item.id) && (
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                )}
              </div>
              <Badge className={`${getCategoryColor(item.category)} w-fit`}>
                {item.category}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{item.description}</p>

              {item.allergens && item.allergens.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.allergens.map((allergen, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="text-xs border-yellow-500/30 text-yellow-600"
                    >
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      {allergen}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t">
                <div>
                  <p className="text-muted-foreground">Calorias</p>
                  <p className="font-bold">{item.nutritional_info?.calories || 0}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Proteína</p>
                  <p className="font-bold">{item.nutritional_info?.protein || 0}g</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Carbos</p>
                  <p className="font-bold">{item.nutritional_info?.carbs || 0}g</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentMenuSelection;
