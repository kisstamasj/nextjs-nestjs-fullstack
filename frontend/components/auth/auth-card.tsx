import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { BackButton } from "./back-button";

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
  backLabel: string;
  backHref: string;
}

export const AuthCard = ({
  children,
  title,
  backLabel,
  backHref,
}: AuthCardProps) => {
  return (
    <Card className="w-full border-0 sm:border sm:h-auto sm:w-[400px] shadow-none sm:shadow-md">
      <CardHeader>
        <CardTitle className="text-5xl font-bold text-center">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backLabel} href={backHref} />
      </CardFooter>
    </Card>
  );
};
