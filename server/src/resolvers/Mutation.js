const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function postNote(parent, args, context, info) {
  const userId = getUserId(context);

  const newNote = context.prisma.note.create({
    data: {
      title: args.title,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubsub.publish("NEW_NOTE", newNote);
  return newNote;
}

async function updateNote(parent, args, context, info) {
  return context.prisma.note
    .update({
      where: { id: args.id },
      data: {
        title: args.title,
        description: args.description,
      },
    })
    .catch((err) => console.error(err));
}

async function deleteNote(parent, args, context, info) {
  return context.prisma.note
    .delete({
      where: { id: args.id },
    })
    .catch((err) => console.error(err));
}

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

module.exports = {
  postNote,
  updateNote,
  deleteNote,
  signup,
  login,
};
