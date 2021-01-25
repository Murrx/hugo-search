import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  testMatch: ["**/*.steps.ts", "**/*.spec.ts"],
};
export default config;
