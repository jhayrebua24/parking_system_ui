import { DynamicObject } from "utils/interface";
import get from "lodash/get";
// import { useNavigate } from "react-router-dom";
import { useErrorToast } from "./useCustomToast";

const useHandleErrors = (): ((key: any | unknown | DynamicObject) => void) => {
  // const navigate = useNavigate();
  const toastError = useErrorToast();
  const handleError = (err: DynamicObject): void => {
    if (err?.response) {
      const {
        response: {
          status,
          data: { message, errors },
        },
      } = err;
      if (status === 401) toastError(message || "Unauthorized");
      if (status === 400) toastError(message || "Bad Request");
      if (status === 404) {
        toastError(message || "Invalid route");
        // navigate("/404");
      }
      if (status === 403) toastError(message || "Forbidden");
      if (status === 405) toastError(message || "Request is not supported");
      if (status === 500) {
        toastError("Something wrong with the server!");
      }

      if (status === 422) {
        toastError(
          get(errors, `${get(Object.keys(errors), "0")}`) ||
            "Unprocessable request"
        );
      }

      Promise.reject(message);
    } else {
      const message = "Failed to connect to web service";
      toastError(message);
      Promise.reject(message);
    }
  };

  return handleError;
};

export default useHandleErrors;
