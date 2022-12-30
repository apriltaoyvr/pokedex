import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'graphql/schema.graphql',
  documents: ['./pages/api/graphql.tsx'],
  generates: {
    'graphql/codegen/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations'],
      presetConfig: {
        gqlTagName: 'gql',
      },
    },
  },
};

export default config;
