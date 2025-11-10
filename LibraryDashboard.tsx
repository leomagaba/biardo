import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { BookOpen, Search, User, Calendar, ArrowRight } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  available: boolean;
  dueDate?: string;
  borrowedBy?: string;
  isbn: string;
  location: string;
}

const LibraryDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books] = useState<Book[]>([
    {
      id: '1',
      title: 'Dom Casmurro',
      author: 'Machado de Assis',
      category: 'Literatura Brasileira',
      available: true,
      isbn: '978-8535902402',
      location: 'Estante A - Seção 2'
    },
    {
      id: '2',
      title: 'O Pequeno Príncipe',
      author: 'Antoine de Saint-Exupéry',
      category: 'Literatura Infantojuvenil',
      available: false,
      dueDate: '2024-01-20',
      borrowedBy: 'Ana Silva Santos',
      isbn: '978-8535902123',
      location: 'Estante B - Seção 1'
    },
    {
      id: '3',
      title: 'Fundamentos da Matemática',
      author: 'Prof. Carlos Mendes',
      category: 'Educação',
      available: true,
      isbn: '978-8535904567',
      location: 'Estante C - Seção 3'
    },
    {
      id: '4',
      title: 'História do Brasil',
      author: 'Boris Fausto',
      category: 'História',
      available: false,
      dueDate: '2024-01-25',
      borrowedBy: 'Bruno Costa Lima',
      isbn: '978-8535901234',
      location: 'Estante D - Seção 1'
    },
    {
      id: '5',
      title: 'Ciências da Natureza',
      author: 'Maria Fernanda',
      category: 'Ciências',
      available: true,
      isbn: '978-8535905678',
      location: 'Estante E - Seção 2'
    }
  ]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableBooks = books.filter(book => book.available);
  const borrowedBooks = books.filter(book => !book.available);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-neon">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Biblioteca SIGEA
            </h1>
            <p className="text-muted-foreground">
              Sistema de gestão bibliográfica
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-4 mb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{books.length}</p>
                  <p className="text-sm text-muted-foreground">Total de Livros</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{availableBooks.length}</p>
                  <p className="text-sm text-muted-foreground">Disponíveis</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{borrowedBooks.length}</p>
                  <p className="text-sm text-muted-foreground">Emprestados</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">2</p>
                  <p className="text-sm text-muted-foreground">Vencendo Hoje</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar livros por título ou autor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="todos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="todos">Todos os Livros</TabsTrigger>
            <TabsTrigger value="disponiveis">Disponíveis</TabsTrigger>
            <TabsTrigger value="emprestados">Emprestados</TabsTrigger>
          </TabsList>

          <TabsContent value="todos">
            <div className="grid gap-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="glass hover:shadow-neon transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{book.title}</h3>
                          <Badge variant={book.available ? "default" : "destructive"}>
                            {book.available ? "Disponível" : "Emprestado"}
                          </Badge>
                          <Badge variant="outline">{book.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">
                          <strong>Autor:</strong> {book.author}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>ISBN:</strong> {book.isbn}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Localização:</strong> {book.location}
                        </p>
                        {!book.available && (
                          <div className="mt-2 text-sm">
                            <p><strong>Emprestado para:</strong> {book.borrowedBy}</p>
                            <p><strong>Data de devolução:</strong> {book.dueDate}</p>
                          </div>
                        )}
                      </div>
                      <Button size="sm" className="ml-4">
                        {book.available ? "Emprestar" : "Renovar"}
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="disponiveis">
            <div className="grid gap-4">
              {availableBooks.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((book) => (
                <Card key={book.id} className="glass hover:shadow-neon transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{book.title}</h3>
                          <Badge variant="default">Disponível</Badge>
                          <Badge variant="outline">{book.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">
                          <strong>Autor:</strong> {book.author}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>ISBN:</strong> {book.isbn}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Localização:</strong> {book.location}
                        </p>
                      </div>
                      <Button size="sm" className="ml-4">
                        Emprestar
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="emprestados">
            <div className="grid gap-4">
              {borrowedBooks.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((book) => (
                <Card key={book.id} className="glass hover:shadow-neon transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{book.title}</h3>
                          <Badge variant="destructive">Emprestado</Badge>
                          <Badge variant="outline">{book.category}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-1">
                          <strong>Autor:</strong> {book.author}
                        </p>
                        <p className="text-sm text-muted-foreground mb-1">
                          <strong>ISBN:</strong> {book.isbn}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Localização:</strong> {book.location}
                        </p>
                        <div className="mt-2 text-sm">
                          <p><strong>Emprestado para:</strong> {book.borrowedBy}</p>
                          <p><strong>Data de devolução:</strong> {book.dueDate}</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="ml-4">
                        Renovar
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LibraryDashboard;