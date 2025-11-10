import { memo, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Calendar, Check, Clock, Search, User, X, Filter, Download, UserCheck } from "lucide-react";
import { mockStudents, Student } from "@/lib/data";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { debounce } from "@/utils/performance";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const StudentList = memo(() => {
  const [students, setStudents] = useLocalStorage<Student[]>("sigea-students", mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterClass, setFilterClass] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  // Debounced search for performance
  const debouncedSearch = useMemo(
    () => debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           student.class.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesClass = filterClass === "all" || student.class === filterClass;
      const matchesStatus = filterStatus === "all" || student.status === filterStatus;
      
      return matchesSearch && matchesClass && matchesStatus;
    });
  }, [students, searchTerm, filterClass, filterStatus]);

  const uniqueClasses = useMemo(() => {
    return Array.from(new Set(students.map(s => s.class))).sort();
  }, [students]);

  const updateStudentStatus = (studentId: string, newStatus: Student['status']) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: newStatus, lastActivity: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
          : student
      )
    );
  };

  const getStatusColor = (status: string) => {
    const colors = {
      presente: "bg-secondary/20 text-secondary border-secondary/30 shadow-neon-secondary",
      ausente: "bg-destructive/20 text-destructive border-destructive/30",
      atrasado: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
    };
    return colors[status as keyof typeof colors] || "bg-muted/20 text-muted-foreground";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      presente: <Check className="h-3 w-3" />,
      ausente: <X className="h-3 w-3" />,
      atrasado: <Clock className="h-3 w-3" />
    };
    return icons[status as keyof typeof icons] || <User className="h-3 w-3" />;
  };

  const stats = useMemo(() => {
    const present = filteredStudents.filter(s => s.status === "presente").length;
    const absent = filteredStudents.filter(s => s.status === "ausente").length;
    const late = filteredStudents.filter(s => s.status === "atrasado").length;
    const total = filteredStudents.length;
    
    return { present, absent, late, total, percentage: total > 0 ? Math.round((present / total) * 100) : 0 };
  }, [filteredStudents]);

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass bg-secondary/10 p-4 rounded-lg border border-secondary/20 shadow-neon-secondary">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-secondary" />
            <div>
              <p className="text-2xl font-bold font-mono text-secondary">{stats.present}</p>
              <p className="text-xs text-muted-foreground">Presentes</p>
            </div>
          </div>
        </div>
        <div className="glass bg-destructive/10 p-4 rounded-lg border border-destructive/20">
          <div className="flex items-center gap-2">
            <X className="h-5 w-5 text-destructive" />
            <div>
              <p className="text-2xl font-bold font-mono text-destructive">{stats.absent}</p>
              <p className="text-xs text-muted-foreground">Ausentes</p>
            </div>
          </div>
        </div>
        <div className="glass bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold font-mono text-yellow-500">{stats.late}</p>
              <p className="text-xs text-muted-foreground">Atrasados</p>
            </div>
          </div>
        </div>
        <div className="glass bg-primary/10 p-4 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="text-2xl font-bold font-mono text-primary">{stats.percentage}%</p>
              <p className="text-xs text-muted-foreground">Frequência</p>
            </div>
          </div>
        </div>
      </div>

      <Card className="glass bg-gradient-card border-primary/20 shadow-neon hover:shadow-neon-secondary transition-all duration-500">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <div className="relative">
                <Calendar className="h-5 w-5 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-sm"></div>
              </div>
              <span className="font-mono">Controle de Frequência</span>
              <Badge className="bg-primary/20 text-primary border-primary/30 font-mono">
                {filteredStudents.length} alunos
              </Badge>
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="glass border-primary/30 hover:shadow-neon">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar aluno ou turma..."
                onChange={(e) => debouncedSearch(e.target.value)}
                className="pl-10 glass bg-background/50 border-primary/20 focus:border-primary/40"
              />
            </div>
            <Select value={filterClass} onValueChange={setFilterClass}>
              <SelectTrigger className="w-[120px] glass bg-background/50 border-primary/20">
                <SelectValue placeholder="Turma" />
              </SelectTrigger>
              <SelectContent className="glass bg-card/95 border-primary/20 backdrop-blur-xl">
                <SelectItem value="all">Todas</SelectItem>
                {uniqueClasses.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[130px] glass bg-background/50 border-primary/20">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="glass bg-card/95 border-primary/20 backdrop-blur-xl">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="presente">Presente</SelectItem>
                <SelectItem value="ausente">Ausente</SelectItem>
                <SelectItem value="atrasado">Atrasado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Student List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="group flex items-center justify-between p-4 rounded-lg glass bg-background/30 border border-primary/10 hover:border-primary/30 hover:shadow-soft transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm shadow-neon">
                      {student.avatar}
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${
                      student.status === 'presente' ? 'bg-secondary' : 
                      student.status === 'atrasado' ? 'bg-yellow-500' : 'bg-destructive'
                    }`}></div>
                  </div>
                  <div>
                    <p className="font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {student.name}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-mono">{student.class}</span>
                      <span>•</span>
                      <span>{student.attendance}% freq.</span>
                      <span>•</span>
                      <span className="font-mono">{student.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`${getStatusColor(student.status)} font-mono`}>
                    {getStatusIcon(student.status)}
                    <span className="ml-1 capitalize">{student.status}</span>
                  </Badge>
                  
                  <div className="flex gap-1">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => updateStudentStatus(student.id, "presente")}
                      className="h-8 w-8 p-0 hover:bg-secondary/20 hover:text-secondary"
                      disabled={student.status === "presente"}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => updateStudentStatus(student.id, "atrasado")}
                      className="h-8 w-8 p-0 hover:bg-yellow-500/20 hover:text-yellow-500"
                      disabled={student.status === "atrasado"}
                    >
                      <Clock className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => updateStudentStatus(student.id, "ausente")}
                      className="h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                      disabled={student.status === "ausente"}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredStudents.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-mono">Nenhum aluno encontrado</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

StudentList.displayName = 'StudentList';

export default StudentList;