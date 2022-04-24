const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { compilerOptions } = require("./tsconfig.json");

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
  prefix: "<rootDir>/",
});

module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
  transformIgnorePatterns: ["^.+\\.js$"],
  moduleNameMapper,
  silent: true,
  collectCoverage: true,
  coverageReporters: ["lcov", "cobertura"],
  coverageDirectory: "<rootDir>/coverage/my-app",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "./coverage",
        outputName: "TESTS-my-app.xml",
      },
    ],
  ],
};