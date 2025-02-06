import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    coverageDirectory: "coverage",
    coverageProvider: "v8",
};

export default createJestConfig(config);
