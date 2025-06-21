import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  PageContainer,
  PageContent,
  PageHeaderButtonActions,
  PageHeaderContainer,
  PageHeaderContent,
  PageHeaderDescription,
  PageHeaderTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

import { AddDoctorButton } from "./_components/add-doctor-button";

const DoctorsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/authentication");
  }

  return (
    <PageContainer>
      <PageHeaderContainer>
        <PageHeaderContent>
          <PageHeaderTitle>Médicos</PageHeaderTitle>
          <PageHeaderDescription>
            Gerencie os médicos de sua clínica
          </PageHeaderDescription>
        </PageHeaderContent>
        <PageHeaderButtonActions>
          <AddDoctorButton />
        </PageHeaderButtonActions>
      </PageHeaderContainer>
      <PageContent>Olá</PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
