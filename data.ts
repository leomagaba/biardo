export interface Student {
  id: string;
  name: string;
  class: string;
  status: "presente" | "ausente" | "atrasado";
  avatar: string;
  attendance: number;
  lunchPreference: string[];
  enrollmentDate: string;
  lastActivity: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: "principal" | "acompanhamento" | "sobremesa" | "bebida";
  available: boolean;
  studentsServed: number;
  totalStudents: number;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
  };
  allergens: string[];
}

export interface AttendanceData {
  date: string;
  present: number;
  absent: number;
  late: number;
}

export interface LunchData {
  date: string;
  served: number;
  waste: number;
  satisfaction: number;
}

// Mock data with performance optimization
export const mockStudents: Student[] = [
  {
    id: "1",
    name: "Ana Silva Santos",
    class: "5ºA",
    status: "presente",
    avatar: "AS",
    attendance: 95,
    lunchPreference: ["vegetariano"],
    enrollmentDate: "2024-02-01",
    lastActivity: "09:15"
  },
  {
    id: "2",
    name: "Bruno Costa Lima",
    class: "5ºA", 
    status: "presente",
    avatar: "BC",
    attendance: 88,
    lunchPreference: ["sem lactose"],
    enrollmentDate: "2024-02-01",
    lastActivity: "08:45"
  },
  {
    id: "3",
    name: "Carla Oliveira Freitas",
    class: "5ºB",
    status: "atrasado",
    avatar: "CO",
    attendance: 92,
    lunchPreference: [],
    enrollmentDate: "2024-02-01", 
    lastActivity: "08:35"
  },
  {
    id: "4",
    name: "Diego Ferreira Rocha",
    class: "5ºB",
    status: "ausente",
    avatar: "DF",
    attendance: 78,
    lunchPreference: ["sem glúten"],
    enrollmentDate: "2024-02-01",
    lastActivity: "Ontem 15:30"
  },
  {
    id: "5",
    name: "Elena Martins Souza",
    class: "5ºC",
    status: "presente",
    avatar: "EM",
    attendance: 97,
    lunchPreference: ["vegano"],
    enrollmentDate: "2024-02-01",
    lastActivity: "07:55"
  }
];

export const mockMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Arroz Integral com Feijão",
    description: "Arroz integral e feijão carioca temperados com especiarias naturais",
    category: "principal",
    available: true,
    studentsServed: 187,
    totalStudents: 248,
    nutritionalInfo: { calories: 320, protein: 12, carbs: 58 },
    allergens: []
  },
  {
    id: "2", 
    name: "Frango Grelhado Orgânico",
    description: "Peito de frango orgânico grelhado com ervas finas",
    category: "principal",
    available: true,
    studentsServed: 156,
    totalStudents: 248,
    nutritionalInfo: { calories: 185, protein: 31, carbs: 0 },
    allergens: []
  },
  {
    id: "3",
    name: "Salada Colorida Premium",
    description: "Mix de folhas verdes, tomate cereja, cenoura e beterraba",
    category: "acompanhamento", 
    available: true,
    studentsServed: 134,
    totalStudents: 248,
    nutritionalInfo: { calories: 45, protein: 2, carbs: 8 },
    allergens: []
  },
  {
    id: "4",
    name: "Mousse de Maracujá Fit",
    description: "Sobremesa light com polpa natural de maracujá",
    category: "sobremesa",
    available: true,
    studentsServed: 98,
    totalStudents: 248,
    nutritionalInfo: { calories: 95, protein: 4, carbs: 18 },
    allergens: ["lactose"]
  },
  {
    id: "5",
    name: "Suco Natural Detox",
    description: "Blend de frutas da estação com gengibre",
    category: "bebida",
    available: true,
    studentsServed: 203,
    totalStudents: 248,
    nutritionalInfo: { calories: 75, protein: 1, carbs: 18 },
    allergens: []
  }
];

export const mockAttendanceData: AttendanceData[] = [
  { date: "2024-01-08", present: 228, absent: 15, late: 5 },
  { date: "2024-01-09", present: 235, absent: 10, late: 3 },
  { date: "2024-01-10", present: 232, absent: 12, late: 4 },
  { date: "2024-01-11", present: 240, absent: 6, late: 2 },
  { date: "2024-01-12", present: 238, absent: 8, late: 2 },
  { date: "2024-01-15", present: 242, absent: 4, late: 2 },
  { date: "2024-01-16", present: 245, absent: 2, late: 1 }
];

export const mockLunchData: LunchData[] = [
  { date: "2024-01-08", served: 198, waste: 12, satisfaction: 4.2 },
  { date: "2024-01-09", served: 205, waste: 8, satisfaction: 4.5 },
  { date: "2024-01-10", served: 201, waste: 10, satisfaction: 4.3 },
  { date: "2024-01-11", served: 215, waste: 6, satisfaction: 4.7 },
  { date: "2024-01-12", served: 208, waste: 7, satisfaction: 4.4 },
  { date: "2024-01-15", served: 220, waste: 5, satisfaction: 4.8 },
  { date: "2024-01-16", served: 225, waste: 4, satisfaction: 4.9 }
];