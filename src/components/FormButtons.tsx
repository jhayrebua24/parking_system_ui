import { Button, HStack } from "@chakra-ui/react";

interface Props {
  cancelText?: string;
  submitText?: string;
  onClose: () => void;
  isLoading?: boolean;
}

function FormButtons({
  cancelText,
  submitText,
  onClose,
  isLoading,
}: Props): JSX.Element {
  return (
    <HStack width="full" pt={3}>
      <Button
        isLoading={isLoading}
        type="button"
        onClick={onClose}
        width="full"
        disabled={isLoading}
      >
        {cancelText}
      </Button>
      <Button
        type="submit"
        isLoading={isLoading}
        disabled={isLoading}
        colorScheme="brand"
        width="full"
      >
        {submitText}
      </Button>
    </HStack>
  );
}

FormButtons.defaultProps = {
  cancelText: "Cancel",
  submitText: "Submit",
  isLoading: false,
};
export default FormButtons;
