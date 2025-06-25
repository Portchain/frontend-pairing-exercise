// src/setupTests.ts
import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Runs a cleanup after each test case (e.g., unmounts React trees)
afterEach(() => {
  cleanup();
});
