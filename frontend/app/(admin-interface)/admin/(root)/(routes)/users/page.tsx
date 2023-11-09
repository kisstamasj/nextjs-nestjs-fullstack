import H1 from "@/components/ui/H1";
import PageContainer from "@/components/ui/PageContainer";
import PageHeaderContainer from "@/components/ui/PageHeaderContainer";
import PageHeaderSeparator from "@/components/ui/PageHeaderSeparator";



export default function AdminHomePage() {
  return (
    <PageContainer>
      <PageHeaderContainer>
        <H1>Felhasználók</H1>
      </PageHeaderContainer>
      <PageHeaderSeparator />
      <div>Felhasználók oldal oldal</div>
    </PageContainer>
  );
}
