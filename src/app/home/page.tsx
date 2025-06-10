import { auth } from "@/lib/auth";
import { headers } from "next/headers";
<<<<<<< HEAD
import { PrismaClient } from "../../../generated/prisma";
import { redirect } from "next/navigation";

import SignOutButton from "./components/button-signout";
=======

import { PrismaClient } from "@/../../generated/prisma";
>>>>>>> d4b64951d5159d338f337bcfd12b21ce97674502

const prisma = new PrismaClient();

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
<<<<<<< HEAD

  if (!session) {
    redirect("/authentication");
  }

  const clinics = await prisma.usersInClinics.findMany({
    where: {
      userId: session?.user.id,
=======
  const clinics = await prisma.usersInClinics.findMany({
    where: {
      userId: session?.user?.id,
>>>>>>> d4b64951d5159d338f337bcfd12b21ce97674502
    },
    include: {
      clinic: true,
    },
  });

<<<<<<< HEAD
  return (
    <div>
      <h1>Olá Mundo</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
      <p>
        {clinics.map((clinic) => (
          <p>{clinic.clinic.name}</p>
        ))}
      </p>
      <SignOutButton />
=======
  console.log(clinics);

  return (
    <div>
      <h1>Olá Mundo</h1>
      <p>
        {clinics.map((clinic) => (
          <li>{clinic.clinic.name}</li>
        ))}
      </p>
      <p>{session?.user?.name}</p>
>>>>>>> d4b64951d5159d338f337bcfd12b21ce97674502
    </div>
  );
};

export default HomePage;
