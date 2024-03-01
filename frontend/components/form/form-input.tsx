import { UseFormReturn } from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";

interface FormInputProps {
  name: string;
  label: string;
  inputProps?: InputProps;
  form: UseFormReturn<any, any, any>;
}

export const FormInput = ({
  name,
  label,
  form,
  inputProps,
}: FormInputProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} autoComplete={field.name} {...inputProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
