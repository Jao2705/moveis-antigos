# Especificação — Restauração de Móveis Antigos

Documento de referência para a 2ª avaliação (monorepo + autenticação + frontend Angular).

## Entidades

- **Ateliê** (pai): especialidadeEra, dataFundacao, equipadoCompleto, areaOficinaM2
- **Móvel** (filho): tipoMovel, dataInicioTrab, restaurado, horasHomem, atelieId
- **Usuário**: id, nome, email, senha (hash), role (admin/user), ativo (boolean)

## Autenticação

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | /auth/register | Cadastro público (ativo=false) |
| POST | /auth/login | Login (apenas ativo=true) |
| GET | /users | Lista usuários (admin) |
| PATCH | /users/:id/activate | Ativa/desativa usuário (admin) |

## Frontend

| Rota | Tela |
|------|------|
| /login | Login |
| /register | Cadastro |
| /dashboard | Dashboard |
| /atelie | Listagem ateliês |
| /atelie/novo, /atelie/editar/:id | Formulário ateliê |
| /movel | Listagem móveis |
| /movel/novo, /movel/editar/:id | Formulário móvel |
| /admin/users | Usuários (admin) |
