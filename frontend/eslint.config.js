// @ts-check
const eslint = require("@eslint/js")
const tseslint = require("typescript-eslint")
const angular = require("angular-eslint")
const unusedImports = require("eslint-plugin-unused-imports")
const prettier = require("eslint-config-prettier")
const prettierPlugin = require("eslint-plugin-prettier")

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    plugins: {
      "unused-imports": unusedImports,
      prettier: prettierPlugin
    },
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      prettier
    ],
    processor: angular.processInlineTemplates,
    rules: {}
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility
    ],
    rules: {}
  }
)
