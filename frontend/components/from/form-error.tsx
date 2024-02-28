import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { RequestErrorMessage } from "@/types/errors";

interface FormErrorProps {
  message?: RequestErrorMessage;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  if(Array.isArray(message)){
    return (
      message.map((message, index) => (
        <Alert key={index} variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription
            className="whitespace-break-spaces"
            dangerouslySetInnerHTML={{ __html: message.message }}
          ></AlertDescription>
        </Alert>
      ))
    )
  }

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
