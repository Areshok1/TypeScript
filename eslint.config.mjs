import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
      parser: "@typescript-eslint/parser",
      parserOptions: {
        tsconfigRootDir: "./",
        project: "./tsconfig.json",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": pluginJs.configs.recommended.plugins["@typescript-eslint"],
      "react": pluginReact,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
];
