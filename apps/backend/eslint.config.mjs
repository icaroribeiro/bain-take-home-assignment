import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintConfigPrettier,
  {
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ["*.js", "*.mjs", "*.ts"],
        },
        project: ["./tsconfig.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    ignores: ["eslint.config.mjs", "webpack.prod.js", "webpack.dev.js"],
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-unsafe-assignment": ["off"],
      "@typescript-eslint/no-unsafe-argument": ["off"],
      "@typescript-eslint/no-unsafe-call": ["off"],
      "@typescript-eslint/no-unsafe-return": ["off"],
      "@typescript-eslint/no-misused-promises": ["off"],
      "@typescript-eslint/require-await": ["off"],
      "@typescript-eslint/no-unused-vars": ["off"],
    },
  },
);
