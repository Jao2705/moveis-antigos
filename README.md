# moveisantigosv2 - Monorepo

Sistema academico de gerenciamento de **Atelies de Restauracao de Moveis Antigos**, com backend NestJS 11 e frontend Angular 20.

## Estrutura

```text
moveisantigosv2/
├── apps/
│   ├── backend/     # NestJS 11 + TypeORM + SQLite
│   └── frontend/    # Angular 20 Standalone
├── packages/
│   ├── utils/               # Tipos compartilhados
│   ├── typescript-config/   # tsconfig base
│   └── eslint-config/       # ESLint compartilhado
├── specs/           # Documentacao tecnica
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## Integrantes

- Joao Vitor Freitas Araujo
- Alex Henrique Borges Alexandre

## Como executar

```bash
pnpm install
pnpm dev
```

Backend: `http://localhost:3000`
Frontend: `http://localhost:4200`
Swagger: `http://localhost:3000/swagger-ui`

## Variaveis de ambiente

O arquivo `.env.example` esta na raiz do monorepo e documenta as variaveis usadas pelo backend.

Para o frontend, a URL da API esta configurada em `apps/frontend/src/environments/environment.ts`.

### Credenciais padrao do administrador

Copie o `.env.example` da raiz para `apps/backend/.env` e ajuste, se necessario:

- E-mail: `admin@moveisantigos.com`
- Senha: `admin123`

## Endpoints principais da API

### Auth

```bash
POST /auth/register
Content-Type: application/json

{
  "nome": "Maria Silva",
  "email": "maria@exemplo.com",
  "senha": "123456"
}
```

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "maria@exemplo.com",
  "senha": "123456"
}
```

### Atelie

```bash
GET /atelie
Authorization: Bearer <token>
```

```bash
POST /atelie
Authorization: Bearer <token>
Content-Type: application/json

{
  "especialidadeEra": "Art Deco",
  "dataFundacao": "2020-01-10",
  "equipadoCompleto": true,
  "areaOficinaM2": 80
}
```

```bash
PUT /atelie/1
Authorization: Bearer <token>
Content-Type: application/json

{
  "equipadoCompleto": false,
  "areaOficinaM2": 60
}
```

### Movel

```bash
GET /movel
Authorization: Bearer <token>
```

```bash
POST /movel
Authorization: Bearer <token>
Content-Type: application/json

{
  "tipoMovel": "Mesa de jantar vitoriana",
  "dataInicioTrab": "2024-02-01",
  "restaurado": false,
  "horasHomem": 40,
  "atelieId": 1
}
```

```bash
DELETE /movel/1
Authorization: Bearer <token>
```

### Users

```bash
GET /users
Authorization: Bearer <token>
```

```bash
PATCH /users/1/activate
Authorization: Bearer <token>
Content-Type: application/json

{
  "ativo": true
}
```

## Funcionalidades

### Backend

- CRUD de Atelie (entidade pai) e Movel (entidade filho)
- Autenticacao JWT (`POST /auth/login`, `POST /auth/register`)
- Usuarios com campo `ativo` (cadastro aguarda liberacao do admin)
- Guards JWT + roles em todas as rotas de negocio
- Filtro global de excecoes com `{ statusCode, message, timestamp, errors? }`
- Seed automatico do administrador inicial

### Frontend

- Login, cadastro, dashboard protegido
- CRUD de atelies e moveis
- Gestao de usuarios (`/admin/users`)
- JWT em memoria (Signals), interceptor HTTP, AuthGuard
- TailwindCSS, Reactive Forms, lazy loading por feature

## Testes

```bash
pnpm test
```
