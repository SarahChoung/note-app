function newNoteSubscribe(parent, args, context, info) {
  return context.pubsub.asyncIterator("NEW_NOTE");
}

const newNote = {
  subscribe: newNoteSubscribe,
  resolve: (payload) => {
    return payload;
  },
};

module.exports = {
  newNote,
};
