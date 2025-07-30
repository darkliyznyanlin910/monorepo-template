# Architecture Overview

This monorepo implements a microservices architecture built with modern TypeScript technologies, optimized for scalability and developer experience.

## 🏗 System Architecture

### Microservices Design

The system is organized around loosely coupled services that communicate through well-defined APIs:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend Apps │    │  Backend APIs   │    │   Databases     │
│                 │    │                 │    │                 │
│ • React 19      │◄──►│ • Hono          │◄──►│ • PostgreSQL    │
│ • TanStack      │    │ • Better Auth   │    │ • Drizzle ORM   │
│ • Tailwind CSS  │    │ • Service Disc. │    │ • Type Safety   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Service Discovery

All services are registered and discovered through the `@repo/service-discovery` package:

- **Centralized configuration** for service URLs
- **Environment-aware** routing (dev/prod)
- **Type-safe** service communication
- **CORS management** across services

## 📁 Project Structure

```
monorepo-template/
├── apps/                     # Application services
│   ├── backend/             # Backend microservices
│   │   ├── auth/           # Authentication service
│   │   └── order/          # Order management service
│   └── frontend/           # Frontend applications
├── databases/              # Database configurations
│   └── db-auth/           # Authentication database
├── packages/              # Shared packages
│   ├── auth/             # Authentication utilities
│   ├── service-discovery/ # Service registry
│   └── ui/               # Shared UI components
└── tooling/              # Development tooling
    ├── eslint/           # Linting configurations
    ├── prettier/         # Code formatting
    ├── tailwind/         # Styling configurations
    ├── typescript/       # TypeScript configs
    └── vitest/           # Testing framework
```

### Service Categories

#### Backend Services (`apps/backend/`)

Microservices built with Hono framework:

- **auth**: Authentication and authorization using Better Auth
- **order**: Order management and processing
- Each service is independently deployable
- Shared patterns and configurations

#### Frontend Applications (`apps/frontend/`)

React applications using modern stack:

- **React 19** with latest features
- **TanStack Router** for routing
- **Tailwind CSS** for styling
- **Radix UI** for components

#### Shared Packages (`packages/`)

Reusable code across services:

- **@repo/auth**: Authentication utilities and types
- **@repo/ui**: React component library
- **@repo/service-discovery**: Service registry and communication

#### Database Packages (`databases/`)

Isolated database configurations:

- **db-auth**: Authentication database schema
- **Drizzle ORM** for type-safe database access
- **Migration management** with Drizzle Kit

## 🔄 Service Communication

### API Design

Services communicate through RESTful APIs:

```typescript
// Service registration
const serviceRegistry = {
  auth: process.env.AUTH_SERVICE_URL,
  order: process.env.ORDER_SERVICE_URL,
};

// Type-safe service calls
const authClient = new AuthClient(serviceRegistry.auth);
const user = await authClient.getUser(userId);
```

### CORS Configuration

Centralized CORS management for cross-service communication:

```typescript
// Service discovery handles CORS
const corsOrigins = getServiceOrigins();
app.use(cors({ origin: corsOrigins }));
```

## 📊 Data Flow

### Authentication Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant A as Auth Service
    participant D as Database

    U->>F: Login Request
    F->>A: POST /auth/login
    A->>D: Validate Credentials
    D-->>A: User Data
    A-->>F: JWT Token
    F-->>U: Authenticated Session
```

### Service-to-Service Communication

```mermaid
graph LR
    A[Frontend App] --> B[API Gateway]
    B --> C[Auth Service]
    B --> D[Order Service]
    C --> E[Auth Database]
    D --> F[Order Database]
    C -.-> D
```

## 🛠 Development Patterns

### Shared Configuration

All services inherit from shared configurations:

```typescript
// packages/service-discovery/src/config.ts
export const serviceConfig = {
  development: {
    auth: "http://localhost:3001",
    order: "http://localhost:3002",
  },
  production: {
    auth: process.env.AUTH_SERVICE_URL,
    order: process.env.ORDER_SERVICE_URL,
  },
};
```

### Type Safety

Strong typing across service boundaries:

```typescript
// Used in both frontend and backend
import type { User } from "@repo/auth";

// Shared types in packages/auth/src/types.ts
export interface User {
  id: string;
  email: string;
  role: UserRole;
}
```

### Environment Management

Validated environment variables using `@t3-oss/env-core`:

```typescript
// apps/backend/auth/src/env.ts
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    JWT_SECRET: z.string().min(32),
    DISCORD_CLIENT_ID: z.string(),
  },
});
```

## 🚀 Deployment Architecture

### Container Strategy

Each service is containerized with optimized Docker images:

```dockerfile
# Multi-stage build for production
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:22-alpine AS runtime
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "dist/index.js"]
```

### Infrastructure as Code

Terraform modules for AWS deployment:

```
terraform/
├── eks/                  # Kubernetes cluster
├── modules/
│   ├── aws/
│   │   ├── eks/         # EKS cluster configuration
│   │   ├── network/     # VPC and networking
│   │   └── route53/     # DNS management
│   └── kubernetes/
│       ├── argocd/      # GitOps deployment
│       ├── istio/       # Service mesh
│       └── monitoring/  # Observability stack
```

### Service Mesh

Istio service mesh for:

- **Traffic management** between services
- **Security policies** and mTLS
- **Observability** and monitoring
- **Load balancing** and failover

## 🔒 Security Architecture

### Authentication Strategy

- **Better Auth** for user authentication
- **JWT tokens** for stateless authentication
- **OAuth integration** with Discord
- **Role-based access control** (RBAC)

### Service Security

- **Service-to-service authentication** via JWT
- **API rate limiting** and throttling
- **Input validation** with Zod schemas
- **CORS policies** for frontend-backend communication

## 📈 Scalability Considerations

### Horizontal Scaling

- **Stateless services** for easy horizontal scaling
- **Database connection pooling** for efficient resource usage
- **Kubernetes HPA** for auto-scaling based on metrics
- **Load balancing** across service instances

### Performance Optimization

- **Turborepo caching** for build optimization
- **Bundle splitting** for frontend applications
- **Database indexing** for query performance
- **CDN integration** for static assets

## 🔍 Monitoring and Observability

### Metrics Collection

- **Prometheus** for metrics collection
- **Grafana** for visualization
- **Kiali** for service mesh observability

### Logging Strategy

- **Structured logging** with consistent formats
- **Centralized log aggregation** with ELK stack
- **Log correlation** across service boundaries
- **Error tracking** and alerting

## 🧪 Testing Strategy

### Testing Pyramid

```
     ┌─────────────────┐
     │  E2E Tests      │ ← Cypress/Playwright
     │  (Few)          │
     ├─────────────────┤
     │ Integration     │ ← API Testing
     │ Tests (Some)    │
     ├─────────────────┤
     │ Unit Tests      │ ← Vitest
     │ (Many)          │
     └─────────────────┘
```

### Service Testing

- **Unit tests** for business logic
- **Integration tests** for API endpoints
- **Contract testing** between services
- **End-to-end tests** for user workflows

This architecture provides a solid foundation for building scalable, maintainable applications while ensuring developer productivity and system reliability.
