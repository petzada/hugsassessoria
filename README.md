# Hugs Assessoria

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-blue) ![Licença](https://img.shields.io/badge/licen%C3%A7a-MIT-green) ![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black) ![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

Site institucional da **Hugs Assessoria**, especializada em **revisão de juros abusivos** em financiamentos de veículos, imóveis e empréstimos: apresenta os serviços e capta contatos de clientes.

## Status do projeto

🔵 **Concluído**: o site foi entregue e publicado; o último commit (fevereiro de 2026) removeu código sem uso.

## Demonstração

**Página pública** (landing page)
- Hero com chamada principal, seções **Sobre**, **Serviços** e **Benefícios**.
- **Depoimentos** em carrossel e **perguntas frequentes**.
- Formulário de contato com máscara de telefone e **botão flutuante do WhatsApp**.

**Área administrativa** (`/admin`)
- Login de administrador e painel com os contatos recebidos pelo formulário.
- Admins criados por uma Edge Function do Supabase (`create-admin`).

## Tecnologias utilizadas

- **React 18** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** (Radix), Embla Carousel
- **React Router**, **Zod**
- **Supabase** (banco, autenticação e Edge Functions)
- Hospedagem estática na **HostGator** (Apache com `.htaccess`)

## Pré-requisitos e instalação

**Pré-requisitos**

- **Node.js 18** ou superior e npm
- Um projeto Supabase (já referenciado no `.env` do repositório, com chaves públicas de front-end)

**Instalação**

```bash
git clone https://github.com/petzada/hugsassessoria.git
cd hugsassessoria
npm install
```

Para usar outro projeto Supabase, troque `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` e `VITE_SUPABASE_PROJECT_ID` no `.env` e rode `migration.sql` no SQL Editor.

## Como utilizar

```bash
npm run dev       # http://localhost:8080
npm run build     # gera a pasta dist/
npm run preview   # serve o build localmente
```

Para publicar na HostGator, envie o conteúdo de `dist/` para o `public_html` (o `.htaccess` em `public/` cuida das rotas do React Router). Passo a passo em [`DEPLOY-HOSTGATOR.md`](DEPLOY-HOSTGATOR.md).

## Testes

O projeto **não tem testes automatizados**. A verificação disponível é o lint:

```bash
npm run lint
```

## Contribuição

Contribuições são bem-vindas! Para propor uma melhoria:

1. Abra uma **issue** descrevendo o problema ou a ideia antes de começar algo grande.
2. Faça um **fork** e crie um branch a partir da `main`: `<tipo>/<nome-kebab>` (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`).
3. Use **commits semânticos** em português: `<tipo>(<escopo>): <descrição no imperativo>`.
4. Rode lint e testes antes de enviar (veja [Testes](#testes)).
5. Abra o **Pull Request** em *draft*, explicando o quê e o porquê. O merge é feito pelo autor.

Não inclua segredos (`.env`, chaves de API, tokens) em commits ou PRs.

## Licença

Distribuído sob a licença **MIT**, de código aberto. Isso significa que você **pode** usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e até vender cópias do código, inclusive em projetos comerciais, **desde que** mantenha o aviso de copyright e o texto da licença. O software é fornecido "no estado em que se encontra", **sem garantias**, e o autor não se responsabiliza por danos decorrentes do uso.

Texto completo em [`LICENSE`](LICENSE).

## Autor e contato

**Marcio Petigrosso** ("petzada"): idealização e desenvolvimento.

- GitHub: [@petzada](https://github.com/petzada)
- LinkedIn: [in/petigrosso](https://www.linkedin.com/in/petigrosso)
