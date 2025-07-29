import { execSync } from "node:child_process";
import path from "node:path";
import type { PlopTypes } from "@turbo/gen";

import { PackageJson } from "./config";

export default function databaseGenerator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("database", {
    description: "Generate a new database package for the monorepo",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is the name of the database package?",
      },
      {
        type: "input",
        name: "port",
        message: "What port should Drizzle Studio run on for this database?",
        validate: (input: string) => {
          const port = parseInt(input);
          if (isNaN(port)) {
            return "Port must be a valid number";
          }
          if (!input.startsWith("55")) {
            return "Drizzle Studio ports must start with 55 (e.g., 5500, 5501, 5502)";
          }
          if (port < 5500 || port > 5599) {
            return "Drizzle Studio ports must be between 5500-5599";
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
          // Create slug: capitalize and replace dashes with underscores
          (answers as any).slug = (answers.name as string)
            .toUpperCase()
            .replace(/-/g, "_");
        }
        return "Config sanitized";
      },
      {
        type: "add",
        path: "databases/{{ name }}/package.json",
        templateFile: "templates/db/package.json.hbs",
      },
      {
        type: "add",
        path: "databases/{{ name }}/eslint.config.js",
        templateFile: "templates/db/eslint.config.js.hbs",
      },
      {
        type: "add",
        path: "databases/{{ name }}/tsconfig.json",
        templateFile: "templates/db/tsconfig.json.hbs",
      },
      {
        type: "add",
        path: "databases/{{ name }}/drizzle.config.ts",
        templateFile: "templates/db/drizzle.config.ts.hbs",
      },
      {
        type: "add",
        path: "databases/{{ name }}/src/index.ts",
        templateFile: "templates/db/src/index.ts.hbs",
      },
      {
        type: "add",
        path: "databases/{{ name }}/src/env.ts",
        templateFile: "templates/db/src/env.ts.hbs",
      },
      {
        type: "add",
        path: "databases/{{ name }}/src/client.ts",
        templateFile: "templates/db/src/client.ts.hbs",
      },
      {
        type: "add",
        path: "databases/{{ name }}/src/schema.ts",
        templateFile: "templates/db/src/schema.ts.hbs",
      },
      {
        type: "add",
        path: "databases/{{ name }}/tests/index.ts",
        templateFile: "templates/db/tests/index.ts.hbs",
      },
      {
        type: "modify",
        path: "databases/{{ name }}/package.json",
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
            `pnpm prettier --write databases/${answers.name}/** --list-different`,
          );
          console.log("\n🎉 Database package scaffolded successfully!");
          console.log("\n📝 Next steps:");
          console.log(`   1. Set up your database environment variables`);
          console.log(`   2. Update the database schema in:`);
          console.log(
            `      File: ${path.join(process.cwd(), "databases", answers.name, "src", "schema.ts")}`,
          );
          console.log(`   3. Run drizzle migrations to set up your database`);
          console.log(`   4. Import and use the database in your apps`);
          console.log(
            `\n   Database slug for env vars: ${(answers as any).slug}`,
          );
          return "Database package scaffolded";
        }
        return "Database package not scaffolded";
      },
    ],
  });
}
