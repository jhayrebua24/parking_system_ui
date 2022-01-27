import { useToast } from "@chakra-ui/react";

export const useSuccessToast = (): ((key: string) => void) => {
  const toast = useToast();
  const renderToast = (title = "") => {
    toast({
      position: "top",
      status: "success",
      title,
    });
  };
  return renderToast;
};

export const useErrorToast = (): ((key: string) => void) => {
  const toast = useToast();
  const renderToast = (title = "") => {
    toast({
      position: "top",
      status: "error",
      title,
    });
  };
  return renderToast;
};
