import { Button, HStack } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import { useOpenModal } from "./useModal";

interface IRenderConfirmation {
  title?: string;
  onSubmit?: (key: any) => void | Promise<any>;
  submitText?: string;
  cancelText?: string;
}

interface ModalContentInterface {
  title: string;
  onSubmit: (key: any) => void | Promise<any>;
  submitText: string;
  cancelText: string;
  close: () => void;
}

const ModalContent = ({
  title,
  close,
  onSubmit,
  submitText,
  cancelText,
}: ModalContentInterface) => {
  const [disableButton, setDisabled] = useState(false);

  return (
    <div className="pt-4">
      <p className="mb-4 font-semibold text-xl text-center w-full">{title}</p>
      <HStack>
        <Button
          bg="gray.400"
          color="white"
          width="100%"
          type="button"
          onClick={close}
          disabled={disableButton}
        >
          {cancelText}
        </Button>
        <Button
          bg="brand.500"
          color="white"
          width="100%"
          _hover={{
            bg: "brand.600",
          }}
          onClick={() => {
            setDisabled(true);
            onSubmit(() => {
              close();
              setDisabled(false);
            });
          }}
          disabled={disableButton}
        >
          {submitText}
        </Button>
      </HStack>
    </div>
  );
};

const useConfirmationModal = (): ((key: IRenderConfirmation) => void) => {
  const openModal = useOpenModal();
  const renderConfirmation = useCallback(
    ({
      title = "Please confirm to proceed",
      onSubmit = (
        close = () => {
          // void func
        }
      ) => close(),
      submitText = "Confirm",
      cancelText = "Cancel",
    }) => {
      openModal({
        title: "",
        hideTitle: true,
        content: (close) => (
          <ModalContent
            close={close}
            title={title}
            onSubmit={onSubmit}
            submitText={submitText}
            cancelText={cancelText}
          />
        ),
      });
    },
    [openModal]
  );

  return renderConfirmation;
};

export default useConfirmationModal;
