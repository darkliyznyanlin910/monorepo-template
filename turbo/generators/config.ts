import type { PlopTypes } from "@turbo/gen";

import packageGenerator from "./package";

export interface PackageJson {
  name: string;
  scripts: Record<string, string>;
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  packageGenerator(plop);
}
