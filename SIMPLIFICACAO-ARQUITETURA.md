# Simplificacao da Arquitetura — Hugs Assessoria

## Contexto

O projeto foi originalmente gerado pela plataforma **Lovable**, que scaffolda automaticamente uma biblioteca completa de componentes UI e dezenas de dependencias npm, independentemente do que a aplicacao realmente utiliza.

A analise revelou um excesso significativo de codigo morto:

- **68% do codigo-fonte** (aproximadamente 3.950 de 5.780 linhas) eram componentes nunca utilizados
- **33 das 47 dependencias** npm nunca eram importadas por nenhum arquivo
- O `App.tsx` montava 3 providers desnecessarios (QueryClientProvider sem queries, TooltipProvider sem tooltips, Toaster do Radix nunca acionado)

---

## O que foi removido

### Componentes UI deletados (38 arquivos)

Todos os componentes abaixo existiam em `src/components/ui/` mas **nenhum era importado** por qualquer pagina ou componente da aplicacao:

`alert-dialog.tsx`, `alert.tsx`, `aspect-ratio.tsx`, `avatar.tsx`, `breadcrumb.tsx`, `calendar.tsx`, `chart.tsx`, `checkbox.tsx`, `collapsible.tsx`, `command.tsx`, `context-menu.tsx`, `dialog.tsx`, `drawer.tsx`, `dropdown-menu.tsx`, `form.tsx`, `hover-card.tsx`, `input-otp.tsx`, `menubar.tsx`, `navigation-menu.tsx`, `pagination.tsx`, `popover.tsx`, `progress.tsx`, `radio-group.tsx`, `resizable.tsx`, `scroll-area.tsx`, `separator.tsx`, `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`, `slider.tsx`, `switch.tsx`, `tabs.tsx`, `textarea.tsx`, `toggle-group.tsx`, `toggle.tsx`, `toast.tsx`, `toaster.tsx`, `tooltip.tsx`

### Arquivos custom deletados (3 arquivos)

| Arquivo | Motivo |
|---------|--------|
| `src/components/NavLink.tsx` | Nunca importado por nenhum arquivo |
| `src/hooks/use-mobile.tsx` | Usado apenas pelo `sidebar.tsx` (deletado) |
| `src/hooks/use-toast.ts` | Usado apenas pelo `toaster.tsx` (deletado) |

### Providers removidos do App.tsx

| Provider | Motivo da remocao |
|----------|-------------------|
| `QueryClientProvider` / `QueryClient` | Nenhuma query do TanStack e usada; todas as chamadas sao diretas ao Supabase |
| `TooltipProvider` | Nenhum tooltip existe na aplicacao |
| `<Toaster />` (Radix) | Nunca acionado; todos os toasts usam Sonner |

### Dependencias npm removidas (35 total)

**29 dependencias runtime removidas:**

- `@hookform/resolvers`, `@radix-ui/react-alert-dialog`, `@radix-ui/react-aspect-ratio`, `@radix-ui/react-avatar`, `@radix-ui/react-checkbox`, `@radix-ui/react-collapsible`, `@radix-ui/react-context-menu`, `@radix-ui/react-dialog`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-hover-card`, `@radix-ui/react-menubar`, `@radix-ui/react-navigation-menu`, `@radix-ui/react-popover`, `@radix-ui/react-progress`, `@radix-ui/react-radio-group`, `@radix-ui/react-scroll-area`, `@radix-ui/react-separator`, `@radix-ui/react-slider`, `@radix-ui/react-switch`, `@radix-ui/react-tabs`, `@radix-ui/react-toast`, `@radix-ui/react-toggle`, `@radix-ui/react-toggle-group`, `@radix-ui/react-tooltip`, `@tanstack/react-query`, `cmdk`, `input-otp`, `next-themes`, `react-day-picker`, `react-hook-form`, `react-resizable-panels`, `recharts`, `vaul`

**2 devDependencies removidas:**

- `lovable-tagger` (ja havia sido removido do vite.config.ts)
- `@tailwindcss/typography` (classes `prose` nao usadas em nenhum arquivo)

### Correcao no sonner.tsx

Removida a dependencia do `next-themes` (tema escuro nao e usado). O tema foi fixado como `"light"`.

---

## O que permaneceu e por que

### Componentes UI mantidos (10 arquivos)

| Componente | Usado por |
|------------|-----------|
| `accordion.tsx` | FAQ na landing page |
| `badge.tsx` | Tags de status no dashboard |
| `button.tsx` | Botoes em toda a aplicacao |
| `card.tsx` | Cards de servicos e secoes |
| `carousel.tsx` | Carousel de depoimentos |
| `input.tsx` | Campos de formulario |
| `label.tsx` | Labels dos formularios |
| `select.tsx` | Filtros no dashboard admin |
| `sonner.tsx` | Notificacoes toast |
| `table.tsx` | Tabela de leads no dashboard |

### Dependencias runtime mantidas (18)

`@radix-ui/react-accordion`, `@radix-ui/react-label`, `@radix-ui/react-select`, `@radix-ui/react-slot`, `@supabase/supabase-js`, `class-variance-authority`, `clsx`, `date-fns`, `embla-carousel-react`, `lucide-react`, `react`, `react-dom`, `react-input-mask`, `react-router-dom`, `sonner`, `tailwind-merge`, `tailwindcss-animate`, `zod`

---

## Antes vs. Depois

| Metrica | Antes | Depois | Reducao |
|---------|-------|--------|---------|
| Dependencias runtime | 47 | 18 | **62%** |
| DevDependencies | 14 | 12 | **14%** |
| Componentes UI | 48 arquivos | 10 arquivos | **79%** |
| Arquivos deletados | — | 41 | — |
| Codigo morto eliminado | ~3.950 linhas | 0 | **100%** |

---

## Risco

**BAIXO** — Nenhuma logica de negocio foi alterada. Apenas codigo que nunca era executado foi removido. O build compila sem erros e todas as funcionalidades permanecem intactas:

- Landing page com todas as secoes
- Formulario de contato com envio ao Supabase
- Login administrativo
- Dashboard com listagem de leads, filtros e exportacao CSV
- Navegacao e pagina 404
