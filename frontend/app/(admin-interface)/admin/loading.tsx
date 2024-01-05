import PageContainer from "@/components/PageContainer";
import { Loader2 } from "lucide-react";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <PageContainer>
      <div className="w-full h-full flex items-center justify-center animate-spin">
        <Loader2 className="w-20 h-20" />
      </div>
    </PageContainer>
  );
};

export default Loading;
