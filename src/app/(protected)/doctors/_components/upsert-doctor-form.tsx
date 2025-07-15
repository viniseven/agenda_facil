"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { toast } from "sonner";
import z from "zod";

import { upsertDoctor } from "@/actions/upsert-doctor";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { actionClient } from "@/lib/next-safe-action";

import { daysWeek } from "../_constants/day-week";
import { medicalSpecialties } from "../_constants/specialty";
import {
  availableTimeAfternoon,
  availableTimeMorning,
  availableTimeNight,
} from "../_constants/time-day";

const createDoctorSchema = z
  .object({
    name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
    speciality: z.string().trim(),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório" }),
    availableFromWeekDay: z.coerce.number(),
    availableToWeekDay: z.coerce.number(),
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

export const UpsertDoctorForm = () => {
  const form = useForm<z.infer<typeof createDoctorSchema>>({
    resolver: zodResolver(createDoctorSchema),
    defaultValues: {
      name: "",
      speciality: "",
      appointmentPriceInCents: 0,
      availableFromWeekDay: 0,
      availableToWeekDay: 0,
      availableFromTime: "",
      availableToTime: "",
    },
  });

  const upsertDoctorAction = actionClient.action(upsertDoctor, {
    onSucess: () => {
      toast.success("Médico adicionado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao adicionar médico");
    },
  });

  const onSubmit = (values: z.infer<typeof createDoctorSchema>) => {
    upsertDoctorAction(values);
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Adicionar médico</DialogTitle>
        <DialogDescription>Adicione um novo médico</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input placeholder="Insira o nome" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="speciality"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full hover:cursor-pointer">
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicalSpecialties.map((speciality) => (
                      <SelectItem
                        key={speciality.value}
                        value={speciality.value}
                        className="hover: cursor-pointer"
                      >
                        {speciality.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="appointmentPriceInCents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da consulta</FormLabel>
                <FormControl>
                  <NumericFormat
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value.floatValue);
                    }}
                    allowLeadingZeros
                    decimalSeparator=","
                    thousandSeparator="."
                    decimalScale={2}
                    fixedDecimalScale
                    customInput={Input}
                    prefix="R$"
                    placeholder="Insira o valor da consulta"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between gap-2">
            <FormField
              control={form.control}
              name="availableFromWeekDay"
              render={({ field }) => (
                <FormItem className="w-full hover:cursor-pointer">
                  <FormLabel>Dia inicial de disponibilidade</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione dia inicial" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysWeek.map((day) => (
                        <SelectItem
                          key={day.label}
                          value={day.value}
                          className="hover: cursor-pointer"
                        >
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="availableToWeekDay"
              render={({ field }) => (
                <FormItem className="w-full hover:cursor-pointer">
                  <FormLabel>Dia final de disponibilidade</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full hover:cursor-pointer">
                      <SelectValue placeholder="Selecione dia final" />
                    </SelectTrigger>
                    <SelectContent>
                      {daysWeek.map((day) => (
                        <SelectItem
                          key={day.label}
                          value={day.value}
                          className="hover: cursor-pointer"
                        >
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-between gap-2">
            <FormField
              control={form.control}
              name="availableFromTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Horário de início</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full hover:cursor-pointer">
                      <SelectValue
                        placeholder="Selecione horário de início"
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Manhã</SelectLabel>
                        {availableTimeMorning.map((available) => (
                          <SelectItem
                            key={available.value}
                            value={available.value}
                            className="hover: w-full cursor-pointer"
                          >
                            {available.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Tarde</SelectLabel>
                        {availableTimeAfternoon.map((available) => (
                          <SelectItem
                            key={available.value}
                            value={available.value}
                            className="hover: w-full cursor-pointer"
                          >
                            {available.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Noite</SelectLabel>
                        {availableTimeNight.map((available) => (
                          <SelectItem
                            key={available.value}
                            value={available.value}
                            className="hover: w-full cursor-pointer"
                          >
                            {available.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availableToTime"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Horário de Término</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger className="w-full hover:cursor-pointer">
                      <SelectValue
                        placeholder="Selecione horário de término"
                        {...field}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Manhã</SelectLabel>
                        {availableTimeMorning.map((available) => (
                          <SelectItem
                            key={available.value}
                            value={available.value}
                            className="hover: w-full cursor-pointer"
                          >
                            {available.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Tarde</SelectLabel>
                        {availableTimeAfternoon.map((available) => (
                          <SelectItem
                            key={available.value}
                            value={available.value}
                            className="hover: w-full cursor-pointer"
                          >
                            {available.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Noite</SelectLabel>
                        {availableTimeNight.map((available) => (
                          <SelectItem
                            key={available.value}
                            value={available.value}
                            className="hover: w-full cursor-pointer"
                          >
                            {available.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <DialogFooter>
            <Button className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  Adicionando médico
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                </>
              ) : (
                "Adicionar médico"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};
function useAction(upsertDoctor: unknown) {
  throw new Error("Function not implemented.");
}
