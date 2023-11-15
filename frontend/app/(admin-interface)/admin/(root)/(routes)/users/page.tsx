import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import PageHeaderContainer from "@/components/ui/PageHeaderContainer";
import PageHeaderSeparator from "@/components/ui/PageHeaderSeparator";
import { BACKEND_URL } from "@/lib/constants";
import { User } from "@/lib/types/user";
import { getServerSession } from "next-auth";

const getUser = async (): Promise<User> => {
  console.log('getUser requrest')
  const session = await getServerSession(authOptions);
  const response = await fetch(BACKEND_URL +`/users/profile`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  })

  return await response.json()
}

export default async function AdminHomePage() {
  const session = await getServerSession(authOptions);
  const response = await fetch(BACKEND_URL +`/users/profile`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${session?.backendTokens.accessToken}`,
      "Content-Type": "application/json",
    },
  })

  const profile = await response.json() as User
  console.log({profile})
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
