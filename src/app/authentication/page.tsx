import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignUpForm from "./components/signUpForm";
import SignInForm from "./components/signInForm";

const AuthPage = async () => {
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

export default AuthPage;
