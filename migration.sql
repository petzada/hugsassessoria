-- ============================================================================
-- HUGS ASSESSORIA - Migração SQL Completa
-- ============================================================================
-- Este arquivo consolida toda a estrutura do banco de dados necessária
-- para o projeto Hugs Assessoria.
--
-- IMPORTANTE: Este SQL é executado no Supabase (PostgreSQL).
-- Caso esteja recriando o projeto em uma nova instância Supabase,
-- execute este script no SQL Editor do painel Supabase.
-- ============================================================================

-- ============================================================================
-- 1. EXTENSÕES NECESSÁRIAS
-- ============================================================================
-- O Supabase já vem com pgcrypto habilitado por padrão (gen_random_uuid).
-- Caso necessário, descomente a linha abaixo:
-- CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================================
-- 2. ENUM DE ROLES
-- ============================================================================
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'user');
  END IF;
END$$;

-- ============================================================================
-- 3. TABELA: user_roles
-- ============================================================================
-- Gerencia os papéis (roles) dos usuários autenticados via Supabase Auth.
-- Um usuário pode ter múltiplos roles, mas a combinação (user_id, role) é única.

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

-- ============================================================================
-- 4. TABELA: leads
-- ============================================================================
-- Armazena os leads capturados pelo formulário da landing page.
-- Campos:
--   name             - Nome completo do lead
--   phone            - Telefone no formato (XX) XXXXX-XXXX
--   email            - E-mail do lead
--   service          - Tipo de serviço: 'veiculo', 'imovel', 'pessoal'
--   installment_value - Valor da parcela formatado (ex: "R$ 1500")
--   created_at       - Data de criação (automático)
--   updated_at       - Data de última atualização (automático via trigger)

CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL,
  service VARCHAR(50) NOT NULL,
  installment_value VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ============================================================================
-- 5. FUNÇÃO: has_role
-- ============================================================================
-- Função auxiliar usada nas políticas RLS para verificar se um usuário
-- possui determinado role. Utiliza SECURITY DEFINER para bypassar RLS
-- durante a verificação (evita loop infinito de checagem).

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

-- ============================================================================
-- 6. FUNÇÃO + TRIGGER: updated_at automático
-- ============================================================================
-- Atualiza automaticamente o campo updated_at da tabela leads
-- sempre que um registro é modificado.

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Remove trigger existente para evitar duplicação
DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;

CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- 7. ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Habilitar RLS nas tabelas
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- 7.1 POLÍTICAS: leads
-- ============================================================================

-- Qualquer pessoa (anônima ou autenticada) pode inserir leads (formulário público)
DROP POLICY IF EXISTS "Anyone can insert leads" ON public.leads;
CREATE POLICY "Anyone can insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Apenas admins podem visualizar leads
DROP POLICY IF EXISTS "Admins can view all leads" ON public.leads;
CREATE POLICY "Admins can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Apenas admins podem atualizar leads
DROP POLICY IF EXISTS "Admins can update leads" ON public.leads;
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Apenas admins podem deletar leads
DROP POLICY IF EXISTS "Admins can delete leads" ON public.leads;
CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- 7.2 POLÍTICAS: user_roles
-- ============================================================================

-- Admins podem visualizar roles
DROP POLICY IF EXISTS "Admins can view user_roles" ON public.user_roles;
CREATE POLICY "Admins can view user_roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Service role pode inserir roles (usado pela Edge Function create-admin)
DROP POLICY IF EXISTS "Service role can insert roles" ON public.user_roles;
CREATE POLICY "Service role can insert roles"
ON public.user_roles
FOR INSERT
TO service_role
WITH CHECK (true);

-- Admins podem atualizar roles
DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
CREATE POLICY "Admins can update roles"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Admins podem deletar roles
DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can delete roles"
ON public.user_roles
FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- ============================================================================
-- 8. CRIAÇÃO DO PRIMEIRO ADMIN (OPCIONAL)
-- ============================================================================
-- Após criar um usuário pelo Supabase Auth (Dashboard > Authentication > Users),
-- insira o role de admin com o comando abaixo, substituindo o UUID:
--
-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('SEU-USER-UUID-AQUI', 'admin');
--
-- Você pode encontrar o UUID do usuário no painel Supabase:
-- Dashboard > Authentication > Users > Clique no usuário > Copie o UUID
-- ============================================================================
