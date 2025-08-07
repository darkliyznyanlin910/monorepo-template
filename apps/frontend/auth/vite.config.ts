import path from "path";
import tanstackRouter from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      tanstackRouter({
        target: "react",
      }),
      react(),
    ],
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "./src"),
        "@repo/ui": path.resolve(__dirname, "../../../packages/ui/src"),
      },
    },
    server: {
      port: 4000,
      open: false,
      proxy: {
        "/api": {
          target: "http://localhost:4001",
          changeOrigin: false,
        },
      },
      allowedHosts: [
        "localhost",
        "127.0.0.1",
        "auth.127.0.0.1.nip.io",
        "socat.services.svc.cluster.local",
      ],
    },
    define: {
      process: {
        env: env,
      },
    },
    build: {
      outDir: "dist/static",
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, "index.html"),
          404: path.resolve(__dirname, "404.html"),
        },
      },
    },
  };
});
