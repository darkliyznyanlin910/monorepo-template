# Documentation

Welcome to the comprehensive documentation for this TypeScript monorepo template. This documentation is organized into focused guides to help you understand and work with the system effectively.

## 📚 Documentation Structure

### Core Guides

| Document                                   | Description                                                               |
| ------------------------------------------ | ------------------------------------------------------------------------- |
| [🧪 Testing Framework](testing.md)         | Complete guide to Vitest testing setup, configuration, and best practices |
| [🏗 Architecture](architecture.md)         | System architecture, microservices design, and communication patterns     |
| [🚀 Development Guide](development.md)     | Development workflow, tooling, and best practices                         |
| [⚡ Technology Stack](technology-stack.md) | Comprehensive overview of all technologies and frameworks                 |
| [🎨 Code Generators](generators.md)        | Using Turbo generators to scaffold new packages and applications          |

### Quick Navigation

**Getting Started:**

- [Development Setup](development.md#getting-started) - Initial setup and environment configuration
- [Project Structure](architecture.md#project-structure) - Understanding the monorepo organization
- [Running the System](development.md#development-commands) - Essential commands for development

**Building Features:**

- [Creating New Services](generators.md#backend-service-generator) - Generate backend microservices
- [Adding Frontend Apps](generators.md#frontend-application-generator) - Create React applications
- [Database Integration](generators.md#database-package-generator) - Set up new databases

**Testing & Quality:**

- [Writing Tests](testing.md#testing-patterns) - Testing patterns and examples
- [Code Quality](development.md#code-quality-workflow) - Linting, formatting, and type checking
- [Coverage Reports](testing.md#coverage-collection) - Understanding and using coverage data

**Advanced Topics:**

- [Service Communication](architecture.md#service-communication) - Inter-service communication patterns
- [Deployment](architecture.md#deployment-architecture) - Infrastructure and deployment strategies
- [Customization](generators.md#customizing-generators) - Extending and customizing generators

## 🎯 Key Features

This monorepo template provides:

### 🏗 **Modern Architecture**

- **Microservices design** with independent, scalable services
- **Type-safe communication** between frontend and backend
- **Service discovery** for flexible service integration
- **Database isolation** with dedicated packages per domain

### 🚀 **Developer Experience**

- **Fast builds** with Turborepo caching and parallelization
- **Hot reloading** across all packages during development
- **Consistent tooling** with shared ESLint, Prettier, and TypeScript configs
- **Code generation** to quickly scaffold new features

### 🧪 **Testing Excellence**

- **Comprehensive testing** with Vitest framework
- **Coverage collection** across all packages
- **API testing** with Hono testing utilities
- **Frontend testing** with jsdom environment

### 🔧 **Production Ready**

- **Container support** with optimized Docker images
- **Infrastructure as code** with Terraform modules
- **Kubernetes deployment** with ArgoCD GitOps
- **Service mesh** with Istio for advanced networking

## 🚦 Getting Started Checklist

Follow this checklist to get up and running quickly:

- [ ] **Prerequisites**: Install Node.js >= 22.14.0 and pnpm >= 9.6.0
- [ ] **Clone and install**: Run `pnpm install` in the project root
- [ ] **Environment setup**: Copy `.env.example` to `.env` and configure
- [ ] **Database setup**: Run `pnpm db:push` to initialize database schema
- [ ] **Start development**: Run `pnpm dev` to start all services
- [ ] **Verify setup**: Check that all services are running on their respective ports
- [ ] **Run tests**: Execute `pnpm test:projects` to ensure everything works
- [ ] **Explore docs**: Read through the relevant documentation for your use case

## 🤝 Contributing

When contributing to this project:

1. **Follow the established patterns** documented in these guides
2. **Use the generators** to create new packages and services
3. **Write tests** for new functionality
4. **Update documentation** when adding new features
5. **Run quality checks** with `pnpm lint && pnpm typecheck`

## 📖 Additional Resources

### External Documentation

- [Turborepo Docs](https://turbo.build/repo/docs) - Build system and caching
- [Hono Documentation](https://hono.dev/) - API framework
- [Drizzle ORM](https://orm.drizzle.team/) - Database ORM
- [Vitest](https://vitest.dev/) - Testing framework
- [TanStack Router](https://tanstack.com/router) - Frontend routing

---

For specific implementation details, please refer to the individual documentation files linked above. Each guide provides comprehensive information about its respective topic with practical examples and best practices.
