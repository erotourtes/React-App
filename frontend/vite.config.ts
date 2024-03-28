import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    base: "/React-App/",
    optimizeDeps: {
      include: ["@shared/dtos"],
    },
    build: {
      commonjsOptions: {
        ignore: ["@shared/dtos"],
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
      "process.env.API_URL": JSON.stringify(env.API_URL),
    },
  };
});
