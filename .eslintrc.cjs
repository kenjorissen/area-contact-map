module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true
  },
  extends: ["eslint:recommended"],
  plugins: ["html"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "script"
  },
  globals: {
    L: "readonly"
  },
  rules: {
    "no-console": "off",
    "no-empty": "off"
  }
};
