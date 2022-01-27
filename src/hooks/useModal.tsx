import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import isEmpty from "lodash/isEmpty";
import { createContext, useContext, useState } from "react";

interface IModalData {
  title?: string;
  hideTitle?: boolean;
  size?: string;
  content?: (key: any) => React.ReactNode | undefined;
}

interface IModalContext {
  openModal: (key: any) => any;
}

export const ModalContext = createContext<IModalContext>({
  openModal: () => null,
});

export const useOpenModal = (): ((key: IModalData) => any) => {
  const { openModal } = useContext(ModalContext);
  return openModal;
};

interface IModalProvider {
  children: JSX.Element;
}

export const ModalProvider = ({ children }: IModalProvider): JSX.Element => {
  const [modalData, setModalData] = useState<IModalData>({});
  const handleClose = () => {
    setModalData({});
  };
  const openModal = (props: IModalData) => setModalData(props);
  return (
    <ModalContext.Provider
      value={{
        openModal,
      }}
    >
      <Modal
        size={modalData?.size || "md"}
        onClose={handleClose}
        isOpen={!isEmpty(modalData)}
      >
        <ModalOverlay />
        <ModalContent>
          {!modalData?.hideTitle && (
            <>
              <ModalHeader>{modalData?.title || "-"}</ModalHeader>
              <ModalCloseButton />
            </>
          )}
          <ModalBody mb={4}>
            {modalData?.content && modalData?.content(() => setModalData({}))}
          </ModalBody>
        </ModalContent>
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};
