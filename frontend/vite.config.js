import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

//const FRONTEND_PORT = process.env.PORT;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5400,
  },
});
