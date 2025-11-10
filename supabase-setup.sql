-- =======================
-- SIGEA - Sistema Integrado de Gestão Educacional Avançado
-- Configuração completa do banco de dados Supabase
-- =======================

-- Criação da extensão para UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de usuários (expandindo a auth.users do Supabase)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'teacher', 'student', 'kitchen', 'library')),
  avatar_url TEXT,
  class TEXT,
  subject TEXT,
  phone TEXT,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de estudantes (dados específicos)
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  student_number TEXT UNIQUE NOT NULL,
  class TEXT NOT NULL,
  grade_level INTEGER NOT NULL,
  birth_date DATE,
  parent_name TEXT,
  parent_phone TEXT,
  parent_email TEXT,
  address TEXT,
  lunch_preferences TEXT[],
  allergies TEXT[],
  medical_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de professores (dados específicos)
CREATE TABLE IF NOT EXISTS teachers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  employee_number TEXT UNIQUE NOT NULL,
  subjects TEXT[] NOT NULL,
  classes TEXT[] NOT NULL,
  hire_date DATE NOT NULL,
  department TEXT,
  qualification TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Tabela de presença
CREATE TABLE IF NOT EXISTS attendance (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('presente', 'ausente', 'atrasado', 'justificado')),
  arrival_time TIME,
  notes TEXT,
  recorded_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, date)
);

-- 5. Tabela de cardápio
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('principal', 'acompanhamento', 'sobremesa', 'bebida', 'lanche')),
  meal_type TEXT NOT NULL CHECK (meal_type IN ('lanche', 'almoco')),
  ingredients TEXT[] NOT NULL,
  allergens TEXT[],
  nutritional_info JSONB,
  preparation_time INTEGER,
  servings INTEGER,
  status TEXT DEFAULT 'disponivel' CHECK (status IN ('disponivel', 'preparando', 'pronto', 'servindo', 'indisponivel')),
  image_url TEXT,
  price DECIMAL(10,2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Tabela de servir refeições
CREATE TABLE IF NOT EXISTS meal_service (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('lanche', 'almoco')),
  served_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  quantity INTEGER DEFAULT 1,
  satisfaction_rating INTEGER CHECK (satisfaction_rating BETWEEN 1 AND 5),
  notes TEXT,
  served_by UUID REFERENCES profiles(id)
);

-- 7. Tabela de biblioteca - livros
CREATE TABLE IF NOT EXISTS books (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  isbn TEXT UNIQUE,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  publisher TEXT,
  publication_year INTEGER,
  category TEXT NOT NULL,
  description TEXT,
  total_copies INTEGER NOT NULL DEFAULT 1,
  available_copies INTEGER NOT NULL DEFAULT 1,
  location TEXT,
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Tabela de empréstimos de livros
CREATE TABLE IF NOT EXISTS book_loans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  book_id UUID REFERENCES books(id) ON DELETE CASCADE,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  loan_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  return_date DATE,
  status TEXT DEFAULT 'ativo' CHECK (status IN ('ativo', 'devolvido', 'atrasado', 'perdido')),
  notes TEXT,
  loaned_by UUID REFERENCES profiles(id),
  returned_to UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Tabela de notas/avaliações
CREATE TABLE IF NOT EXISTS grades (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  teacher_id UUID REFERENCES teachers(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  assignment_name TEXT NOT NULL,
  grade DECIMAL(5,2) NOT NULL,
  max_grade DECIMAL(5,2) NOT NULL DEFAULT 10.00,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  semester INTEGER NOT NULL CHECK (semester IN (1, 2)),
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 10. Tabela de eventos/comunicados
CREATE TABLE IF NOT EXISTS announcements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('evento', 'comunicado', 'urgente', 'geral')),
  target_audience TEXT[] NOT NULL, -- ['all', 'students', 'teachers', 'parents']
  author_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT TRUE,
  priority INTEGER DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. Tabela de configurações do sistema
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =======================
-- ROW LEVEL SECURITY (RLS)
-- =======================

-- Ativar RLS para todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_service ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE book_loans ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles
CREATE POLICY "Usuários podem ver próprio perfil" ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil" ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis" ON profiles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas para students
CREATE POLICY "Estudantes podem ver próprios dados" ON students FOR SELECT
  USING (
    user_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'teacher')
    )
  );

-- Políticas para attendance
CREATE POLICY "Ver presença própria ou se for professor/admin" ON attendance FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM students s 
      WHERE s.id = student_id AND s.user_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'teacher')
    )
  );

-- Políticas para menu_items (todos podem ver)
CREATE POLICY "Todos podem ver cardápio" ON menu_items FOR SELECT
  USING (is_active = true);

CREATE POLICY "Cozinha e admins podem gerenciar cardápio" ON menu_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'kitchen')
    )
  );

-- Políticas para books (todos podem ver)
CREATE POLICY "Todos podem ver livros" ON books FOR SELECT
  USING (is_active = true);

CREATE POLICY "Biblioteca e admins podem gerenciar livros" ON books FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role IN ('admin', 'library')
    )
  );

-- =======================
-- FUNÇÕES E TRIGGERS
-- =======================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar trigger em todas as tabelas relevantes
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_books_updated_at BEFORE UPDATE ON books
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_book_loans_updated_at BEFORE UPDATE ON book_loans
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at BEFORE UPDATE ON system_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =======================
-- DADOS INICIAIS DE EXEMPLO
-- =======================

