// @ts-check

/**
 * @type {import('prettier').Config}
 */

export default {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  printWidth: 120,
  singleQuote: true,
  trailingComma: 'none',
  jsxSingleQuote: true,
  tailwindStylesheet: './site/src/styles/index.css',
  tailwindFunctions: ['clsx']
};
