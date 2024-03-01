import PageContainer from "@/components/PageContainer";
import { Loader } from "@/components/loader";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <PageContainer>
      <div className="w-full h-full flex items-center justify-center">
        <Loader />
      </div>
    </PageContainer>
  );
};

export default Loading;
