import { fileURLToPath, URL } from "node:url";

import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  base: "./",
  server: {
    port: 8000,
    proxy: {
      '/api/': {
        // target: `https://sdk-preview.sofunny.io`,
        target: `http://localhost:3000/`,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // target: `http://10.30.60.81:9080`,
        // target: `http://${config.VITE_APP_SERVER}:${config.VITE_APP_SERVER_PORT}`,
        changeOrigin: true,
      },
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
