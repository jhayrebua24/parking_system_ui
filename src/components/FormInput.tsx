import { FieldProps } from "formik";

import get from "lodash/get";
import has from "lodash/has";

import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface IFormInput extends FieldProps {
  [key: string]: any;
  type?: string;
  label?: string;
}

function FormInput({ field, form, label, ...props }: IFormInput): JSX.Element {
  const { errors, touched } = form;
  const { name } = field;

  const error = get(errors, name, undefined);
  const isTouched = has(touched, name);
  return (
    <FormControl id={name} isInvalid={!!error && isTouched}>
      {label && <FormLabel my="0">{label}</FormLabel>}
      <Input {...field} {...props} autoComplete="off" />
      <FormErrorMessage mt="0">{error}</FormErrorMessage>
    </FormControl>
  );
}

FormInput.defaultProps = {
  type: "text",
  label: "",
};
export default FormInput;
