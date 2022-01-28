import axios from "axios";
import { useSuccessToast } from "hooks/useCustomToast";
import useHandleErrors from "hooks/useHandleError";
import { useGetQuery } from "hooks/useHelpers";
import { useMutation, useQueryClient } from "react-query";
import { FetchDataInterface, IMutate } from "utils/interface";
import { PARKING_LOT_LIST } from "./constants";

export const useGetParkingLot = <T>(): FetchDataInterface<T> =>
  useGetQuery<T>(PARKING_LOT_LIST, "/v1/parking-lot");

export const useAddParkingLot = (): IMutate => {
  const queryClient = useQueryClient();
  const toast = useSuccessToast();
  const onError = useHandleErrors();
  const { isLoading, mutateAsync } = useMutation(
    (payload) => axios.post(`/v1/parking-lot`, payload),
    {
      onSuccess: ({ data: { message } }) => {
        toast(message);
        queryClient.invalidateQueries(PARKING_LOT_LIST);
      },
      onError,
    }
  );
  return [mutateAsync, isLoading];
};

export const useDeleteParkingLot = (): IMutate => {
  const queryClient = useQueryClient();
  const toast = useSuccessToast();
  const onError = useHandleErrors();
  const { isLoading, mutateAsync } = useMutation(
    (id) => axios.delete(`/v1/parking-lot/${id}`),
    {
      onSuccess: ({ data: { message } }) => {
        toast(message);
        queryClient.invalidateQueries(PARKING_LOT_LIST);
      },
      onError,
    }
  );
  return [mutateAsync, isLoading];
};
