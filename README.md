# moveisantigosv2

API RESTful desenvolvida com NestJS + TypeORM + SQLite para o tema:
**Estudio de Restauracao de Moveis Antigos**.

## Integrantes
- Joao Vitor Freitas Araujo
- Alex

## Tecnologias
- NestJS
- TypeORM
- SQLite
- Swagger

## Tema e Entidades

### Entidade Pai: AtelieRestauracao
- `id` (number)
- `especialidadeEra` (string)
- `dataFundacao` (date)
- `equipadoCompleto` (boolean)
- `areaOficinaM2` (number)

### Entidade Filho: ProjetoMovel
- `id` (number)
- `tipoMovel` (string)
- `dataInicioTrab` (date)
- `restaurado` (boolean)
- `horasHomem` (number)
- `atelieId` (FK)

Relacionamento: **1:N**  
Um `Atelie` possui varios `Moveis`.

## Arquitetura Hexagonal (Ports and Adapters)

Estrutura principal:

```text
src/
  atelie/
    domain/
    application/
      ports/
    infraestructure/presistence/typeorm/
    presentation/
  movel/
    domain/
    application/
      ports/
    infraestructure/presistence/typeorm/
    presentation/
  shared/
    database/
    filters/
```

- `domain`: entidades e excecoes de dominio
- `application`: services e portas (interfaces de repositorio)
- `infrastructure`: adapters TypeORM (entities ORM e repositories)
- `presentation`: controllers e DTOs
- `shared`: configuracao de banco e filtros globais

## Regras de Negocio Implementadas

As validacoes estao na camada de service e usam excecoes:
- `BadRequestException`
- `NotFoundException`
- `ConflictException`

Validacoes principais:
1. Campos obrigatorios do atelie.
2. `dataFundacao` nao pode ser futura.
3. `areaOficinaM2` deve ser >= 50.
4. Campos obrigatorios do movel.
5. `atelieId` deve existir antes de criar/atualizar movel.
6. `dataInicioTrab` nao pode ser anterior a `dataFundacao` do atelie.
7. `horasHomem` deve estar entre 10 e 1000.
8. Se `restaurado = true`, `horasHomem >= 40`.
9. Se `restaurado = false`, nao permitir `horasHomem = 0`.
10. Nao permitir duplicidade de `tipoMovel` em restauracao (`restaurado = false`) no mesmo atelie.

## Filtro Global de Excecoes

Filtro configurado no `main.ts`:
- `AllExceptionsFilter`

Formato padrao de resposta de erro:

```json
{
  "statusCode": 400,
  "message": "mensagem de erro",
  "timestamp": "2026-04-04T00:00:00.000Z"
}
```

## Banco de Dados
- Tipo: SQLite
- Arquivo: `data/moveis-antigos.db`
- `synchronize: true` habilitado para desenvolvimento

## Endpoints Principais

### Atelie
- `POST /atelie`
- `GET /atelie`
- `GET /atelie/:id`
- `PUT /atelie/:id`
- `DELETE /atelie/:id`
- `GET /atelie/:id/com-moveis` (pai + filhos com relations)

### Movel
- `POST /movel`
- `GET /movel`
- `GET /movel/:id`
- `PUT /movel/:id`
- `DELETE /movel/:id`

## Como Executar

```bash
npm install
npm run build
npm run start:dev
```

## Divisão de tarefas

- João Vitor: Ficou responsável por fazer a parte de Ateliê.
- Alex: Ficou responsável por fazer a parte de Móvel.
- Os testes foram realizados em conjunto. Os resultados foram tiveram resultados positivos de acordo com as regras de negócio solicitadas.

API local:
- `http://localhost:3000`

Swagger:
- `http://localhost:3000/swagger-ui`

## Testes

```bash
npm run test
```

## Observacao

Projeto academico para fins de estudo e avaliacao da disciplina.
