const { getUserId } = require("../utils");

function noteList(parent, args, context) {
  const userId = getUserId(context);

  return context.prisma.note.findMany({
    where: { postedById: userId },
  });
}

module.exports = {
  noteList,
};
