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
import { Plus } from "lucide-react";

const DoctorsPage = () => {
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
          <Button>
            <Plus />
            Adicionar médico
          </Button>
        </PageHeaderButtonActions>
      </PageHeaderContainer>
      <PageContent>Olá</PageContent>
    </PageContainer>
  );
};

export default DoctorsPage;
