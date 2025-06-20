import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { customSession } from "better-auth/plugins";

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
  plugins: [
    customSession(async ({ user, session }) => {
      const clinics = await prisma.usersInClinics.findMany({
        where: {
          userId: session.userId,
        },
        include: {
          clinic: true,
        },
      });
      const clinic = clinics?.[0];

      return {
        user: {
          ...user,
          clinic: clinic?.clinicId
            ? {
                id: clinic?.clinicId,
                name: clinic?.clinic?.name,
              }
            : undefined,
        },
        session,
      };
    }),
  ],
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
