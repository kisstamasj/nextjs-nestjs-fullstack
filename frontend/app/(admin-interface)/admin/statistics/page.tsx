import H1 from "@/components/H1";
import PageContainer from "@/components/PageContainer";
import PageHeaderContainer from "@/components/PageHeaderContainer";
import PageHeaderSeparator from "@/components/PageHeaderSeparator";

export const metadata = {
  title: "Admin - Statisztika",
};

const AdminHomePage = () => {
  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Statisztika</H1>
      </PageHeaderContainer>
      <PageHeaderSeparator />
      <div>Statisztika oldal</div>
    </PageContainer>
  );
};

export default AdminHomePage;
