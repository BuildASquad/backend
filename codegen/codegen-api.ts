import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'http://localhost:4242/graphql': {
        headers: {
        },
      },
    },
  ],
  // documents: ['src/**/*.ts'],
  generates: {
    'apps/backend/src/types/generated.ts': {
      plugins: ['typescript'],
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
