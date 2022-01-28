import { FieldProps } from "formik";

import get from "lodash/get";
import has from "lodash/has";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

interface IFormInput extends FieldProps {
  [key: string]: any;
  type?: string;
  label?: string;
}

function FormNumber({ field, form, label, ...props }: IFormInput): JSX.Element {
  const { errors, touched, setFieldValue } = form;
  const { name } = field;

  const error = get(errors, name, undefined);
  const isTouched = has(touched, name);
  return (
    <FormControl id={name} isInvalid={!!error && isTouched}>
      {label && <FormLabel my="0">{label}</FormLabel>}
      <NumberInput
        {...field}
        onChange={(val) => setFieldValue(name, val)}
        {...props}
      >
        <NumberInputField autoComplete="off" />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <FormErrorMessage mt="0">{error}</FormErrorMessage>
    </FormControl>
  );
}

FormNumber.defaultProps = {
  type: "text",
  label: "",
};
export default FormNumber;
