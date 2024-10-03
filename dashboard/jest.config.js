module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/*.spec.js',
    '*.spec.js'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)'  // Adiciona exceção para 'axios'
  ]
}
