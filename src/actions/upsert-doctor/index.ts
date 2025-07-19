"use server";

import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { PrismaClient } from "../../../generated/prisma";
import { upsertDoctorSchema } from "./schema";

const prisma = new PrismaClient();

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      throw new Error("Usuário não autorizado");
    }

    if (!session.user.clinic?.id) {
      throw new Error("Clínica não encontrada");
    }

    await prisma.doctors.upsert({
      where: {
        id: session?.user.id,
      },
      update: {
        ...parsedInput,
        clinicId: session?.user.clinic?.id,
      },
      create: {
        ...parsedInput,
        clinicId: session?.user.clinic?.id,
      },
    });

    return { message: "Success" };
  });
