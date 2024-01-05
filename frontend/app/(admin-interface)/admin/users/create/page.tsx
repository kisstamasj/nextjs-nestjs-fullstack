
import PageContainer from "@/components/PageContainer";
import PageHeaderContainer from "@/components/PageHeaderContainer";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import UsersForm from "../components/form";
import PageHeaderSeparator from "@/components/PageHeaderSeparator";
import H1 from "@/components/H1";

export default async function UsersPage() {
  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Felhasználó létrehozás</H1>
        <Button variant="link" className="p-0">
          <HelpCircle className="h-7 w-7" />
        </Button>
      </PageHeaderContainer>
      <PageHeaderSeparator />
      <UsersForm />
    </PageContainer>
  );
}
