import { execSync } from "node:child_process";
import path from "node:path";
import type { PlopTypes } from "@turbo/gen";

import { PackageJson } from "./config";

export default function frontendGenerator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("frontend", {
    description: "Generate a new frontend app for the monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the frontend app?",
      },
      {
        type: "input",
        name: "port",
        message: "What port should this frontend app run on?",
        validate: (input: string) => {
          const port = parseInt(input);
          if (isNaN(port)) {
            return "Port must be a valid number";
          }
          if (!input.startsWith("4")) {
            return "Frontend app ports must start with 4 (e.g., 4000, 4001, 4002)";
          }
          if (port < 4000 || port > 4999) {
            return "Frontend app ports must be between 4000-4999";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "deps",
        message:
          "Enter a space separated list of dependencies you would like to install",
      },
    ],
    actions: [
      (answers) => {
        if ("name" in answers && typeof answers.name === "string") {
          if (answers.name.startsWith("@repo/")) {
            answers.name = answers.name.replace("@repo/", "");
          }
        }
        return "Config sanitized";
      },
      {
        type: "add",
        path: "apps/{{ name }}/package.json",
        templateFile: "templates/frontend/package.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/Dockerfile",
        templateFile: "templates/frontend/Dockerfile.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/index.html",
        templateFile: "templates/frontend/index.html.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/404.html",
        templateFile: "templates/frontend/404.html.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/.gitignore",
        templateFile: "templates/frontend/.gitignore.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/eslint.config.js",
        templateFile: "templates/frontend/eslint.config.js.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/postcss.config.cjs",
        templateFile: "templates/frontend/postcss.config.cjs.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/tailwind.config.ts",
        templateFile: "templates/frontend/tailwind.config.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/tsconfig.json",
        templateFile: "templates/frontend/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/tsconfig.app.json",
        templateFile: "templates/frontend/tsconfig.app.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/tsconfig.node.json",
        templateFile: "templates/frontend/tsconfig.node.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/turbo.json",
        templateFile: "templates/frontend/turbo.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/vite.config.ts",
        templateFile: "templates/frontend/vite.config.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/main.tsx",
        templateFile: "templates/frontend/src/main.tsx.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/index.css",
        templateFile: "templates/frontend/src/index.css.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/env.ts",
        templateFile: "templates/frontend/src/env.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/vite-env.d.ts",
        templateFile: "templates/frontend/src/vite-env.d.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/routeTree.gen.ts",
        templateFile: "templates/frontend/src/routeTree.gen.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/routes/__root.tsx",
        templateFile: "templates/frontend/src/routes/__root.tsx.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/routes/index.tsx",
        templateFile: "templates/frontend/src/routes/index.tsx.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/public/vite.svg",
        templateFile: "templates/frontend/public/vite.svg",
      },
      {
        type: "add",
        path: "apps/{{ name }}/public/fonts/HelveticaNeueLight.otf",
        templateFile: "templates/frontend/public/fonts/HelveticaNeueLight.otf",
      },
      {
        type: "add",
        path: "apps/{{ name }}/public/fonts/HelveticaNeueMedium.otf",
        templateFile: "templates/frontend/public/fonts/HelveticaNeueMedium.otf",
      },
      {
        type: "add",
        path: "apps/{{ name }}/public/fonts/HelveticaNeueThin.otf",
        templateFile: "templates/frontend/public/fonts/HelveticaNeueThin.otf",
      },
      {
        type: "add",
        path: "apps/{{ name }}/vitest.config.ts",
        templateFile: "templates/frontend/vitest.config.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/tests/math.test.ts",
        templateFile: "templates/tests/math.test.ts.hbs",
      },
      {
        type: "modify",
        path: "apps/{{ name }}/package.json",
        async transform(content, answers) {
          if ("deps" in answers && typeof answers.deps === "string") {
            const pkg = JSON.parse(content) as PackageJson;
            for (const dep of answers.deps.split(" ").filter(Boolean)) {
              const version = await fetch(
                `https://registry.npmjs.org/-/package/${dep}/dist-tags`,
              )
                .then((res) => res.json())
                .then((json) => json.latest);
              if (!pkg.dependencies) pkg.dependencies = {};
              pkg.dependencies[dep] = `^${version}`;
            }
            return JSON.stringify(pkg, null, 2);
          }
          return content;
        },
      },
      async (answers) => {
        /**
         * Install deps and format everything
         */
        if ("name" in answers && typeof answers.name === "string") {
          execSync("pnpm i", { stdio: "inherit" });
          execSync(
            `pnpm prettier --write apps/${answers.name}/** --list-different`,
          );
          console.log("\n🎉 Frontend app scaffolded successfully!");
          console.log("\n📝 Next steps:");
          console.log(
            `   1. If this frontend needs to call backend services, register any new services:`,
          );
          console.log(
            `      File: ${path.join(process.cwd(), "packages", "service-discovery", "src", "config.ts")}`,
          );
          console.log(`   2. Add service names to the SERVICES array`);
          console.log(
            `   3. Add the service URLs to all three service maps (LOCAL, KUBERNETES, PRODUCTION)`,
          );
          console.log(`\n   Example:`);
          console.log(`   SERVICES = ["auth", "your-service"] as const;`);
          console.log(
            `   LOCAL_SERVICE_MAP = { ..., "your-service": "http://localhost:XXXX" }`,
          );
          return "Frontend app scaffolded";
        }
        return "Frontend app not scaffolded";
      },
    ],
  });
}
