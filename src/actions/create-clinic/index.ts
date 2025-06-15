"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from "../../../generated/prisma";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export const createClinic = async (name: string) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("Usuário não autorizado");
  }

  const clinic = await prisma.clinics.create({
    data: {
      name,
    },
  });

  await prisma.usersInClinics.create({
    data: {
      userId: session.user.id,
      clinicId: clinic.id,
    },
  });
  redirect("/home");
};
