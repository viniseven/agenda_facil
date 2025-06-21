export enum MedicalSpecialty {
  CARDIOLOGIA = "Cardiologia",
  DERMATOLOGIA = "Dermatologia",
  GINECOLOGIA = "Ginecologia e Obstetrícia",
  OFTALMOLOGIA = "Oftalmologia",
  ORTOPEDIA = "Ortopedia e Traumatologia",
  PEDIATRIA = "Pediatria",
  PSIQUIATRIA = "Psiquiatria",
  ENDOCRINOLOGIA = "Endocrinologia",
  NEUROLOGIA = "Neurologia",
  OTORRINOLARINGOLOGIA = "Otorrinolaringologia",
  UROLOGIA = "Urologia",
  CLINICA_GERAL = "Clínica Geral",
}

export const medicalSpecialties = Object.entries(MedicalSpecialty).map(
  ([key, value]) => ({
    value: MedicalSpecialty[key as keyof typeof MedicalSpecialty],
    label: value,
  }),
);
