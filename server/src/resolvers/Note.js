function postedBy(parent, args, context) {
  return context.prisma.note.findOne({ where: { id: parent.id } }).postedBy();
}

module.exports = {
  postedBy,
};
