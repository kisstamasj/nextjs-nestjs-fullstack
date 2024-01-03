import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import PageHeaderContainer from "@/components/ui/PageHeaderContainer";
import PageHeaderSeparator from "@/components/ui/PageHeaderSeparator";
import { User, columns } from "./columns";
import fetchApi from "@/lib/fetchApi";
import { UsersDataTable } from "./data-table";
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

async function getUsers(): Promise<User[]> {
  return await fetchApi("/users");
}

export default async function UsersPage() {
  const data = await getUsers();
  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Felhasználók</H1>
        <Button variant="link" className="p-0">
          <HelpCircle className="h-7 w-7" />
        </Button>
      </PageHeaderContainer>
      <PageHeaderSeparator />
      <UsersDataTable columns={columns} data={data} />
    </PageContainer>
  );
}
