import { CheckCircleIcon } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <Alert variant="default" className="bg-emerald-100 text-emerald-800">
      <CheckCircleIcon className="h-4 w-4" color="green" />
      <AlertDescription>
        <p
          className="break-words"
          dangerouslySetInnerHTML={{ __html: message }}
        ></p>
      </AlertDescription>
    </Alert>
  );
};
