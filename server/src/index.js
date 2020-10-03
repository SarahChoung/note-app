const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Note = require("./resolvers/Note");
const { PubSub } = require("graphql-yoga");
const Subscription = require("./resolvers/Subscription");

const pubsub = new PubSub();

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Note,
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
      pubsub,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
