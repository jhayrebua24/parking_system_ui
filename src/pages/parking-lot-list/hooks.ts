import { useGetListQuery } from "hooks/useHelpers";
import { FetchDataInterface } from "utils/interface";
import { PARKING_LOT_LIST } from "./constants";

export const a = 1;

export const useGetParkingLot = <T>(): FetchDataInterface<T> =>
  useGetListQuery<T>(PARKING_LOT_LIST, "/v1/parking-lot");
