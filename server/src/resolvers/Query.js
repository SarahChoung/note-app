function noteList(parent, args, context) {
  return context.prisma.note.findMany();
}

module.exports = {
  noteList,
};
