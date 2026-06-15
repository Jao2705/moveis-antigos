# moveisantigosv2 — Monorepo

Sistema acadêmico de gerenciamento de **Ateliês de Restauração de Móveis Antigos**, com backend NestJS 11 e frontend Angular 20.

## Estrutura

```text
moveisantigosv2/
├── apps/
│   ├── backend/     # NestJS 11 + TypeORM + SQLite
│   └── dashboard/   # Angular 20 Standalone (frontend)
├── packages/
│   ├── utils/               # Tipos compartilhados
│   ├── typescript-config/   # tsconfig base
│   └── eslint-config/       # ESLint compartilhado
├── specs/           # Documentação técnica
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Integrantes

- João Vitor Freitas Araújo
- Alex Henrique Borges Alexandre

## Como executar

```bash
pnpm install
pnpm dev
```

Backend: `http://localhost:3000`  
Frontend: `http://localhost:4200`  
Swagger: `http://localhost:3000/swagger-ui`

### Credenciais padrão do administrador

Configure em `apps/backend/.env` (copie de `.env.example`):

- E-mail: `admin@moveisantigos.com`
- Senha: `admin123`

## Funcionalidades

### Backend

- CRUD de Ateliê (entidade pai) e Móvel (entidade filho)
- Autenticação JWT (`POST /auth/login`, `POST /auth/register`)
- Usuários com campo `ativo` (cadastro aguarda liberação do admin)
- Guards JWT + roles em todas as rotas de negócio
- Filtro global de exceções com `{ statusCode, message, timestamp, errors? }`
- Seed automático do administrador inicial

### Frontend

- Login, cadastro, dashboard protegido
- CRUD de ateliês e móveis (admin)
- Gestão de usuários (`/admin/users`)
- JWT em memória (Signals), interceptor HTTP, AuthGuard
- TailwindCSS, Reactive Forms, lazy loading por feature

## Testes

```bash
pnpm test
```
