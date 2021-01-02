module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb-base", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "import/no-unresolved": 0,
    "no-irregular-whitespace": 0,
    "global-require": 0,
    "import/extensions": 0,
    "no-console": 0,
    "no-use-before-define": 0,
    "lines-between-class-members": 0,
  },
};
