import axios from "axios";
import { useSuccessToast } from "hooks/useCustomToast";
import useHandleErrors from "hooks/useHandleError";
import { useGetQuery } from "hooks/useHelpers";
import { useMutation, useQueryClient } from "react-query";
import { FetchDataInterface, IMutate } from "utils/interface";
import { PARKING_LOT_DETAILS, PARKING_SLOT_TYPE } from "./constants";

export const useGetParkingLotDetails = <T>(id: string): FetchDataInterface<T> =>
  useGetQuery<T>(`${PARKING_LOT_DETAILS}/${id}`, `/v1/parking-lot/${id}`);

export const useGetParkingSlotTypes = <T>(): FetchDataInterface<T> =>
  useGetQuery<T>(PARKING_SLOT_TYPE, `/v1/parking-lot/utils/slot-type`);

export const useAddObstacles = (id: string): IMutate => {
  const toastSuccess = useSuccessToast();
  const query = useQueryClient();
  const onError = useHandleErrors();
  const { mutateAsync, isLoading } = useMutation(
    (payload) => axios.post(`/v1/parking-lot/${id}/obstacle`, payload),
    {
      onSuccess: ({ data: { message } }) => {
        toastSuccess(message || "Successfully added obstacles");
        query.invalidateQueries(`${PARKING_LOT_DETAILS}/${id}`);
      },
      onError,
    }
  );
  return [mutateAsync, isLoading];
};

export const useAddEntrances = (id: string): IMutate => {
  const toastSuccess = useSuccessToast();
  const query = useQueryClient();
  const onError = useHandleErrors();
  const { mutateAsync, isLoading } = useMutation(
    (payload) => axios.post(`/v1/parking-lot/${id}/entrance`, payload),
    {
      onSuccess: ({ data: { message } }) => {
        toastSuccess(message || "Successfully added entrance");
        query.invalidateQueries(`${PARKING_LOT_DETAILS}/${id}`);
      },
      onError,
    }
  );
  return [mutateAsync, isLoading];
};
