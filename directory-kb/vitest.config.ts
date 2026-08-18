import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    // DB-backed tests share seeded fixtures; keep them on one worker.
    pool: "forks",
    fileParallelism: false,
    testTimeout: 30000,
  },
});
