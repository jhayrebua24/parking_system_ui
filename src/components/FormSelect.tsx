import { FieldProps } from "formik";

import get from "lodash/get";
import has from "lodash/has";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { Children } from "react";

interface IFormSelect extends FieldProps {
  [key: string]: any;
  type?: string;
  label?: string;
  placeholder?: string;
  options: {
    label: string | number;
    value: string | number;
  }[];
}

function FormSelect({
  field,
  form,
  label,
  options,
  placeholder,
  ...props
}: IFormSelect): JSX.Element {
  const { errors, touched } = form;
  const { name } = field;

  const error = get(errors, name, undefined);
  const isTouched = has(touched, name);
  return (
    <FormControl id={name} isInvalid={!!error && isTouched}>
      {label && <FormLabel my="0">{label}</FormLabel>}
      <Select
        {...field}
        {...props}
        onChange={field?.onChange}
        defaultValue={field?.value}
        autoComplete="off"
      >
        <option disabled={field?.value} value="">
          {placeholder}
        </option>
        {Children.toArray(
          options?.map((opt) => <option value={opt.value}>{opt.label}</option>)
        )}
      </Select>
      <FormErrorMessage mt="0">{error}</FormErrorMessage>
    </FormControl>
  );
}

FormSelect.defaultProps = {
  type: "text",
  placeholder: "Select",
  label: "",
};
export default FormSelect;
