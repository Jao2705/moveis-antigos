# Sistema de Autenticação e Ordens de Serviço

Este plano de implementação adiciona um sistema de login, perfis (Admin e User comuns), além do novo módulo de "Ordens de Serviço" à aplicação, conforme especificado no documento de implementação do usuário e seguindo os rígidos padrões arquiteturais definidos em `AGENT.md`.

## User Review Required
> [!IMPORTANT]
> **Adição de Dependências Backend**: Vamos instalar `@nestjs/jwt`, `@nestjs/passport`, `passport`, `passport-jwt`, `bcrypt` e suas respectivas tipagens para fazer o JWT funcionar perfeitamente com NestJS. Você está de acordo?
> **Adição de Dependências Frontend**: O `tailwindcss` e o `@angular/forms` já parecem presentes na aplicação, porém vamos reestruturar os components para seguir os padrões do Design System (como Container vs Presentational e uso de Signals em vez de RxJS Subjects) como estipulado.

## Proposed Changes

---

### Backend: Dependências e Configuração
Vamos adicionar e configurar as libs para autenticação via JWT e criptografia de senhas.

#### [MODIFY] apps/backend/package.json
Adicionar dependências de auth: `@nestjs/jwt`, `@nestjs/passport`, `passport-jwt`, `bcrypt` e tipagens.

---

### Backend: Módulo de Usuários (Users)
Estruturação seguindo Clean Architecture, similar ao módulo `Atelie`.

#### [NEW] apps/backend/src/users/domain/user.entity.ts
Classe de domínio de usuário contendo os campos básicos (`id`, `nome`, `email`, `senha_hash`, `role`).

#### [NEW] apps/backend/src/users/infrastructure/persistence/typeorm/user.orm-entity.ts
Mapeamento TypeORM (a entidade real do banco de dados).

#### [NEW] apps/backend/src/users/application/users.service.ts
Lógica de negócio para criar usuário (apenas via admin), listar, promover, etc.

#### [NEW] apps/backend/src/users/presentation/users.controller.ts
Endpoints expostos para o painel admin e a edição de próprio perfil (`/me`, `/users`).

---

### Backend: Módulo de Autenticação (Auth)
#### [NEW] apps/backend/src/auth/application/auth.service.ts
Serviço responsável por validar email e senha e gerar o token JWT.

#### [NEW] apps/backend/src/auth/presentation/auth.controller.ts
Endpoint `/login` (público) que retorna o JWT.

#### [NEW] apps/backend/src/auth/infrastructure/guards/jwt-auth.guard.ts
Guard responsável por proteger rotas privadas usando validação de JWT.

#### [NEW] apps/backend/src/auth/infrastructure/guards/roles.guard.ts
Guard customizado para verificar se o token do usuário pertence a um `admin` ou `user`. Decorator `@Roles('admin')`.

---

### Backend: Módulo de Ordem de Serviço
Estrutura clean architecture com relacionamentos `ManyToOne` para Usuário, Ateliê e Móvel.

#### [NEW] apps/backend/src/ordem-servico/infrastructure/persistence/typeorm/ordem-servico.orm-entity.ts
Entidade TypeORM da Ordem de Serviço, com status (`solicitado`, `em_orcamento`, etc), validações de preenchimento (`movel_id` vs `tipo_movel_informado`).

#### [NEW] apps/backend/src/ordem-servico/application/ordem-servico.service.ts
Regras de validação (usuário comum só pode visualizar suas próprias ordens, só pode cancelar se estiver em status `solicitado` ou `em_orcamento`).

#### [NEW] apps/backend/src/ordem-servico/presentation/ordem-servico.controller.ts
Endpoints com guards corretos (Admin full, User próprio). O controller de criação (`POST`) vai extrair o ID do usuário do JWT (não pelo payload da requisição).

---

### Backend: Ajustes Finais e Seeding
Proteger módulos existentes e garantir administrador inicial.

#### [MODIFY] apps/backend/src/atelie/presentation/atelie.controller.ts
Adicionar guards de autenticação e proteção de rotas (Admin CRUD, Users apenas listam).

#### [MODIFY] apps/backend/src/movel/presentation/movel.controller.ts
Proteger rotas de gerência para permitir apenas Admin.

#### [NEW] apps/backend/src/shared/database/seeder.service.ts
Um mecanismo inicial que cria o usuário `atelie@gmail.com` com senha `123456` e role `admin` caso não existam usuários no banco no processo de OnModuleInit do app.

---

### Frontend: Autenticação e Core
Uso de Angular standalone, Tailwind, e Signals.

#### [NEW] apps/dashboard/src/app/core/auth.service.ts
Service que lidará com requisição para `/login`, persistência do token via `localStorage`, e proverá um Signal com o usuário ativo: `userSignal = signal<User | null>(null)`.

#### [NEW] apps/dashboard/src/app/core/auth.interceptor.ts
Adiciona o header `Authorization: Bearer <token>` para a API.

#### [NEW] apps/dashboard/src/app/core/auth.guard.ts
Redireciona usuários sem sessão para o `/login`, e bloqueia rotas admin para usuários comuns.

---

### Frontend: Páginas e Componentes

#### [NEW] apps/dashboard/src/app/features/login/login.component.ts
Página com Reactive Forms (Email e Senha).

#### [NEW] apps/dashboard/src/app/features/admin/users/users-list.component.ts
Lista de usuários para o admin.

#### [NEW] apps/dashboard/src/app/features/admin/users/user-create-form.component.ts
Formulário para admin cadastrar novos usuários e admins.

#### [NEW] apps/dashboard/src/app/features/shared/layout/navbar.component.ts
Navegação condicional baseada no `userSignal`. 

#### [NEW] apps/dashboard/src/app/features/ordens/ordens-list.component.ts
Listagem (Aba Admin vê todas, aba User vê próprias).

#### [NEW] apps/dashboard/src/app/features/ordens/ordem-create-form.component.ts
Formulário de nova ordem, selecionando os ateliers existentes.

## Verification Plan

### Automated Tests
Iremos verificar manualmente no primeiro passo da UI, mas poderemos rodar:
- `pnpm test` no backend para garantir que as rotas existentes não quebrem (ou possamos consertá-las frente à nova segurança).
- Testes unitários para a restrição de "Apenas clientes donos de uma ordem podem cancelá-la".

### Manual Verification
1. Subiremos a aplicação (Backend + Frontend).
2. O sistema inserirá no banco o admin padrão.
3. Fazer Login como `atelie@gmail.com` e checar recebimento do JWT e armazenagem no signal.
4. Criar um novo usuário do tipo "user comum" na dashboard admin.
5. Fazer login como o usuário comum, verificar o acesso limitado e abrir uma Nova Ordem de Serviço.
6. Cancelar a Ordem de Serviço gerada e tentar cancelar/editar ordens de outros para confirmar restrição 403 Forbidden.
