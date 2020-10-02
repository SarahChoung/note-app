const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => `This is Sarah's fart app`,
    noteList: async (parent, args, context) => {
      return context.prisma.note.findMany();
    },
  },

  Mutation: {
    post: (parent, args, context, info) => {
      const newNote = context.prisma.note.create({
        data: {
          title: args.title,
          description: args.description,
        },
      });
      return newNote;
    },
    update: (parent, args, context, info) => {
      const updatedNote = context.prisma.note
        .update({
          where: { id: args.id },
          data: {
            title: args.title,
            description: args.description,
          },
        })
        .catch((err) => console.error(err));
      return updatedNote;
    },
    delete: (parent, args, context, info) => {
      const deleteNote = context.prisma.note
        .delete({
          where: { id: args.id },
        })
        .catch((err) => console.error(err));
      return deleteNote;
    },
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
