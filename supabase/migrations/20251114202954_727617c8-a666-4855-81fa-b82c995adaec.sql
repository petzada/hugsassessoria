-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table for managing admin access
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create leads table to store form submissions
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  service VARCHAR(50) NOT NULL,
  installment_value VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on leads
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert leads (public form submission)
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Policy: Only admins can view leads
CREATE POLICY "Admins can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can update leads
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Only admins can delete leads
CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Policy: Admins can view user_roles
CREATE POLICY "Admins can view user_roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for leads table
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();