import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <h1>Olá Mundo</h1>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.name}</p>
    </div>
  );
};

export default HomePage;
