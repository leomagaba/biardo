-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table for user information
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  email text NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL,
  avatar_url text,
  phone text,
  class text,
  subject text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  enrollment_date date DEFAULT CURRENT_DATE
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Usuários podem ver próprio perfil" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar próprio perfil" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id);

CREATE POLICY "Admins podem ver todos os perfis" 
ON public.profiles 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role = 'admin'
));

-- Create students table
CREATE TABLE public.students (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id),
  student_number text NOT NULL,
  class text NOT NULL,
  grade_level integer NOT NULL,
  birth_date date,
  address text,
  parent_name text,
  parent_email text,
  parent_phone text,
  allergies text[],
  lunch_preferences text[],
  medical_notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Estudantes podem ver próprios dados" 
ON public.students 
FOR SELECT 
USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'teacher')
  )
);

-- Create teachers table
CREATE TABLE public.teachers (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id),
  employee_number text NOT NULL,
  subjects text[] NOT NULL,
  classes text[] NOT NULL,
  department text,
  qualification text,
  hire_date date NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- Create books table
CREATE TABLE public.books (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  title text NOT NULL,
  author text NOT NULL,
  isbn text,
  category text NOT NULL,
  publisher text,
  publication_year integer,
  description text,
  location text,
  total_copies integer NOT NULL DEFAULT 1,
  available_copies integer NOT NULL DEFAULT 1,
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ver livros" 
ON public.books 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Biblioteca e admins podem gerenciar livros" 
ON public.books 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role IN ('admin', 'library')
));

-- Create menu_items table
CREATE TABLE public.menu_items (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  name text NOT NULL,
  description text,
  meal_type text NOT NULL,
  ingredients text[] NOT NULL,
  allergens text[],
  category text NOT NULL,
  nutritional_info jsonb,
  preparation_time integer,
  servings integer,
  price numeric,
  image_url text,
  status text DEFAULT 'disponivel',
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem ver cardápio" 
ON public.menu_items 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Cozinha e admins podem gerenciar cardápio" 
ON public.menu_items 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM public.profiles 
  WHERE id = auth.uid() AND role IN ('admin', 'kitchen')
));

-- Create attendance table
CREATE TABLE public.attendance (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id uuid REFERENCES public.students(id),
  date date NOT NULL,
  status text NOT NULL,
  arrival_time time,
  recorded_by uuid REFERENCES public.profiles(id),
  notes text,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ver presença própria ou se for professor/admin" 
ON public.attendance 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.students s 
    WHERE s.id = attendance.student_id AND s.user_id = auth.uid()
  ) OR 
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role IN ('admin', 'teacher')
  )
);

-- Create grades table
CREATE TABLE public.grades (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_id uuid REFERENCES public.students(id),
  teacher_id uuid REFERENCES public.teachers(id),
  subject text NOT NULL,
  assignment_name text NOT NULL,
  grade numeric NOT NULL,
  max_grade numeric NOT NULL DEFAULT 10.00,
  date date NOT NULL DEFAULT CURRENT_DATE,
  semester integer NOT NULL,
  year integer NOT NULL DEFAULT EXTRACT(year FROM CURRENT_DATE),
  notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;

-- Create system_settings table
CREATE TABLE public.system_settings (
  id uuid NOT NULL DEFAULT uuid_generate_v4() PRIMARY KEY,
  key text NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_by uuid REFERENCES public.profiles(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.system_settings ENABLE ROW LEVEL SECURITY;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON public.students
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at
  BEFORE UPDATE ON public.teachers
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_books_updated_at
  BEFORE UPDATE ON public.books
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_grades_updated_at
  BEFORE UPDATE ON public.grades
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON public.system_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
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
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();