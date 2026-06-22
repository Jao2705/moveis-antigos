# Objetivos do projeto:

* Configurar e trabalhar com uma estrutura de monorepo usando Turborepo e pnpm workspaces.  
* Migrar um projeto NestJS existente para um monorepo sem perda de funcionalidade.  
* Implementar autenticação stateless com JWT e Passport no NestJS (login, cadastro, guards).  
* Proteger rotas do backend com Guards de autenticação.  
* Desenvolver uma aplicação Angular 20 com componentes Standalone.  
* Utilizar Signals e Reactive Forms no Angular para gerenciamento de estado e formulários.  
* Aplicar TailwindCSS para estilização consistente e responsiva.  
* Criar rotas protegidas no Angular com AuthGuard.  
* Integrar o frontend ao backend via HttpClient, com interceptor para tokens JWT.  
* Manter um repositório Git com histórico de commits organizado e documentação clara.

# **ESTRUTURA DO MONOREPO**

monorepo-ueg/  
├── apps/  
│ ├── backend/ \# NestJS 11 (migrado da 1VA)  
│ └── frontend/ \# Angular 20 Standalone  
├── packages/  
│ ├── utils/ \# Tipos e utilitários compartilhados  
│ ├── typescript-config/ \# tsconfig base compartilhado  
│ └── eslint-config/ \# ESLint compartilhado  
├── .agents/  
│ ├── rules/ \# Regras para agentes de IA  
│ └── skills/ \# Skills do workspace  
├── specs/ \# Documentação técnica e de negócio  
├── turbo.json  
├── pnpm-workspace.yaml  
├── package.json  
└── README.md 

# **1\. REQUISITOS TÉCNICOS**

## **1.1 Backend — Migração e Autenticação (NestJS)**

O backend desenvolvido na 1VA deve ser integralmente migrado para apps/backend dentro do monorepo, mantendo toda a arquitetura hexagonal, as entidades, os CRUDs, as validações de negócio e o tratamento de exceções implementados anteriormente. Adicionalmente, deverão ser implementados os seguintes requisitos de autenticação:

### **1.1.1 Módulo de Autenticação — Funcionalidades Obrigatórias**

* Entidade de Usuário com os campos: id (auto gerado), nome, email, senha (hash bcrypt), ativo (boolean, padrão: false).  
* Endpoint de cadastro de novo usuário (POST /auth/register):  
  * Usuário criado com ativo \= false (aguarda liberação pelo administrador).  
  * Verificar se o e-mail já existe; se sim, redirecionar (retornar status 409 com mensagem informativa).  
* Endpoint de login (POST /auth/login):  
  * Recebe email e senha.  
  * Valida credenciais; para qualquer combinação errada, retornar a mesma mensagem genérica: "E-mail ou senha incorretos." (não revelar qual campo está errado).  
  * Retorna JWT com payload contendo id, email e nome do usuário.  
  * Apenas usuários com ativo \= true podem fazer login.  
* Guard de autenticação JWT (AuthGuard) para proteção de todas as rotas existentes do tema (CRUD).

* Usuário administrador pré-cadastrado via seed ou dado inicial no banco, com ativo \= true.

* Endpoint para listar usuários (somente para administrador):

  * GET /users — lista todos os usuários cadastrados.

  * PATCH /users/:id/activate — ativa ou desativa um usuário.

  * Esses endpoints devem ser protegidos e acessíveis apenas por usuários com perfil admin.

### **1.1.2 Configuração Técnica do Backend**

* Utilizar Passport.js com estratégia JWT (@nestjs/passport, passport-jwt, @nestjs/jwt).

* Senhas armazenadas com bcrypt (nunca em texto puro).

* JWT com expiração configurável via variável de ambiente (padrão sugerido: 60 minutos).

* Configuração via arquivo .env (com .env.example documentado).

* Módulo de Auth seguindo os princípios da Arquitetura Hexagonal.

* CORS habilitado para permitir requisições do Frontend Angular (localhost:4200).

* Swagger atualizado com suporte a autenticação Bearer Token.

| AUTENTICAÇÃO: Senhas nunca devem ser armazenadas em texto puro. Usar obrigatoriamente bcrypt para hash. O JWT não deve conter informações sensíveis como senha. |
| :---- |

| SINCRONIZE: O TypeORM com synchronize: true é aceitável para este projeto educacional, mas em produção real deve ser substituído por migrations. Mantenha o comentário explicativo no código. |
| :---- |

| MONOREPO: Evite importar código de apps/ dentro de packages/. Tipos e utilitários compartilhados devem estar em packages/utils. Dependências internas usam workspace:\*. |
| :---- |

### **1.1.3 Regras de Negócio \- Validação e Formato de Resposta de Erro**

Além de manter as regras existentes, o backend deve garantir que suas respostas de erro sejam adequadas para exibição no frontend. Os requisitos obrigatórios são:

* O AllExceptionsFilter (filtro global de exceções) deve retornar obrigatoriamente um JSON padronizado contendo os campos: statusCode (número HTTP), message (string descritiva em português) e timestamp.

* As mensagens de erro devem ser descritivas e orientadas ao usuário final, não ao desenvolvedor. Exemplos corretos: "A data de início não pode ser anterior à data de trabalho no móvel." — Exemplo incorreto: "BAD\_REQUEST: dataInicio constraint violated".

* Erros de validação de DTO (class-validator / ValidationPipe) devem retornar um campo **errors** contendo os problemas por campo, possibilitando ao frontend exibir a mensagem ao lado do campo correto.

