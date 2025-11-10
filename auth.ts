export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'teacher' | 'student' | 'kitchen';
  avatar?: string;
  class?: string;
  subject?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

// Mock users for demo
export const mockUsers: User[] = [
  {
    id: 'admin1',
    name: 'Dr. Maria Santos',
    email: 'maria.santos@sigea.edu',
    role: 'admin',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin'
  },
  {
    id: 'teacher1',
    name: 'Prof. Carlos Lima', 
    email: 'carlos.lima@sigea.edu',
    role: 'teacher',
    subject: 'Matemática',
    class: '9º A',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher'
  },
  {
    id: 'student1', 
    name: 'Ana Oliveira',
    email: 'ana.oliveira@sigea.edu',
    role: 'student',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student',
    class: '9º A'
  },
  {
    id: 'kitchen1',
    name: 'Chef Roberto Silva',
    email: 'roberto.silva@sigea.edu',
    role: 'kitchen',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=chef'
  }
];

export const loginUser = (role: 'admin' | 'teacher' | 'student' | 'kitchen'): User => {
  return mockUsers.find(user => user.role === role) || mockUsers[0];
};