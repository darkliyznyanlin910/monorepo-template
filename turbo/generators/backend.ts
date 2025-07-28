import { execSync } from "node:child_process";
import path from "node:path";
import type { PlopTypes } from "@turbo/gen";

import { PackageJson } from "./config";

export default function backendGenerator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("backend", {
    description: "Generate a new backend app for the monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the backend app?",
      },
      {
        type: "input",
        name: "port",
        message: "What port should this backend service run on?",
        validate: (input: string) => {
          const port = parseInt(input);
          if (isNaN(port)) {
            return "Port must be a valid number";
          }
          if (!input.startsWith("3")) {
            return "Backend service ports must start with 3 (e.g., 3000, 3001, 3002)";
          }
          if (port < 3000 || port > 3999) {
            return "Backend service ports must be between 3000-3999";
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
        templateFile: "templates/backend/package.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/Dockerfile",
        templateFile: "templates/backend/Dockerfile.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/eslint.config.js",
        templateFile: "templates/backend/eslint.config.js.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/tsconfig.json",
        templateFile: "templates/backend/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/turbo.json",
        templateFile: "templates/backend/turbo.json.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/index.ts",
        templateFile: "templates/backend/src/index.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/env.ts",
        templateFile: "templates/backend/src/env.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/factory.ts",
        templateFile: "templates/backend/src/factory.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/routes/hello.ts",
        templateFile: "templates/backend/src/routes/hello.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/src/types.ts",
        templateFile: "templates/backend/src/types.ts.hbs",
      },
      {
        type: "add",
        path: "apps/{{ name }}/vitest.config.ts",
        templateFile: "templates/backend/vitest.config.ts.hbs",
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
          console.log("\n🎉 Backend app scaffolded successfully!");
          console.log("\n📝 Next steps:");
          console.log(
            `   1. Register your new service in the service discovery:`,
          );
          console.log(
            `      File: ${path.join(process.cwd(), "packages", "service-discovery", "src", "config.ts")}`,
          );
          console.log(`   2. Add "${answers.name}" to the SERVICES array`);
          console.log(
            `   3. Add the service URLs to all three service maps (LOCAL, KUBERNETES, PRODUCTION)`,
          );
          console.log(`\n   Example:`);
          console.log(`   SERVICES = ["auth", "${answers.name}"] as const;`);
          console.log(
            `   LOCAL_SERVICE_MAP = { ..., ${answers.name}: "http://localhost:XXXX" }`,
          );
          return "Backend app scaffolded";
        }
        console.log(answers);
        return "Backend app not scaffolded";
      },
    ],
  });
}
