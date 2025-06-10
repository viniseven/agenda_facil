import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { PrismaClient } from "../../../generated/prisma";
import { redirect } from "next/navigation";

import SignOutButton from "./components/button-signout";

const prisma = new PrismaClient();

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  const clinics = await prisma.usersInClinics.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      clinic: true,
    },
  });

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
    </div>
  );
};

export default HomePage;
