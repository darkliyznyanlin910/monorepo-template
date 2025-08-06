# Stage 1: Setup base
FROM node:22-alpine AS base
RUN apk add --no-cache python3 make g++ gcc
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm
RUN pnpm install -g turbo

WORKDIR /repo
COPY . .
RUN turbo prune @repo/main --docker

# Stage 2: Build
FROM node:22-alpine AS builder
RUN apk add --no-cache python3 make g++ gcc
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm

WORKDIR /repo

COPY --from=base /repo/out/full/ .
RUN pnpm install

# Build the project
WORKDIR /repo/apps/frontend/main
RUN pnpm turbo run build --filter=@repo/main...

# Stage 3: Run
FROM node:22-alpine AS runner
WORKDIR /repo

COPY --from=builder /repo/apps/frontend/main/dist /repo/apps/frontend/main/dist

WORKDIR /repo/apps/frontend/main

EXPOSE 4000
CMD ["node", "./dist/index.cjs"]