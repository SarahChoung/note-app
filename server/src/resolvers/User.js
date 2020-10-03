function notes(parent, args, context) {
  return context.prisma.user.findOne({ where: { id: parent.id } }).notes();
}

module.exports = {
  notes,
};
