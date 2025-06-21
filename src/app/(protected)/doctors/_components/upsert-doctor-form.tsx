"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { medicalSpecialties } from "../_constants";

const createDoctorSchema = z.object({
  name: z.string().trim().min(2, { message: "Nome é obrigatório" }),
  speciality: z
    .string()
    .trim()
    .min(2, { message: "Especialidade é obrigatório" }),
  appointmentPriceInCents: z
    .number()
    .min(1, { message: "Preço da consulta é obrigatório" }),
  availableFromWeekDay: z.number(),
  availableToWeekDay: z.number(),
  availableFromTime: z
    .string()
    .min(1, { message: "Hora de início é obrigatória" }),
  availableToTime: z
    .string()
    .min(1, { message: "Hora de término é obrigatória" }),
});

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

  async function onSubmit(values: z.infer<typeof createDoctorSchema>) {
    console.log(values);
  }

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Especialidade</FormLabel>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione uma especialidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {medicalSpecialties.map((speciality) => (
                      <SelectItem
                        key={speciality.value}
                        value={speciality.value}
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
