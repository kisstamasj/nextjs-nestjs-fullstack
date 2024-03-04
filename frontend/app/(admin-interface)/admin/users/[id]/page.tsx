import H1 from "@/components/H1";
import PageContainer from "@/components/PageContainer";
import PageHeaderContainer from "@/components/PageHeaderContainer";
import PageHeaderSeparator from "@/components/PageHeaderSeparator";
import { Button } from "@/components/ui/button";
import { fetchDataServerSide } from "@/lib/axios";
import { HelpCircle } from "lucide-react";
import UsersUpdateForm from "../_components/users-update-form";

// No cache for this page
export const revalidate = 0;

export const metadata = {
  title: "Admin | Felhasználók | Módosítás",
};

export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const user = await fetchDataServerSide(`/users/${id}`);

  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Felhasználó módosítás</H1>
        <Button variant="link" className="p-0">
          <HelpCircle className="h-7 w-7" />
        </Button>
      </PageHeaderContainer>
      <PageHeaderSeparator />
      <UsersUpdateForm defaultValues={user} id={id} />
    </PageContainer>
  );
}
