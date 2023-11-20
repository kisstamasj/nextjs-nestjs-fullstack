import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import PageHeaderContainer from "@/components/ui/PageHeaderContainer";
import PageHeaderSeparator from "@/components/ui/PageHeaderSeparator";
import fetchApi from "@/lib/fetchApi";
import { User } from "@/lib/types/user";

const getUser = async (): Promise<User> => {
  console.log('getUser requrest')
  return await fetchApi('/users/profile', 'get')
}

export default async function AdminHomePage() {
  const profile = await getUser()
  // console.log({profile})
  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Felhasználók</H1>
      </PageHeaderContainer>
      <PageHeaderSeparator />
      <div>{ profile ? profile.email : 'Felhasználók oldal oldal' }</div>
    </PageContainer>
  );
}
