# Prompts para implementação de sistema de login com dois perfis (admin/user) em projeto de ateliers de móveis

## Versão 1 – Prompt genérico (antes de especificar stack)

> **Contexto do meu projeto:**  
> Tenho uma aplicação que gerencia **ateliers de conserto de móveis**. Já existem duas entidades implementadas:
> - `Atelie` (id, especialidadeEra, equipadoCompleto, areaOficinaM2, dataFundacao)
> - `Movel` (id, tipoMovel, dataInicioTrab, restaurado, horasHomem, atelieId)
>
> **O que eu preciso adicionar:**  
> Um sistema completo de **login e autenticação** com dois tipos de usuário:
> - **admin** (gerente do sistema, vê todos os ateliers e dados)
> - **user comum** (cliente que solicita orçamentos e acompanha reparos)
>
> Além disso, preciso criar a entidade **Ordem de Serviço**, pois ainda não existe no projeto.  
> As regras de negócio estão detalhadas abaixo.
>
> ---
>
> ### 1. Modelos de dados (adicione ao projeto)
>
> **Usuário (`User`)**  
> - id (int, PK)  
> - nome (string)  
> - email (string, único)  
> - senha_hash (string)  
> - role (enum: `'admin'` | `'user'`)  
> - created_at, updated_at (timestamp)
>
> **Ordem de Serviço (`OrdemServico`)**  
> - id (int, PK)  
> - cliente_id (int, FK → User.id)  
> - atelie_id (int, FK → Atelie.id)  
> - movel_id (int, FK → Movel.id, **opcional** – caso o cliente queira usar um móvel já cadastrado no atelier)  
> - descricao_problema (text)  
> - tipo_movel_informado (string – ex: "cadeira", "sofá") – para quando não houver movel_id  
> - status (enum: `'solicitado'`, `'em_orcamento'`, `'aprovado'`, `'em_reparo'`, `'concluido'`, `'cancelado'`)  
> - data_solicitacao (timestamp, default now)  
> - data_previsao_entrega (date, opcional)  
> - valor_orcamento (decimal, opcional)
>
> ---
>
> ### 2. Regras por tipo de usuário
>
> #### 👑 Admin (pode)
> - **CRUD completo** de qualquer `Atelie` (já existente)  
> - **CRUD completo** de qualquer `Movel` (já existente)  
> - **CRUD completo** de qualquer `OrdemServico` (incluindo alterar status e valor)  
> - **Listar todos os usuários** (exceto senha)  
> - **Promover ou rebaixar** usuários entre `user` e `admin` (não pode rebaixar o próprio se for o único admin)  
> - **Acessar um painel administrativo** (endpoint `/admin/dashboard`) com estatísticas e listagens completas
>
> #### 👤 User comum (cliente)
> - **Cadastrar-se** (role `user` automaticamente) e **fazer login**  
> - **Ver e editar seu próprio perfil** (nome, email, senha)  
> - **Listar todos os ateliers** (público) – ver detalhes de cada atelier  
> - **Listar todos os móveis cadastrados** (de todos os ateliers) – apenas leitura  
> - **Criar uma nova Ordem de Serviço** – escolhendo um `atelie_id` e opcionalmente um `movel_id` (se existir), ou informando o tipo do móvel manualmente  
> - **Listar apenas suas próprias ordens de serviço** (com filtro por `cliente_id`)  
> - **Cancelar uma ordem própria** desde que o status seja `'solicitado'` ou `'em_orcamento'`  
> - **Não pode** ver, editar ou deletar ordens de outros clientes  
> - **Não pode** acessar o painel administrativo nem gerenciar ateliers/móveis
>
> ---
>
> ### 3. Autenticação e segurança
>
> - Login via **e-mail + senha**  
> - Senhas armazenadas com **bcrypt**  
> - Sessão via **JWT** (token enviado no header `Authorization: Bearer <token>`)  
> - Endpoints protegidos por middleware que verifica o token e a role (`isAuth`, `isAdmin`)  
> - Rota pública: `POST /register`, `POST /login`  
> - Rota de perfil: `GET /me` (para usuário logado)  
> - Rota de logout: `POST /logout` (invalidação do token no client; idealmente usar blacklist ou apenas cliente descarta)
>
> ---
>
> ### 4. Endpoints esperados (API REST)
>
> | Método | Rota | Acesso | Descrição |
> |--------|------|--------|------------|
> | POST | `/register` | público | Cria novo user (role = 'user') |
> | POST | `/login` | público | Retorna JWT |
> | GET | `/me` | user, admin | Dados do próprio perfil |
> | PUT | `/me` | user, admin | Atualiza próprio perfil |
> | GET | `/users` | admin | Lista todos os usuários |
> | PUT | `/users/:id/role` | admin | Altera role de um usuário |
> | GET | `/ateliers` | user, admin | Lista todos os ateliers |
> | GET/POST/PUT/DELETE | `/ateliers/:id` | admin (full CRUD), user só GET | Gerenciar atelier |
> | GET | `/moveis` | user, admin | Lista todos os móveis |
> | POST/PUT/DELETE | `/moveis/:id` | admin | Gerenciar móveis |
> | GET | `/ordens` | admin (todas), user (apenas as suas) | Listar ordens de serviço |
> | POST | `/ordens` | user | Criar nova ordem de serviço |
> | GET/PUT/DELETE | `/ordens/:id` | admin (qualquer), user (apenas sua e com restrições de status) | Ver, atualizar, cancelar |
> | GET | `/admin/dashboard` | admin | Estatísticas |
>
> ---
>
> ### 5. Seed inicial (já criar dados no banco)
>
> - **1 admin padrão:**  
>   nome: "Administrador", email: `admin@moveis.com`, senha: `admin123`, role: `admin`  
> - **2 user comuns:**  
>   nome: "João Silva", email: `joao@email.com`, senha: `123456`  
>   nome: "Maria Santos", email: `maria@email.com`, senha: `123456`  
> - **Pelo menos 2 ateliers existentes** (reaproveitar os que já estão no sistema, ou criar novos)  
> - **Alguns móveis e ordens de serviço** para teste
>
> ---
>
> ### 6. Observações técnicas
>
> - Utilize a mesma linguagem/stack do projeto atual.  
> - As classes `Atelie` e `Movel` já existem. **Não as altere** – apenas adicione os novos models e relacionamentos.  
> - Proteja todas as rotas com middlewares de autenticação e autorização.  
> - Forneça exemplos de requisição/resposta na documentação da API.

