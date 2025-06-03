import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignUpForm from "./components/signUpForm";
import SignInForm from "./components/signInForm";

const AuthPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Tabs defaultValue="account">
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
