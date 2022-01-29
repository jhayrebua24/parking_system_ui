import { useGetQuery } from "hooks/useHelpers";
import { FetchDataInterface } from "utils/interface";
import { PARKING_LOT_DETAILS } from "./constants";

export const useGetParkingLotDetails = <T>(id: string): FetchDataInterface<T> =>
  useGetQuery<T>(`${PARKING_LOT_DETAILS}/${id}`, `/v1/parking-lot/${id}`);
