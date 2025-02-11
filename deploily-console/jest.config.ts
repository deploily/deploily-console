import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  // testEnvironment: "jsdom",
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    // "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Ensure correct alias resolution
  },
  transformIgnorePatterns: [
    'node_modules/(?!(antd)/)',
    "/node_modules/(?!(antd|@babel/runtime)/)", // Allow Jest to transform Ant Design & Babel helpers
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"], // Add Jest setup file if needed
  preset: 'ts-jest',
};

export default createJestConfig(config);

// Add any custom config to be passed to Jest
const asyncConfig = createJestConfig(config);

// and wrap it...
module.exports = async () => {
  const config = await asyncConfig();
  config.transformIgnorePatterns = [
    // ...your ignore patterns
  ];
  return config;
};
