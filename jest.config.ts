import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: "./",
});

const config: Config = {
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^@/assets/(.*)$": "<rootDir>/src/shared/assets/$1",
        "^@/img/(.*)$": "<rootDir>/public/img/$1",
    },
    testEnvironment: "jest-fixed-jsdom",
    testEnvironmentOptions: {
        customExportConditions: [""],
    },
    setupFilesAfterEnv: ["<rootDir>./tests/setup.ts"],
};

export default createJestConfig(config);
