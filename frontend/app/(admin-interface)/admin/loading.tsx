import PageContainer from "@/components/PageContainer";
import { Loader } from "@/components/loader";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader />
    </div>
  );
};

export default Loading;
