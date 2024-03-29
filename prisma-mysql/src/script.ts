import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Alice",
  //     email: "alice@prisma.io",
  //   },
  // });

  // step2
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Bob",
  //     email: "bob@prisma.io",
  //     posts: {
  //       create: {
  //         title: "Hello World",
  //       },
  //     },
  //   },
  // });
  // console.log(user);

  // step3
  const usersWithPosts = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.dir(usersWithPosts, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
