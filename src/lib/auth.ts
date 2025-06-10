import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "../../generated/prisma";
import * as schema from "../../generated/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "sqlite",
  }),
  emailAndPassword: {
    enabled: true,
    schema,
  },
  user: {
    modelName: "Users",
  },
  session: {
    modelName: "Sessions",
  },
  account: {
    modelName: "Accounts",
  },
  verification: {
    modelName: "Verifications",
  },
});
