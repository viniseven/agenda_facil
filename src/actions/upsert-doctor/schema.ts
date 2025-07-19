import z from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
    speciality: z.string().trim().optional(),
    avatarImgUrl: z.string().optional(),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório" }),
    availableFromWeekDay: z.number(),
    availableToWeekDay: z.number(),
    availableFromTime: z.string(),
    availableToTime: z.string(),
  })
  .refine(
    (data) => {
      return data.availableToTime > data.availableFromTime;
    },
    {
      message: "Horário de término não pode ser anterior ao horário de início",
      path: ["availableToTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;
