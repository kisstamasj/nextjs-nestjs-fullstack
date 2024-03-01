import H1 from "@/components/H1";
import PageContainer from "@/components/PageContainer";
import PageHeaderContainer from "@/components/PageHeaderContainer";
import PageHeaderSeparator from "@/components/PageHeaderSeparator";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import UsersCreateForm from "../_components/users-create-form";

export const metadata = {
  title: "Admin | Felhasználók | Létrehozás",
};

export default function UsersPage() {
  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Felhasználó létrehozás</H1>
        <Button variant="link" className="p-0">
          <HelpCircle className="h-7 w-7" />
        </Button>
      </PageHeaderContainer>
      <PageHeaderSeparator />
      <UsersCreateForm />
    </PageContainer>
  );
}
