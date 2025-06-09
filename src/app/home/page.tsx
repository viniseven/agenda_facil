import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { PrismaClient } from "@/../../generated/prisma";

const prisma = new PrismaClient();

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const clinics = await prisma.usersInClinics.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      clinic: true,
    },
  });

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
    </div>
  );
};

export default HomePage;
