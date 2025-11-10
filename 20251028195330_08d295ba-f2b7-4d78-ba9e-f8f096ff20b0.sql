-- CRITICAL SECURITY: Separate user roles table to prevent privilege escalation
-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'teacher', 'student', 'kitchen');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Only admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Migrate existing roles from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, role::app_role
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- Create storage bucket for avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for avatars
CREATE POLICY "Avatar images are publicly accessible"
ON storage.objects
FOR SELECT
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their own avatar"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can delete their own avatar"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Create menu_orders table for tracking student food selections
CREATE TABLE public.menu_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  student_name TEXT NOT NULL,
  menu_item TEXT NOT NULL,
  meal_type TEXT NOT NULL,
  order_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.menu_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own orders"
ON public.menu_orders
FOR SELECT
TO authenticated
USING (auth.uid() = student_id);

CREATE POLICY "Students can create their own orders"
ON public.menu_orders
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Kitchen and admin can view all orders"
ON public.menu_orders
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'kitchen') 
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Kitchen can update order status"
ON public.menu_orders
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'kitchen') OR public.has_role(auth.uid(), 'admin'));

-- Create kitchen_reports table
CREATE TABLE public.kitchen_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_date DATE NOT NULL,
  total_meals_served INTEGER DEFAULT 0,
  meals_by_type JSONB,
  ingredients_used JSONB,
  observations TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.kitchen_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Kitchen can create reports"
ON public.kitchen_reports
FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'kitchen'));

CREATE POLICY "Kitchen can update their reports"
ON public.kitchen_reports
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'kitchen') OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Kitchen and admin can view reports"
ON public.kitchen_reports
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'kitchen') 
  OR public.has_role(auth.uid(), 'admin')
);

-- Trigger for updated_at on kitchen_reports
CREATE TRIGGER update_kitchen_reports_updated_at
BEFORE UPDATE ON public.kitchen_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Update handle_new_user function to also create user_role
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  
  -- Insert user role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'student')
  );
  
  RETURN NEW;
END;
$function$;