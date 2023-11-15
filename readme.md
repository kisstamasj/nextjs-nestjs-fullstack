# Prerequisite

- pnpm package manager (install: `npm i -g pnpm`)
- Docker, Docker Compose v2

# Setup

- create `infra/.env` from `infra/.env.example` (`cp infra/.env.example infra/.env`)
  - generate secret keys for JWT secrets (`JWT_ACCESS_TOKEN_SECRET`, `JWT_REFRESH_TOKEN_SECRET`, `NEXTAUTH_SECRET`): `openssl rand -base64 32`
- `cd backend && pnpm install && cd ..`
- `cd frontend && pnpm install && cd ..`
- `pnpm run docker:up:build`
- `pnpm run backend:migration:run` (in new terminal)
- frontend: `http://localhost:{env.FRONTED_EXTERNAL_PORT}`
- backend: `http://localhost:{env.BACKEND_EXTERNAL_PORT}`