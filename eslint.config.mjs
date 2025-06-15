import { FlatCompat } from "@eslint/eslintrc";
import simpleImportSort, { languages } from "eslint-plugin-simple-import-sort";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

import { dirname } from "path";

const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx", "**/*.mjs"],
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
    },

    languageOptions.parserOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
  },
];

export default eslintConfig;
