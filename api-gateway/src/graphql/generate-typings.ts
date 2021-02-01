import { join } from 'path';
import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();

void definitionsFactory.generate({
  typePaths: [join(__dirname, './schema/schema.graphql')],
  path: join(__dirname, 'typings.ts'),
  watch: false,
});
