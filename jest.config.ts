import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    coverageDirectory: "coverage",
    coverageProvider: "v8",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    testEnvironment: "jsdom",
    verbose: true,
    moduleNameMapper: {
        "^@/lib/(.*)$": "<rootDir>/lib/$1",
        "^@/components/(.*)$": "<rootDir>/components/$1",
        "^@/hooks/(.*)$": "<rootDir>/hooks/$1",
        "^@/utils/(.*)$": "<rootDir>/utils/$1",
    },
};

export default createJestConfig(config);
