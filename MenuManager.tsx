import { memo, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { UtensilsCrossed, Plus, Clock, Users, CheckCircle, Edit, Trash2, AlertTriangle, TrendingUp } from "lucide-react";
import { mockMenuItems, MenuItem } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { optimizedStyles } from "@/utils/performance";

const MenuManager = memo(() => {
  const [menuItems, setMenuItems] = useLocalStorage<MenuItem[]>("sigea-menu", mockMenuItems);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState<Partial<MenuItem>>({
    name: "",
    description: "",
    category: "principal",
    available: true,
    studentsServed: 0,
    totalStudents: 248,
    nutritionalInfo: { calories: 0, protein: 0, carbs: 0 },
    allergens: []
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      principal: "bg-primary/20 text-primary border-primary/30 shadow-neon",
      acompanhamento: "bg-secondary/20 text-secondary border-secondary/30 shadow-neon-secondary",
      sobremesa: "bg-accent/20 text-accent border-accent/30 shadow-neon-accent",
      bebida: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
    };
    return colors[category as keyof typeof colors] || "bg-muted/20 text-muted-foreground";
  };

  const getProgressPercentage = (served: number, total: number) => {
    return Math.round((served / total) * 100);
  };

  const updateItemAvailability = (itemId: string, available: boolean) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, available }
          : item
      )
    );
  };

  const deleteItem = (itemId: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
  };

  const addItem = () => {
    if (newItem.name && newItem.description) {
      const item: MenuItem = {
        id: Date.now().toString(),
        name: newItem.name!,
        description: newItem.description!,
        category: newItem.category as MenuItem['category'] || "principal",
        available: newItem.available ?? true,
        studentsServed: 0,
        totalStudents: 248,
        nutritionalInfo: newItem.nutritionalInfo || { calories: 0, protein: 0, carbs: 0 },
        allergens: newItem.allergens || []
      };
      
      setMenuItems(prev => [...prev, item]);
      setNewItem({
        name: "",
        description: "",
        category: "principal",
        available: true,
        studentsServed: 0,
        totalStudents: 248,
        nutritionalInfo: { calories: 0, protein: 0, carbs: 0 },
        allergens: []
      });
      setIsAddDialogOpen(false);
    }
  };

  const stats = useMemo(() => {
    const available = menuItems.filter(item => item.available).length;
    const totalServed = menuItems.reduce((sum, item) => sum + item.studentsServed, 0);
    const avgSatisfaction = 4.6; // Mock value
    
    return { available, totalItems: menuItems.length, totalServed, avgSatisfaction };
  }, [menuItems]);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass bg-primary/10 p-4 rounded-lg border border-primary/20 shadow-neon">
          <div className="flex items-center gap-2">
            <UtensilsCrossed className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold font-mono text-primary">{stats.available}</p>
              <p className="text-xs text-muted-foreground">Disponíveis</p>
            </div>
          </div>
        </div>
        <div className="glass bg-secondary/10 p-4 rounded-lg border border-secondary/20">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-secondary" />
            <div>
              <p className="text-2xl font-bold font-mono text-secondary">{stats.totalServed}</p>
              <p className="text-xs text-muted-foreground">Servidos</p>
            </div>
          </div>
        </div>
        <div className="glass bg-accent/10 p-4 rounded-lg border border-accent/20">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            <div>
              <p className="text-2xl font-bold font-mono text-accent">{stats.totalItems}</p>
              <p className="text-xs text-muted-foreground">Total Itens</p>
            </div>
          </div>
        </div>
        <div className="glass bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold font-mono text-yellow-500">{stats.avgSatisfaction}★</p>
              <p className="text-xs text-muted-foreground">Satisfação</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="glass bg-gradient-card border-accent/20 shadow-neon-accent hover:shadow-neon transition-all duration-500" style={optimizedStyles}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="relative">
                <UtensilsCrossed className="h-5 w-5 text-accent animate-pulse" />
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-sm"></div>
              </div>
              <span className="font-mono">Cardápio Digital</span>
              <Badge className="bg-accent/20 text-accent border-accent/30 font-mono">
                Hoje
              </Badge>
            </CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-accent hover:opacity-90 shadow-neon-accent">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </DialogTrigger>
              <DialogContent className="glass bg-card/95 border-accent/20 backdrop-blur-xl">
                <DialogHeader>
                  <DialogTitle className="font-mono">Novo Item do Cardápio</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Nome do item"
                    value={newItem.name || ""}
                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                    className="glass bg-background/50 border-accent/20"
                  />
                  <Textarea
                    placeholder="Descrição detalhada"
                    value={newItem.description || ""}
                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                    className="glass bg-background/50 border-accent/20"
                  />
                  <Select 
                    value={newItem.category} 
                    onValueChange={(value) => setNewItem(prev => ({ ...prev, category: value as MenuItem['category'] }))}
                  >
                    <SelectTrigger className="glass bg-background/50 border-accent/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass bg-card/95 border-accent/20">
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="acompanhamento">Acompanhamento</SelectItem>
                      <SelectItem value="sobremesa">Sobremesa</SelectItem>
                      <SelectItem value="bebida">Bebida</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={addItem} className="w-full bg-gradient-accent hover:opacity-90">
                    Adicionar ao Cardápio
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="group p-4 rounded-lg glass bg-background/30 border border-accent/10 hover:border-accent/30 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300">
                        {item.name}
                      </h3>
                      <Badge className={`${getCategoryColor(item.category)} font-mono`}>
                        {item.category}
                      </Badge>
                      {item.allergens.length > 0 && (
                        <Badge variant="outline" className="text-yellow-500 border-yellow-500/30">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Alérgenos
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {item.description}
                    </p>
                    
                    {/* Nutritional Info */}
                    <div className="flex gap-4 text-xs font-mono mb-3">
                      <span className="text-primary">{item.nutritionalInfo.calories} kcal</span>
                      <span className="text-secondary">{item.nutritionalInfo.protein}g proteína</span>
                      <span className="text-accent">{item.nutritionalInfo.carbs}g carbs</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateItemAvailability(item.id, !item.available)}
                      className={`h-8 w-8 p-0 ${item.available 
                        ? 'hover:bg-destructive/20 hover:text-destructive' 
                        : 'hover:bg-secondary/20 hover:text-secondary'
                      }`}
                    >
                      {item.available ? <Clock className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteItem(item.id)}
                      className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Badge className={item.available 
                      ? "bg-secondary/20 text-secondary border-secondary/30 shadow-neon-secondary" 
                      : "bg-muted/20 text-muted-foreground border-muted/30"
                    }>
                      {item.available ? 'Disponível' : 'Indisponível'}
                    </Badge>
                  </div>
                </div>

                {item.available && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground flex items-center gap-1 font-mono">
                        <Users className="h-4 w-4" />
                        Estudantes servidos
                      </span>
                      <span className="font-bold font-mono">
                        {item.studentsServed}/{item.totalStudents}
                      </span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-accent h-2 rounded-full transition-all duration-1000 shadow-neon-accent"
                        style={{
                          width: `${getProgressPercentage(item.studentsServed, item.totalStudents)}%`,
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-accent font-bold">
                        {getProgressPercentage(item.studentsServed, item.totalStudents)}% servido
                      </span>
                      <span className="text-muted-foreground">
                        Restam: {item.totalStudents - item.studentsServed}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {menuItems.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <UtensilsCrossed className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-mono">Nenhum item no cardápio</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

MenuManager.displayName = 'MenuManager';

export default MenuManager;