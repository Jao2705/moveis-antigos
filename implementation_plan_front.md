# Modernização Visual do Frontend (Paleta Neutra e Sofisticada)

Este plano de implementação propõe a reestruturação visual do frontend do projeto **Móveis Antigos** utilizando conceitos da teoria das cores. Substituiremos o tema atual (baseado em tons de âmbar muito saturados e amarelo vibrante) por uma paleta inspirada em madeira nobre (Nogueira/Walnut) e tons naturais de linho/pedra, transmitindo sofisticação, tradição, e profissionalismo compatíveis com a restauração de móveis antigos.

---

## User Review Required

> [!IMPORTANT]
> **Definição da Nova Paleta Neutra (OKLCH)**:
> Utilizaremos o formato moderno OKLCH para definir cores extremamente limpas e consistentes:
> - **Primary / Accent (Walnut/Nogueira)**: `oklch(38% 0.04 60)` - Um tom marrom-acastanhado profundo, desaturado e luxuoso que substitui o laranja/âmbar saturado.
> - **Background (Linho/Alabaster)**: `oklch(98.5% 0.004 60)` - Um fundo off-white suave com um toque sutil de calor, eliminando o branco clínico ou cinza frio.
> - **Borders / Muted (Warm Stone)**: `oklch(92.5% 0.003 60)` para bordas finas e discretas, e `oklch(96.5% 0.003 60)` para fundos secundários.
>
> **Substituição de Classes de Cores nos Templates**:
> Para manter o código limpo e seguindo as regras descritas no [angular.md](file:///c:/Programacao/nodejs/moveisantigosv2/.agents/rules/angular.md), atualizaremos os componentes customizados (`ui-button` e `ui-card`) para usar classes semânticas (`bg-primary`, `border-border`, etc.) em vez de classes de cores explícitas e hardcoded (`bg-amber-700`, `border-stone-200`). Também ajustaremos os gradientes pesados de login e painel principal.

---

## Open Questions

Não há pendências abertas no momento. As cores propostas seguem rigorosamente a teoria das cores para aplicações premium (alta acessibilidade de contraste, saturação controlada para evitar fadiga ocular e harmonia monocromática/neutra quente).

---

## Proposed Changes

### [Componente Global de Estilização]

Ajustes das variáveis do Tailwind CSS v4 para definir a nova paleta e garantir que elementos legados que usem `amber` ou `stone` também herdem os novos tons elegantes e neutros.

#### [MODIFY] [styles.css](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/styles.css)
- Substituir a paleta `--color-amber-...` por uma escala de nogueira desaturada (Walnut/Bronze) utilizando OKLCH.
- Ajustar os tokens semânticos (`--color-primary`, `--color-background`, `--color-foreground`, `--color-border`, etc.) tanto para o tema Light quanto para o Dark.
- Limpar variáveis desnecessárias e aplicar transições suaves de cores.

---

### [Componentes Compartilhados de UI]

Substituição de classes de cores hardcoded por tokens de design semânticos nos componentes base de UI.

#### [MODIFY] [ui-button.component.ts](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/shared/ui/ui-button.component.ts)
- Alterar classes de foco de `ring-amber-600` para `ring-primary`.
- Atualizar a variante `primary` para usar `bg-primary hover:bg-primary-hover text-primary-foreground`.
- Atualizar a variante `ghost` para usar borda base `border-border` e fundo `hover:bg-muted text-foreground`.

#### [MODIFY] [ui-card.component.ts](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/shared/ui/ui-card.component.ts)
- Atualizar a variante `default` para usar `border-border bg-card text-card-foreground` em vez de `border-amber-200`.
- Atualizar a variante `glass` para usar bordas semitransparentes mais sutis (`border-border/30`) e fundo `bg-white/40`.

---

### [Templates e Layouts de Páginas]

Remoção de gradientes amarelados pesados e substituição de classes `stone-` e `amber-` específicas por utilitários neutros compatíveis com o novo design.

#### [MODIFY] [shell.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/layout/shell.component.html)
- Remover o gradiente de fundo radial amarelado (`rgba(217,119,6,0.14)`) e substituir por um fundo neutro suave.
- Limpar referências diretas a `bg-amber-700`, `border-amber-200` e `bg-amber-50` nos cabeçalhos e menu de navegação, utilizando os novos tokens de cor.

#### [MODIFY] [login.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/features/auth/login.component.html)
- Substituir o banner linear gradiente laranja/amarelo saturado por um gradiente sutil e sofisticado baseado em nogueira e linho.
- Ajustar foco dos inputs para usar a nova borda primária.

#### [MODIFY] [register.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/features/auth/register.component.html)
- Atualizar o banner de informações para usar a nova paleta.

#### [MODIFY] [dashboard.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/features/dashboard/dashboard.component.html)
- Ajustar o banner do dashboard de `bg-[radial-gradient(...rgba(217,119,6,0.18)...)]` para um degradê refinado de nogueira.
- Atualizar badges e botões para usar as cores semânticas.

#### [MODIFY] [atelie-list.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/features/atelie/atelie-list.component.html)
- Ajustar a badge de status (`Equipado`/`Parcial`) para usar a nova paleta primária.

#### [MODIFY] [atelie-form.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/features/atelie/atelie-form.component.html)
- Ajustar anéis de foco dos inputs (`focus:border-amber-500` -> `focus:border-primary`).

#### [MODIFY] [movel-list.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/features/movel/movel-list.component.html)
- Ajustar badge de status de restauração.

#### [MODIFY] [movel-form.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/features/movel/movel-form.component.html)
- Ajustar anéis de foco dos inputs.

#### [MODIFY] [users-list.component.html](file:///c:/Programacao/nodejs/moveisantigosv2/apps/frontend/src/app/features/admin/users-list.component.html)
- Ajustar classes de cabeçalhos de tabela e badges de perfil administrativo.

---

## Verification Plan

### Automated Tests
- Compilar o projeto frontend utilizando `ng build` para atestar que as modificações de template não quebraram tags Angular.
- Comando: `powershell -ExecutionPolicy Bypass -Command "pnpm --filter @moveisantigos/dashboard build"`

### Manual Verification
- Inspecionar visualmente as páginas do sistema para garantir o refinamento da paleta:
  - Fundo neutro limpo e confortável.
  - Cores dos botões e cards harmoniosas.
  - Alinhamento visual e responsividade intactos.
  - Estados ativos de navegação e foco dos formulários.
