import PageContainer from "@/components/PageContainer";
import PageHeaderContainer from "@/components/PageHeaderContainer";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHeaderSeparator from "@/components/PageHeaderSeparator";
import H1 from "@/components/H1";

export default async function UsersPage({params}: {params: {id: string}}) {
  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Felhasználó módosítás</H1>
        <Button variant="link" className="p-0">
          <HelpCircle className="h-7 w-7" />
        </Button>
      </PageHeaderContainer>
      <PageHeaderSeparator />
    </PageContainer>
  );
}
