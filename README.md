# Piing

**Fast, minimal, one-time reminder app**

Piing is a fast, minimal reminder service that lets users create **one-time alerts** with a clean interface and secure account login—making it easy to manage all their reminders in one place.

## Features

- One-time reminders
- Automatic timezone handling (Local → UTC)
- Email notifications using cron jobs and nodemailer
- Secure authentication (JWT + sessions)
- Clean REST API
- Minimal and fast UI

## Project Structure

Piing is built as a **pnpm monorepo**.

    Piing/
    ├─ apps/
    │  ├─ api/                # Backend (Node.js + Express)
    │  │  ├─ cron/
    │  │  ├─ errors/
    │  │  ├─ middlewares/
    │  │  ├─ routes/
    │  │  ├─ services/
    │  │  ├─ sql/
    │  │  ├─ utils/
    │  │  ├─ app.ts
    │  │  ├─ database.ts
    │  │  ├─ init-table.ts
    │  │  ├─ global.d.ts
    │  │  ├─ eslint.config.mjs
    │  │  ├─ package.json
    │  │  └─ tsconfig.json
    │  │
    │  └─ web/                # Frontend (React + Vite)
    │     ├─ public/
    │     ├─ src/
    │     │  ├─ components/
    │     │  ├─ hooks/
    │     │  ├─ pages/
    │     │  ├─ types/
    │     │  ├─ utils/
    │     │  └─ main.tsx
    │     │
    │     ├─ index.html
    │     ├─ eslint.config.mjs
    │     ├─ package.json
    │     ├─ tsconfig.json
    │     ├─ tsconfig.app.json
    │     ├─ tsconfig.node.json
    │     └─ vite.config.ts
    │
    ├─ packages/
    │  ├─ types/
    │  ├─ validation/
    │  ├─ tsconfig/
    │  └─ eslint-config/
    │
    ├─ .env
    ├─ .gitignore
    ├─ pnpm-workspace.yaml
    ├─ package.json
    ├─ postcss.config.mjs
    └─ README.md

## Tech Stack

### Backend

- Node.js
- Express
- PostgreSQL
- TypeScript
- JWT Authentication
- node-cron
- Nodemailer

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router

### Shared

- pnpm workspaces
- Zod (validation)
- ESLint
- Centralized types

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/An4s0/Piing.git
cd Piing
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment Variables

Create a .env file in the project root by copying the example file:

```bash
cp .env.example .env
```

### 4. Run the project

```bash
pnpm dev
```
