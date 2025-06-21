import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import importPlugin from "eslint-plugin-import";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/node_modules/",
      ".next/",
      "dist/",
      "build/",
      "public/",
      "generated/",
      ".turbo/",
    ],
  },

  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["src/**/*.{js,jsx,ts,tsx,mjs}"],

    plugins: {
      "simple-import-sort": simpleImportSort,
      import: importPlugin,
    },

    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },

    languageOptions: {
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
  },
];

export default eslintConfig;
