import { config } from '@keystone-6/core';
import { lists } from './schema';
import { insertSeedData } from './seed-data';

export default config({
  db: {
    provider: 'sqlite',
    url: process.env.DATABASE_URL || 'file:./keystone-example.db',
    async onConnect_off(context) {
      console.log(context.withSession);
      throw 123;
      console.log(
        // await context.prisma.post.findMany({
        //   where: {
        //     author: {
        //       is: null,
        //     },
        //   },
        // })
        await context.prisma.author.findMany({
          where: {
            posts: {
              none: {},
            },
          },
        })
      );

      if (process.argv.includes('--seed-data')) {
        await insertSeedData(context);
      }
    },
  },
  lists,
});
