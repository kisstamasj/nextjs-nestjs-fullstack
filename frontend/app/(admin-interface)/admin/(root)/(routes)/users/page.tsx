import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import PageHeaderContainer from "@/components/ui/PageHeaderContainer";
import PageHeaderSeparator from "@/components/ui/PageHeaderSeparator";
import { DataTable } from "../../../../../../components/data-table/data-table";
import { User, columns } from "./columns";
import fetchApi from "@/lib/fetchApi";

async function getUsers(): Promise<User[]> {
  return await fetchApi("/users");
}

export default async function AdminHomePage() {
  const data = await getUsers();
  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Felhasználók</H1>
      </PageHeaderContainer>
      <PageHeaderSeparator />
      <DataTable columns={columns} data={data} />
    </PageContainer>
  );
}