* Nenhuma regra de negócio pode gerar um erro HTTP 500 para o frontend. Erros de domínio devem ser capturados pelo ExceptionFilter e retornados como 400, 404, 409 ou 422, conforme o caso.

* O backend NÃO deve enviar mensagens genéricas como "Ocorreu um erro" para violações de regras de negócio. Cada BusinessException deve ter uma mensagem específica e compreensível.

**Exemplo de resposta padronizada esperada (HTTP 400):**

| {   "statusCode": 400,   "message": "O rendimento informado (120 kg) excede o limite               permitido para a area da estufa (96 kg).",   "timestamp": "2026-06-23T14:35:00.000Z" } |
| :---- |

## **1.2 Frontend — Angular 20 (apps/frontend)**

O frontend deverá ser desenvolvido em Angular 20 com componentes Standalone, seguindo os padrões da Aula 08\. As telas devem ser funcionais, responsivas e integradas ao backend via HttpClient.

### **1.2.1 Padrões Angular Obrigatórios**

* Componentes Standalone obrigatórios (zero NgModules).

* TailwindCSS para toda estilização (CSS customizado apenas quando necessário).

* Reactive Forms para todos os formulários.

* Signals (signal(), computed(), effect()) para estado reativo local.

* HttpClient para consumo da API do backend.

* Organização por domínio/feature (não por tipo técnico):

  * Exemplo: features/auth/, features/\[entidade-pai\]/, features/\[entidade-filho\]/

* Nova sintaxe de templates: @if, @for (com track), @switch.

* Lazy loading de rotas por feature.

* Interceptor HTTP para inclusão automática do token JWT no cabeçalho Authorization.

* Variáveis de ambiente (environment.ts) para URL base da API.

### **1.2.2 Telas Obrigatórias**

As seguintes telas devem ser implementadas:

| Tela | Rota | Descrição |
| :---- | :---- | :---- |
| **Login** | /login | Formulário com e-mail e senha. Link para cadastro e para recuperação de senha. |
| **Cadastro** | /register | Formulário para criação de conta (nome, e-mail, senha). Exibir mensagem de que a conta aguarda ativação. |
| **Home / Dashboard** | /dashboard | Página inicial protegida. Cabeçalho com nome do usuário logado e botão de logout. |
| **Listagem Entidade Pai** | /\[tema\]/pai | Lista todos os registros da entidade pai com ações de editar e excluir (com confirmação via modal). Estados: carregando, vazio, erro. |
| **Formulário Entidade Pai** | /\[tema\]/pai/novo ou /editar/:id | Formulário de criação e edição da entidade pai. Validações visuais com mensagens de erro por campo. |
| **Listagem Entidade Filho** | /\[tema\]/filho | Lista todos os registros da entidade filho, com exibição do pai relacionado. Ações de editar e excluir. |
| **Formulário Entidade Filho** | /\[tema\]/filho/novo ou /editar/:id | Formulário de criação e edição da entidade filho, com seleção do pai via dropdown. |
| **Listagem de Usuários (Admin)** | /admin/users | Visível somente para administrador. Lista usuários com opção de ativar/desativar conta. |

### **1.2.3 Autenticação no Frontend**

* AuthGuard: redirecionar para /login se o usuário não estiver autenticado ao tentar acessar uma rota protegida.

* Página de erro de autenticação: quando redirecionado, exibir mensagem informativa e link para tela de login.

* JWT armazenado em memória (service com signal) — não usar localStorage (risco de XSS).

* Exibição do nome do usuário logado no cabeçalho de todas as páginas protegidas.

* Botão de logout que limpa o token e redireciona para /login.

* Sessão com controle de expiração: ao receber 401 do backend, redirecionar para login com mensagem de sessão expirada.

### **1.2.4 Tratamento e Exibição de Erros da API no Frontend**

Os requisitos obrigatórios de tratamento de erros no frontend são:

**Tratamento centralizado:**

* Criar um serviço ou função utilitária para extrair a mensagem de erro das respostas HTTP. O campo message da resposta JSON do backend deve ser a fonte primária da mensagem exibida.

* Erros de rede (sem conexão, timeout) devem exibir uma mensagem genérica específica: "Não foi possível conectar ao servidor. Verifique sua conexão."

**Exibição em formulários (erros de criação e edição):**

* Erros HTTP 400 retornados ao submeter um formulário devem exibir a mensagem do backend próximo ao formulário ou em um componente de alerta visível.

* Se o backend retornar um campo errors com erros por campo (ValidationPipe), o frontend deve exibir cada mensagem ao lado do campo correspondente no formulário.

* O botão de submit deve ser reabilitado após o erro, permitindo que o usuário corrija e reenvie.

**Exibição em listagens e ações:**

* Erros HTTP 409 (conflito) e 422 (entidade não processável) devem exibir a mensagem do backend em um componente de notificação (toast, alert ou banner) na tela.

* Erros HTTP 404 (recurso não encontrado) em telas de detalhe/edição devem redirecionar para a listagem com uma mensagem informativa.

* Operações de exclusão que falhem no backend devem exibir a mensagem de erro retornada, não remover o item da lista.

**Estados visuais obrigatórios em todos os formulários e listagens:**

* Estado de carregamento: indicador visual enquanto aguarda resposta do backend.

* Estado de erro: exibição clara da mensagem vinda do backend, jamais ocultar o erro.

* Estado de sucesso: confirmação visual ao usuário após operações bem-sucedidas.

* Estado vazio: mensagem informativa quando a listagem não retornar registros.