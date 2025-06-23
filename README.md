# Monorepo Template

A modern, full-stack TypeScript monorepo template built with cutting-edge technologies for scalable development.

## 🚀 Technology Stack

### Core Infrastructure

- **Package Management**: [pnpm](https://pnpm.io/) with workspaces
- **Build System**: [Turborepo](https://turbo.build/) for optimized builds and caching
- **Language**: [TypeScript](https://www.typescriptlang.org/) with strict configuration
- **Node.js**: >= 22.14.0

### Backend Technologies

- **API Framework**: [Hono](https://hono.dev/) - Ultra-fast web framework
- **Authentication**: [Better Auth](https://www.better-auth.com/) v1.2.9
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/) v0.44.1 with Drizzle Kit
- **Validation**: [Zod](https://zod.dev/) v3.25.49
- **Server**: [@hono/node-server](https://github.com/honojs/node-server)

### Frontend Technologies

- **React**: v19.1.0 (latest)
- **UI Framework**: [Radix UI](https://www.radix-ui.com/) components
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v3.4.15
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [@hookform/resolvers](https://github.com/react-hook-form/resolvers)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes) for dark/light mode
- **Icons**: [@radix-ui/react-icons](https://icons.radix-ui.com/)
- **Styling Utils**: [class-variance-authority](https://cva.style/docs), [tailwind-merge](https://github.com/dcastil/tailwind-merge)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/) for toast notifications

### Development Tools

- **Linting**: [ESLint](https://eslint.org/) v9.28.0 with custom configurations
- **Formatting**: [Prettier](https://prettier.io/) v3.5.3
- **Type Checking**: TypeScript v5.8.3
- **Environment Variables**: [@t3-oss/env-core](https://env.t3.gg/) for validated env vars

## 📁 Project Structure

```
monorepo-template/
├── apps/                     # Application services
│   └── auth-service/         # Authentication microservice
├── databases/                # Database configurations
│   └── db-auth/             # Authentication database
├── packages/                 # Shared packages
│   ├── auth/                # Auth utilities
│   ├── service-discovery/   # Service discovery utilities
│   └── ui/                  # Shared UI components
└── tooling/                 # Development tooling
    ├── eslint/              # ESLint configurations
    ├── github/              # GitHub Actions
    ├── prettier/            # Prettier configuration
    ├── tailwind/            # Tailwind configurations
    └── typescript/          # TypeScript configurations
```

## 🏗 Architecture

### Microservices Architecture

- **auth-service**: Handles authentication using Better Auth with Discord OAuth
- **Service Discovery**: Manages service URLs and cross-service communication
- **Database Layer**: Isolated database packages with Drizzle ORM

### Shared Packages

- **@repo/ui**: Reusable React components built on Radix UI
- **@repo/auth**: Authentication utilities and types
- **@repo/service-discovery**: Service registry and URL management
- **@repo/db-auth**: Database schema and client for authentication

### Development Tooling

- **@repo/eslint-config**: Shared ESLint configurations (base, React, Next.js)
- **@repo/prettier-config**: Unified code formatting
- **@repo/tailwind-config**: Tailwind configurations for web and native
- **@repo/tsconfig**: TypeScript configurations for different project types

## 🚦 Getting Started

### Prerequisites

- Node.js >= 22.14.0
- pnpm >= 9.6.0

### Installation

```bash
pnpm install
```

### Environment Setup

Create a `.env` file in the root with:

```env
POSTGRES_URL=your_postgres_connection_string
AUTH_DISCORD_ID=your_discord_client_id
AUTH_DISCORD_SECRET=your_discord_client_secret
AUTH_REDIRECT_PROXY_URL=your_redirect_url
AUTH_SECRET=your_auth_secret
PORT=3000
```

### Development Commands

```bash
# Start all services in development mode
pnpm dev

# Build all packages
pnpm build

# Run linting
pnpm lint
pnpm lint:fix

# Format code
pnpm format
pnpm format:fix

# Type checking
pnpm typecheck

# Database operations
pnpm db:push     # Push schema changes
pnpm db:studio   # Open Drizzle Studio

# Clean workspace
pnpm clean
pnpm clean:workspaces
```

## 🔧 Key Features

### Package Management

- **Catalog Dependencies**: Centralized version management in `pnpm-workspace.yaml`
- **Workspace Protocol**: Internal packages use `workspace:*` for optimal linking
- **Built Dependencies**: Optimized handling of native dependencies

### Build System

- **Incremental Builds**: Turborepo caches and parallelizes builds
- **Task Pipeline**: Proper dependency ordering with `^build` syntax
- **Persistent Tasks**: Development servers run continuously
- **Global Environment**: Shared environment variables across all apps

### Code Quality

- **Strict TypeScript**: Type-safe development with strict configurations
- **ESLint Rules**:
  - Turbo plugin for monorepo optimization
  - Import sorting and consistency
  - Restricted environment access (must use validated env)
  - No unused variables/imports
- **Prettier Integration**: Consistent code formatting across all packages

### Database

- **Type-Safe ORM**: Drizzle ORM with Zod validation
- **Schema Management**: Version controlled database schemas
- **Connection Pooling**: Optimized PostgreSQL connections
- **Development Tools**: Drizzle Studio for database inspection

### Authentication

- **Better Auth**: Modern authentication with Discord OAuth
- **Type Safety**: Full TypeScript support
- **CORS Configuration**: Proper cross-origin handling
- **Service Integration**: Works seamlessly with service discovery

## 📦 Package Scripts

### Global Scripts (Root)

- `pnpm build` - Build all packages
- `pnpm dev` - Start development servers
- `pnpm lint` - Lint all packages
- `pnpm format` - Format all packages
- `pnpm typecheck` - Type check all packages
- `pnpm db:push` - Push database schema
- `pnpm db:studio` - Open database studio

### Package-Specific Scripts

Each package includes:

- `build` - Build the package
- `dev` - Development mode
- `lint` - ESLint checking
- `format` - Prettier formatting
- `typecheck` - TypeScript checking
- `clean` - Clean build artifacts

## 🔗 Service Communication

Services communicate through:

1. **Service Discovery**: Centralized service URL management
2. **CORS Configuration**: Proper cross-origin request handling
3. **Type-Safe APIs**: Shared types between services
4. **Environment Variables**: Global configuration management

## 🧪 Development Workflow

1. **Install dependencies**: `pnpm install`
2. **Set up environment**: Copy and configure `.env`
3. **Start development**: `pnpm dev`
4. **Make changes**: Edit code with full TypeScript support
5. **Quality checks**: Run `pnpm lint` and `pnpm typecheck`
6. **Database changes**: Use `pnpm db:push` and `pnpm db:studio`
7. **Build**: `pnpm build` for production builds

## 🎯 Best Practices

- Use the workspace protocol for internal dependencies
- Follow the established directory structure
- Leverage shared tooling configurations
- Use environment validation with `@t3-oss/env-core`
- Keep packages focused and cohesive
- Use Turborepo's caching for optimal build performance
