/**
 * @type {import("jest").Config}
 */

module.exports = {
  moduleFileExtensions: ["js", "json", "ts"],
  rootDir: "test",
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": [
      "ts-jest",
      {
        tsconfig: "./tsconfig.spec.json"
      }
    ]
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  coverageDirectory: "../coverage",
  testEnvironment: "node",
  setupFiles: ["<rootDir>/../jest.setup.ts"]
}
