import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import PageHeaderContainer from "@/components/ui/PageHeaderContainer";
import PageHeaderSeparator from "@/components/ui/PageHeaderSeparator";

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
}

export default AdminHomePage;