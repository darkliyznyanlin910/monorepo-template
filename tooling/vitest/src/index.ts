import { ViteUserConfig } from "vitest/config";

export const sharedConfig: ViteUserConfig = {
  test: {
    globals: true,
    coverage: {
      provider: "istanbul" as const,
      reporter: [
        [
          "json",
          {
            file: `../coverage.json`,
          },
        ],
      ] as const,
      enabled: true,
    },
  },
};

// Re-export specific configs for backwards compatibility
export { baseConfig } from "./configs/base-config";
export { uiConfig } from "./configs/ui-config";
