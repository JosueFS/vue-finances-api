const { ApolloServer, gql } = require('apollo-server');
const { importSchema } = require('graphql-import');
const Binding = require('prisma-binding');
const { prisma } = require('./generated/prisma-client');

const resolvers = require('./resolvers');

const importedTypeDefs = importSchema(__dirname + '/schema.graphql');
const typeDefs = gql`
  ${importedTypeDefs}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (request) => ({
    ...request,
    db: new Binding.Prisma({
      typeDefs: `${__dirname}/generated/graphql-schema/prisma.graphql`,
      endpoint: process.env.PRISMA_ENDPOINT,
    }),
    prisma,
  }),
});

server
  .listen({ port: 4000 }, () =>
    console.log('Server running on http://localhost:4000')
  )
  .catch((e) => console.error(e));
