import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

//const FRONTEND_PORT = process.env.PORT;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