---

## Versão 2 – Prompt adaptado para stack específica (Node.js/NestJS + Angular + monorepo)

> **Contexto do projeto:**  
> Tenho uma aplicação **monorepo** gerenciada com `pnpm`.  
> - **Backend:** Node.js + NestJS 11 + TypeScript + TypeORM + SQLite + OpenAPI (Swagger)  
> - **Frontend:** Angular 20 standalone + TailwindCSS com SCSS + Signals para estado reativo + Reactive Forms obrigatório para todos os formulários  
>
> Já existem duas entidades implementadas no backend:
> - `Atelie` (id, especialidadeEra, equipadoCompleto, areaOficinaM2, dataFundacao)
> - `Movel` (id, tipoMovel, dataInicioTrab, restaurado, horasHomem, atelieId)
>
> **O que deve ser adicionado:**  
> Um sistema completo de **login e autenticação** com dois tipos de usuário:  
> - `admin` (gerente, vê todos os ateliers e dados)  
> - `user` (cliente que solicita orçamentos e acompanha reparos)  
>
> Além disso, criar a entidade **Ordem de Serviço** (não existe ainda) e implementar todas as regras de negócio, incluindo a restrição: **apenas admin pode criar novos usuários** (não há cadastro público).
>
> ---
>
> ### 1. Backend – Novos modelos e regras (NestJS + TypeORM)
>
> **Modelo `User`**  
> ```typescript
> // src/users/user.entity.ts
> @Entity()
> export class User {
>   @PrimaryGeneratedColumn()
>   id: number;
>
>   @Column()
>   nome: string;
>
>   @Column({ unique: true })
>   email: string;
>
>   @Column()
>   senha_hash: string;
>
>   @Column({ type: 'enum', enum: ['admin', 'user'] })
>   role: 'admin' | 'user';
>
>   @CreateDateColumn()
>   created_at: Date;
>
>   @UpdateDateColumn()
>   updated_at: Date;
> }
> ```
>
> **Modelo `OrdemServico`**  
> ```typescript
> @Entity()
> export class OrdemServico {
>   @PrimaryGeneratedColumn()
>   id: number;
>
>   @ManyToOne(() => User)
>   @JoinColumn({ name: 'cliente_id' })
>   cliente: User;
>   @Column()
>   cliente_id: number;
>
>   @ManyToOne(() => Atelie)
>   @JoinColumn({ name: 'atelie_id' })
>   atelie: Atelie;
>   @Column()
>   atelie_id: number;
>
>   @ManyToOne(() => Movel, { nullable: true })
>   @JoinColumn({ name: 'movel_id' })
>   movel?: Movel;
>   @Column({ nullable: true })
>   movel_id?: number;
>
>   @Column('text')
>   descricao_problema: string;
>
>   @Column()
>   tipo_movel_informado: string; // usado se movel_id for nulo
>
>   @Column({ type: 'enum', enum: ['solicitado', 'em_orcamento', 'aprovado', 'em_reparo', 'concluido', 'cancelado'], default: 'solicitado' })
>   status: string;
>
>   @CreateDateColumn()
>   data_solicitacao: Date;
>
>   @Column({ type: 'date', nullable: true })
>   data_previsao_entrega?: Date;
>
>   @Column('decimal', { precision: 10, scale: 2, nullable: true })
>   valor_orcamento?: number;
> }
> ```
>
> **Regras de acesso (importantes)**  
> - **Apenas admin pode criar usuários** (não existe `POST /register` público).  
> - Admin pode criar qualquer usuário (tanto `user` quanto `admin`).  
> - **Seed inicial:** Criar um admin com email `atelie@gmail.com` e senha `123456`.  
> - Usuários comuns (`user`) só podem ser criados pelo admin.  
>
> **Demais regras já definidas anteriormente** (listagem de ateliers, ordens de serviço, permissões) – resumo:
> - Admin: CRUD completo de Atelie, Movel, OrdemServico, Usuários. Acessa dashboard.
> - User: ver ateliers/móveis, criar ordens (só para si), listar suas ordens, cancelar ordens em status inicial.
>
> **Autenticação:** JWT via `@nestjs/jwt`. Middleware global de autenticação e guard de roles (`@Roles('admin')`).
>
> **Endpoints obrigatórios (NestJS – decorators padrão):**  
> - `POST /login` (público) – retorna JWT  
> - `GET /me` (user+admin)  
> - `PUT /me` (user+admin) – atualizar próprio perfil  
> - `GET /users` (admin)  
> - `POST /users` (admin) – criar novo usuário (qualquer role)  
> - `PUT /users/:id/role` (admin)  
> - CRUD de ateliers e móveis (admin full, user apenas GET)  
> - `GET /ordens` (admin = todas, user = apenas suas)  
> - `POST /ordens` (user) – cliente_id preenchido automaticamente pelo token  
> - `PUT /ordens/:id` (admin: qualquer; user: apenas suas e só pode cancelar se status `solicitado` ou `em_orcamento`)  
> - `DELETE /ordens/:id` (admin apenas)
>
> **Documentação Swagger:** Todos os DTOs e controllers devem estar anotados com `@ApiTags`, `@ApiBearerAuth`, etc.
>
> ---
>
> ### 2. Frontend – Angular 20 standalone (Reactive Forms + Signals)
>
> **Estrutura esperada:**  
> - Páginas standalone (Login, DashboardAdmin, MinhasOrdens, CriarOrdem, ListaAteliers, etc.)  
> - Serviços de autenticação (`AuthService` com Signals para estado do usuário logado)  
> - Interceptor HTTP para adicionar token JWT  
> - Guards para rotas (`canActivate` baseado em role)
>
> **Requisitos obrigatórios:**  
> - **Todos os formulários** devem usar `ReactiveFormsModule` (ex: login, criação de ordem, edição de perfil, criação de usuário pelo admin).  
> - **Estado compartilhado** gerenciado com `Signal` (ex: `userSignal`, `ordensSignal`). Evitar RxJS Subjects para estado global – usar `signal`, `computed`, `effect` quando necessário.  
> - Estilos com **TailwindCSS + SCSS** (arquivos `.scss` usando `@apply` ou classes utilitárias).  
> - Uso de `pnpm` para instalar dependências (Angular 20, @angular/cli, tailwindcss, etc.).
>
> **Telas mínimas:**  
> - **Login:** e-mail + senha. Ao logar, redireciona para `/dashboard` se admin ou `/minhas-ordens` se user.  
> - **Painel do admin** (somente admin):  
>   - Listagem de todos os usuários (com botão criar novo usuário)  
>   - Listagem de todas as ordens de serviço (com filtros por status/atelier)  
>   - CRUD de ateliers e móveis (formulários reativos)  
> - **Área do user comum:**  
>   - Lista de ateliers (públicos)  
>   - Lista de suas ordens (com status e opção de cancelar se permitido)  
>   - Formulário para criar nova ordem (selecionar atelier, movel ou digitar tipo, descrever problema)  
>   - Editar perfil próprio  
> - **Navbar condicional** (botões de logout, perfil, etc.) conforme role.
>
> **Tratamento de erros:** Exibir mensagens amigáveis (ex: login inválido, permissão negada) – usar `catchError` e signals de erro.
>
> **Integração com backend:**  
> - Base URL configurável (`environment.ts`).  
> - Tipagem das respostas (interfaces geradas ou manuais).  
> - Usar `HttpClient` do Angular.
>
> ---
>
> ### 3. Seed e regra especial de criação de usuários
>
> - No backend, **criar um script de seed** (ex: `src/seeds/seed.ts`) que:  
>   - Verifica se existe um admin com email `atelie@gmail.com`.  
>   - Se não existir, cria com senha `123456` (hash com bcrypt) e role `admin`.  
> - Nenhum outro usuário é criado automaticamente.  
> - **Apenas admin** pode acessar `POST /users` para adicionar novos usuários (tanto `user` quanto `admin`).  
> - No frontend admin, um botão "Novo usuário" abre um formulário reativo com campos: nome, email, senha, role (admin/user).
>
> ---
>
> ### 4. Organização do monorepo (pnpm)
>
> - Estrutura sugerida:  
> ```
> /packages
>   /backend   (NestJS)
>   /frontend  (Angular)
> /pnpm-workspace.yaml
> ```
> - Scripts no `package.json` raiz para rodar ambos (ex: `pnpm run start:backend`, `pnpm run start:frontend`).
> - Compartilhar tipos? (opcional – se quiser, criar um `shared/types`). Não obrigatório.
>
> ---
>
> **Entregável final:**  
> Código funcional do backend e frontend respeitando:
> - Autenticação JWT com dois papéis  
> - Novas entidades (`User`, `OrdemServico`)  
> - Regra **"apenas admin cria usuários"**  
> - Seed com admin `atelie@gmail.com` / `123456`  
> - Todas as permissões descritas  
> - Angular com Reactive Forms e Signals, Tailwind+SCSS  
> - Documentação Swagger no backend  
>
> **Não precisa** criar testes automatizados, mas o código deve seguir o padrão Clean Code as boas práticas de cada framework.