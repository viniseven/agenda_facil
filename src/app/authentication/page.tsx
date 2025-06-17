import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { auth } from "@/lib/auth";

import { SignInForm } from "./components/signInForm";
import { SignUpForm } from "./components/signUpForm";

const AuthenticationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/home");
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="account">Cadastre-se</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <SignInForm />
        </TabsContent>
        <TabsContent value="account">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthenticationPage;
