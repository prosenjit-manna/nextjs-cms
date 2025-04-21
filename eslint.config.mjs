import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // custom rules 
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Warns when 'any' is used
      "@typescript-eslint/explicit-module-boundary-types": "warn", // Warns when functions lack explicit return types
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // Warns for unused variables, ignoring those prefixed with '_'
      "@typescript-eslint/strict-boolean-expressions": "warn", // Encourages stricter boolean expressions
      "@typescript-eslint/no-inferrable-types": "warn", // Warns when types are unnecessarily specified
    },
  }
];

export default eslintConfig;
