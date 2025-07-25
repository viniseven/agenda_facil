"use server";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { PrismaClient } from "../../../generated/prisma";
import { upsertDoctorSchema } from "./schema";

const prisma = new PrismaClient();

dayjs.extend(utc);

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const availableFromTime = parsedInput.availableFromTime;
    const availableToTime = parsedInput.availableToTime;

    const availableFromTimeUTC = dayjs()
      .set("hour", parseInt(availableFromTime.split(":")[0]))
      .set("minute", parseInt(availableFromTime.split(":")[1]))
      .set("second", parseInt(availableFromTime.split(":")[2]))
      .utc();

    const availableToTimeUTC = dayjs()
      .set("hour", parseInt(availableToTime.split(":")[0]))
      .set("minute", parseInt(availableToTime.split(":")[1]))
      .set("second", parseInt(availableToTime.split(":")[2]))
      .utc();

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
        availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
        availableToTime: availableToTimeUTC.format("HH:mm:ss"),
      },
      create: {
        ...parsedInput,
        clinicId: session?.user.clinic?.id,
        availableFromTime: availableFromTimeUTC.format("HH:mm:ss"),
        availableToTime: availableToTimeUTC.format("HH:mm:ss"),
      },
    });

    return { message: "Success" };
  });