-- Inserir configurações iniciais do sistema
INSERT INTO system_settings (key, value, description) VALUES
  ('school_name', '"Escola SIGEA"', 'Nome da escola'),
  ('school_address', '"Rua da Educação, 123 - Centro"', 'Endereço da escola'),
  ('school_phone', '"(11) 1234-5678"', 'Telefone da escola'),
  ('lunch_time', '{"start": "11:30", "end": "13:00"}', 'Horário do almoço'),
  ('snack_time', '{"morning": {"start": "09:30", "end": "10:00"}, "afternoon": {"start": "15:30", "end": "16:00"}}', 'Horários dos lanches'),
  ('academic_year', '2024', 'Ano letivo atual')
ON CONFLICT (key) DO NOTHING;

-- Inserir itens de cardápio de exemplo
INSERT INTO menu_items (name, description, category, meal_type, ingredients, allergens, nutritional_info, preparation_time, servings, status) VALUES
  ('Arroz Integral com Feijão', 'Arroz integral e feijão carioca temperados com especiarias naturais', 'principal', 'almoco', 
   ARRAY['Arroz integral', 'Feijão carioca', 'Cebola', 'Alho', 'Louro', 'Azeite'], 
   ARRAY[]::TEXT[], 
   '{"calories": 320, "protein": 12, "carbs": 58, "fat": 4}', 
   45, 250, 'disponivel'),
  
  ('Frango Grelhado Orgânico', 'Peito de frango orgânico grelhado com ervas finas', 'principal', 'almoco',
   ARRAY['Peito de frango orgânico', 'Ervas finas', 'Limão', 'Azeite', 'Sal marinho'], 
   ARRAY[]::TEXT[], 
   '{"calories": 185, "protein": 31, "carbs": 0, "fat": 6}', 
   20, 200, 'disponivel'),
   
  ('Sanduíche Natural Integral', 'Sanduíche com pão integral e ingredientes frescos', 'principal', 'lanche',
   ARRAY['Pão integral', 'Peito de peru', 'Alface', 'Tomate', 'Queijo branco'], 
   ARRAY['Glúten', 'Lactose'], 
   '{"calories": 285, "protein": 18, "carbs": 28, "fat": 12}', 
   5, 100, 'disponivel'),
   
  ('Suco Natural Detox', 'Blend de frutas da estação com gengibre', 'bebida', 'lanche',
   ARRAY['Laranja', 'Maçã', 'Gengibre', 'Água'], 
   ARRAY[]::TEXT[], 
   '{"calories": 75, "protein": 1, "carbs": 18, "fat": 0}', 
   3, 150, 'disponivel');

-- Inserir livros de exemplo
INSERT INTO books (isbn, title, author, publisher, publication_year, category, description, total_copies, available_copies, location) VALUES
  ('978-85-16-04424-7', 'Dom Casmurro', 'Machado de Assis', 'Editora Ática', 2019, 'Literatura Brasileira', 'Clássico da literatura brasileira', 5, 5, 'Estante A1'),
  ('978-85-359-2340-1', 'O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Editora Globo', 2020, 'Literatura Infantojuvenil', 'Fábula sobre amizade e humanidade', 3, 3, 'Estante B2'),
  ('978-85-7448-633-7', 'Matemática - 9º Ano', 'José Ruy Giovanni', 'FTD', 2021, 'Didático', 'Livro didático de matemática', 30, 28, 'Estante C1'),
  ('978-85-16-11447-3', 'História do Brasil', 'Boris Fausto', 'Edusp', 2019, 'História', 'História do Brasil desde o descobrimento', 4, 4, 'Estante D1');

-- =======================
-- AUTENTICAÇÃO E 2FA
-- =======================

-- Função para criar perfil automaticamente quando usuário se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para criar perfil automaticamente
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Configurações adicionais para 2FA podem ser feitas no painel do Supabase
-- Vá em Authentication > Settings e ative:
-- - Email confirmations
-- - Phone confirmations (SMS)
-- - Multi-Factor Authentication (MFA)

-- =======================
-- VIEWS ÚTEIS
-- =======================

-- View para estatísticas de presença
CREATE OR REPLACE VIEW attendance_stats AS
SELECT 
  DATE_TRUNC('week', date) as week,
  COUNT(*) FILTER (WHERE status = 'presente') as present_count,
  COUNT(*) FILTER (WHERE status = 'ausente') as absent_count,
  COUNT(*) FILTER (WHERE status = 'atrasado') as late_count,
  ROUND(
    COUNT(*) FILTER (WHERE status = 'presente')::DECIMAL / 
    NULLIF(COUNT(*), 0) * 100, 2
  ) as attendance_percentage
FROM attendance
GROUP BY DATE_TRUNC('week', date)
ORDER BY week DESC;

-- View para cardápio ativo
CREATE OR REPLACE VIEW active_menu AS
SELECT 
  id, name, description, category, meal_type, 
  ingredients, allergens, nutritional_info,
  preparation_time, servings, status
FROM menu_items 
WHERE is_active = true
ORDER BY meal_type, category, name;

-- View para livros disponíveis
CREATE OR REPLACE VIEW available_books AS
SELECT 
  id, isbn, title, author, publisher, publication_year,
  category, description, total_copies, available_copies, location
FROM books 
WHERE is_active = true AND available_copies > 0
ORDER BY title;