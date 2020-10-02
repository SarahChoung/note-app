async function postNote(parent, args, context, info) {
  return context.prisma.note.create({
    data: {
      title: args.title,
      description: args.description,
    },
  });
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

module.exports = {
  postNote,
  updateNote,
  deleteNote,
};
