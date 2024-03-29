import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/React-App/",
    optimizeDeps: {
      include: ["@packages/types"],
    },
    build: {
      rollupOptions: {
        plugins: [commonjs()],
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@redux": path.resolve(__dirname, "./src/redux"),
        "@components": path.resolve(__dirname, "./src/components"),
      },
    },
    define: {
      "process.env.BASE_API_URL": JSON.stringify(env.BASE_API_URL),
      "process.env.HTTP_PROTOCOL": JSON.stringify(env.HTTP_PROTOCOL),
      "process.env.WS_PROTOCOL": JSON.stringify(env.WS_PROTOCOL),
    },
  };
});
