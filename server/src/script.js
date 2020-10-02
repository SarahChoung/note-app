const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // const newNote = await prisma.note.create({
  //   data: {
  //     title: "testing prisma",
  //     description: "please work",
  //   },
  // });

  // const secondNote = await prisma.note.create({
  //   data: {
  //     title: "delete this",
  //     description: "please work",
  //   },
  // });

  const deleteNote = await prisma.note
    .delete({
      where: { id: 6 },
    })
    .catch((err) => console.error(err));

  // const deleteNotes = await prisma.note.deleteMany();
  const allNotes = await prisma.note.findMany();
  console.log(allNotes);
}

main()
  .catch((e) => {
    throw e;
  })
  // 5
  .finally(async () => {
    await prisma.$disconnect();
  });
