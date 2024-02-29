import H1 from "@/components/H1";
import PageContainer from "@/components/PageContainer";
import PageHeaderContainer from "@/components/PageHeaderContainer";
import PageHeaderSeparator from "@/components/PageHeaderSeparator";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
import UsersUpdateForm from "../_components/users-update-form";
import { createAxiosServerSide } from "@/lib/axios";

export default async function UsersPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const axios = await createAxiosServerSide({ withCredentials: true });
  const { data: user } = await axios.get(`/users/${id}`);

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
