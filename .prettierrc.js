module.exports = {
  printWidth: 120,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  semi: true,
  bracketSpacing: true,
  trailingComma: 'none',
  overrides: [
    {
      files: ['*.html'],
      options: {
        parser: 'angular',
        htmlWhitespaceSensitivity: 'ignore',
        semi: false
      }
    }
  ]
};
