import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription
        className="whitespace-break-spaces"
        dangerouslySetInnerHTML={{ __html: message }}
      ></AlertDescription>
    </Alert>
  );
};
