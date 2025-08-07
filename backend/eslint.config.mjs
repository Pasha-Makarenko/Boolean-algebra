// @ts-check
import eslint from "@eslint/js"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  {
    ignores: [
      "eslint.config.mjs",
      "./dist/**",
      "./node_modules/**",
      "./migrations/**",
      "./models/**",
      "./config/**",
      "./jest.config.js"
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest
      },
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    rules: {
      "prettier/prettier": "warn",
      "@typescript-eslint/no-unused-vars": "off"
    }
  }
)
