import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier'

const eslintConfig = defineConfig([
  ...nextVitals,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),

  prettier,

  {
    rules: {
      'no-console': 'warn', // Warn on console.log
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], // Allow unused args starting with _
    },
  },
])

export default eslintConfig
