<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:memory-bank-rules -->

# Memory Bank Rules

This project uses a Memory Bank system to persist project knowledge between sessions.
All agents must follow this workflow when working on the repository.

## Memory Bank Workflow

### Before Starting Any Task

1. Read relevant memory bank files located in `memory-bank/` to understand project context:
   - `00-project-brief.md` — project scope, goals, and requirements
   - `01-product-context.md` — user problems and product vision
   - `02-active-context.md` — current focus and immediate next steps
   - `03-system-patterns.md` — architecture patterns and design decisions
   - `04-tech-context.md` — technology stack, tools, and setup
   - `05-progress-log.md` — completed work and remaining tasks
   - `06-components.md` — system components and structure (if applicable)
   - `07-api-documentation.md` — API definitions and changes (if APIs exist)

2. Use this information to:
   - Align new work with project goals
   - Avoid duplicating existing work
   - Maintain consistency with architecture and conventions

### After Completing a Task

After finishing any development task, update the memory bank to reflect the latest project state.

#### Required Updates

Update the following files when relevant:

- **`00-project-brief.md`**
  Always update when core requirements, scope, or project goals change

- **`01-product-context.md`**
  Update when user needs, product goals, or problem statements change

- **`02-active-context.md`**
  Always update with:
  - what was just completed
  - the current focus
  - immediate next steps

- **`03-system-patterns.md`**
  Update when architecture, system patterns, or design decisions change

- **`04-tech-context.md`**
  Update when technologies, frameworks, tools, or setup instructions change

- **`05-progress-log.md`**
  Always update with:
  - completed tasks
  - current development status
  - newly discovered issues or blockers

- **`06-components.md`**
  Update when components are added, removed, or modified
  Create this file if the project is component-based

- **`07-api-documentation.md`**
  Update when APIs are added, changed, or removed
  Create this file if the project exposes APIs

#### Update Guidelines

- Keep updates concise and factual
- Focus on information needed for future sessions
- Do not rewrite history unnecessarily
- Ensure current project state is always accurate
- Avoid duplicating information across files

## Goal of Memory Bank

The Memory Bank ensures that:

- Project context persists across development sessions
- Future contributors or agents understand the system quickly
- Architecture and product decisions remain documented
- Progress tracking stays clear and up to date
<!-- END:memory-bank-rules -->
