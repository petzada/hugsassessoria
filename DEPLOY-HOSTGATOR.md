# Guia de Deploy - Hugs Assessoria na HostGator

## Visão Geral da Arquitetura

A aplicação Hugs Assessoria é composta por duas partes:

| Componente | Tecnologia | Onde fica hospedado |
|---|---|---|
| **Frontend** (Landing Page + Admin) | React (SPA estática) | **HostGator** |
| **Backend** (Banco de dados + Auth + Edge Functions) | Supabase (PostgreSQL) | **Supabase Cloud** (mantém no plano gratuito) |

> **O que vai para a HostGator?** Apenas os arquivos estáticos gerados pelo `npm run build` (pasta `dist/`). O Supabase continua rodando na nuvem e a comunicação é feita via API (HTTPS).

---

## Pré-Requisitos

- Node.js 18+ instalado na máquina local
- Acesso ao painel da HostGator (cPanel)
- Conta no Supabase (já existente do projeto Lovable)
- Domínio configurado na HostGator (ou usar o domínio temporário)

---

## Passo 1: Preparar o Supabase

### 1.1 Caso esteja criando um novo projeto Supabase

Se você precisa recriar o banco do zero (novo projeto Supabase):

1. Acesse [app.supabase.com](https://app.supabase.com) e crie um novo projeto
2. Após criação, vá em **SQL Editor** no menu lateral
3. Copie todo o conteúdo do arquivo `migration.sql` (na raiz do projeto)
4. Cole no SQL Editor e clique em **Run**
5. Anote as credenciais do novo projeto:
   - **Project URL**: `Settings > API > Project URL`
   - **Anon Key**: `Settings > API > Project API Keys > anon public`

### 1.2 Caso esteja usando o Supabase existente

Se o banco já está funcionando no Supabase que era usado pela Lovable, não precisa rodar a migração. Apenas certifique-se de que:

1. Acesse [app.supabase.com](https://app.supabase.com)
2. Selecione o projeto `tzlubugqyxyqwdvzhmdf`
3. Verifique se as tabelas `leads` e `user_roles` existem em **Table Editor**
4. Confirme suas credenciais em **Settings > API**

### 1.3 Criar o primeiro usuário Admin

1. No painel Supabase, vá em **Authentication > Users**
2. Clique em **Add User > Create New User**
3. Preencha o email e senha do administrador
4. Marque **Auto Confirm User**
5. Clique em **Create User**
6. Copie o **UUID** do usuário recém-criado
7. Vá em **SQL Editor** e execute:

```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('COLE-O-UUID-AQUI', 'admin');
```

---

## Passo 2: Configurar Variáveis de Ambiente

### 2.1 Atualizar o arquivo `.env`

Na raiz do projeto, edite o arquivo `.env` com as credenciais corretas:

```env
VITE_SUPABASE_URL="https://SEU-PROJECT-ID.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="SUA-ANON-KEY-AQUI"
```

> **Nota de segurança**: A `anon key` é uma chave pública (acessível pelo navegador). Ela é segura porque o Supabase protege os dados via **Row Level Security (RLS)**. Nunca exponha a `service_role key` no frontend.

---

## Passo 3: Build do Projeto

Execute os seguintes comandos no terminal, na pasta do projeto:

```bash
# 1. Instalar dependências
npm install

# 2. Gerar o build de produção
npm run build
```

Isso criará a pasta `dist/` com todos os arquivos estáticos otimizados:

```
dist/
  ├── index.html
  ├── assets/
  │   ├── index-XXXXX.js    (JavaScript bundled)
  │   ├── index-XXXXX.css   (CSS bundled)
  │   └── *.jpg / *.png     (imagens otimizadas)
  └── ...
```

---

## Passo 4: Configurar `.htaccess` para SPA

Como a aplicação usa React Router (rotas como `/admin`, `/admin/dashboard`), é necessário redirecionar todas as requisições para o `index.html`.

Crie o arquivo `.htaccess` **dentro da pasta `dist/`** após o build (ou na raiz `public_html` na HostGator):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Se o arquivo ou diretório existir, sirva diretamente
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d

  # Caso contrário, redirecione para index.html (SPA)
  RewriteRule ^ index.html [QSA,L]
</IfModule>

# Compressão GZIP para melhor performance
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json image/svg+xml
</IfModule>

# Cache de arquivos estáticos (assets com hash no nome)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Headers de segurança
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

> **Dica**: Para automatizar, crie o arquivo `public/.htaccess` no projeto. O Vite copia automaticamente tudo da pasta `public/` para `dist/` durante o build.

---

## Passo 5: Upload para a HostGator

### Opção A: Via Gerenciador de Arquivos (cPanel)

1. Acesse o **cPanel** da HostGator
2. Abra o **Gerenciador de Arquivos**
3. Navegue até `public_html/` (ou a pasta do seu domínio/subdomínio)
4. **Delete** todos os arquivos existentes na pasta (exceto `.htaccess` se já configurou)
5. Clique em **Upload**
6. Faça upload de **todos os arquivos e pastas** que estão dentro de `dist/`:
   - `index.html`
   - `assets/` (pasta inteira)
   - `.htaccess` (o que criamos no Passo 4)
7. Verifique se a estrutura ficou assim:

```
public_html/
  ├── .htaccess
  ├── index.html
  └── assets/
      ├── index-XXXXX.js
      ├── index-XXXXX.css
      └── ...
```

### Opção B: Via FTP (FileZilla ou similar)

1. Abra o FileZilla ou outro cliente FTP
2. Conecte com as credenciais FTP da HostGator:
   - **Host**: seu domínio ou IP do servidor
   - **Usuário**: seu usuário FTP (criado no cPanel)
   - **Senha**: sua senha FTP
   - **Porta**: 21
3. Navegue até `public_html/`
4. Faça upload de **todo o conteúdo** da pasta `dist/` (não a pasta `dist` em si, mas o que está dentro dela)
5. Inclua o `.htaccess`

### Opção C: Via Terminal SSH (se disponível no plano)

```bash
# Conectar via SSH
ssh usuario@seudominio.com.br

# Limpar a pasta pública
cd ~/public_html
rm -rf assets index.html

# Sair do SSH e, da sua máquina local, enviar via SCP:
scp -r dist/* usuario@seudominio.com.br:~/public_html/
scp dist/.htaccess usuario@seudominio.com.br:~/public_html/
```

---

## Passo 6: Configurar Domínio e SSL

### 6.1 Domínio Próprio

Se você tem um domínio próprio (ex: `hugsassessoria.com.br`):

1. No cPanel, vá em **Domínios** ou **Domains**
2. Verifique se o domínio está apontando para `public_html/`
3. Configure o DNS do domínio para apontar para o IP da HostGator:
   - **Tipo A**: `@` → IP do servidor HostGator
   - **Tipo CNAME**: `www` → `seudominio.com.br`

### 6.2 SSL (HTTPS)

1. No cPanel, vá em **SSL/TLS Status** ou **Let's Encrypt**
2. Selecione o domínio e clique em **Issue** ou **Instalar**
3. O certificado será instalado automaticamente
4. Para forçar HTTPS, adicione no início do `.htaccess`:

```apache
# Forçar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## Passo 7: Configurar Supabase para o Novo Domínio

Após o deploy, configure o Supabase para aceitar requisições do novo domínio:

1. Acesse o painel Supabase
2. Vá em **Authentication > URL Configuration**
3. Em **Site URL**, coloque: `https://seudominio.com.br`
4. Em **Redirect URLs**, adicione:
   - `https://seudominio.com.br`
   - `https://seudominio.com.br/**`
   - `https://www.seudominio.com.br`
   - `https://www.seudominio.com.br/**`

---

## Passo 8: Verificar o Deploy

Após o upload, teste cada funcionalidade:

### Checklist de Testes

- [ ] **Landing Page**: Acesse `https://seudominio.com.br` - deve carregar a página principal
- [ ] **Navegação**: Clique nos links do menu (Serviços, Sobre nós, Dúvidas, Contato) - deve fazer scroll suave
- [ ] **Formulário de Lead**: Preencha o formulário e envie - deve mostrar toast de sucesso
- [ ] **WhatsApp**: Clique no botão flutuante do WhatsApp - deve abrir o WhatsApp
- [ ] **Admin Login**: Acesse `https://seudominio.com.br/admin` - deve mostrar a tela de login
- [ ] **Admin Dashboard**: Faça login com as credenciais de admin - deve redirecionar para o dashboard
- [ ] **Visualizar Leads**: No dashboard, verifique se os leads aparecem na tabela
- [ ] **Filtros**: Teste os filtros de serviço e data
- [ ] **Exportar CSV**: Clique em "Exportar CSV" - deve baixar o arquivo
- [ ] **Logout**: Clique em "Sair" - deve redirecionar para o login
- [ ] **Rota 404**: Acesse `https://seudominio.com.br/pagina-inexistente` - deve mostrar a página 404
- [ ] **Responsividade**: Teste em celular/tablet - layout deve se adaptar
- [ ] **SSL**: Verifique se o cadeado HTTPS aparece no navegador

---

## Atualizações Futuras

Sempre que precisar atualizar o site:

```bash
# 1. Faça as alterações no código

# 2. Gere um novo build
npm run build

# 3. Faça upload da nova pasta dist/ para o public_html/
#    (substituindo os arquivos anteriores)
```

---

## Estrutura de Custos

| Serviço | Custo |
|---|---|
| HostGator (hospedagem) | Conforme seu plano contratado |
| Supabase (banco + auth) | Grátis (plano Free: 500MB DB, 50K auth users, 500MB storage) |
| Domínio (.com.br) | ~R$ 40/ano (se adquirido separadamente) |
| SSL (Let's Encrypt) | Grátis |

---

## Solução de Problemas

### Página em branco ao acessar o site
- Verifique se o `.htaccess` está presente no `public_html/`
- Verifique se o `mod_rewrite` está habilitado no Apache (HostGator habilita por padrão)
- Abra o console do navegador (F12) e verifique erros de carregamento de arquivos

### Erro ao enviar formulário (leads)
- Verifique se as variáveis de ambiente no `.env` estão corretas antes do build
- Confirme que o projeto Supabase está ativo e acessível
- Verifique no console do navegador se há erros de CORS

### Login admin não funciona
- Confirme que o usuário foi criado no Supabase Auth
- Confirme que o role `admin` foi inserido na tabela `user_roles`
- Verifique o Site URL nas configurações do Supabase Auth

### Rota /admin retorna 404
- O `.htaccess` com rewrite rules não está configurado corretamente
- Verifique se o arquivo está na raiz do `public_html/`

### Erro de CORS
- No Supabase, vá em **Settings > API** e verifique se o domínio está na lista permitida
- Adicione seu domínio nas **Redirect URLs** da autenticação

---

## Resumo dos Comandos

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento (localhost:8080)
npm run dev

# Gerar build de produção
npm run build

# Preview do build localmente
npm run preview
```
