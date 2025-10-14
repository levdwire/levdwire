import js from "@eslint/js"
import eslintConfigPrettier from "eslint-config-prettier"
import tseslint from "typescript-eslint"
import { config as baseConfig } from "./base.js"

/**
 * ESLint configuration tailored for libraries built with Levdwire
 *
 * @type {import("eslint").Linter.Config[]}
 */
export const levdwireConfig = [
  // Inherit shared base configuration
  ...baseConfig,

  // Core JavaScript linting rules from ESLint
  js.configs.recommended,

  // Disables ESLint rules that conflict with Prettier formatting
  eslintConfigPrettier,

  // Recommended rules for TypeScript projects
  ...tseslint.configs.recommended
]
