import axios from "axios";
import {
  QueryKey,
  QueryObserverOptions,
  useQuery,
  useQueryClient,
} from "react-query";
import { FetchDataInterface, RequestResponse } from "utils/interface";
import useHandleErrors from "./useHandleError";

export const useQueryData = (name: QueryKey, defaultValue: any = ""): any => {
  const query = useQueryClient();
  const val = query.getQueryData(name);
  if (!val) return defaultValue;
  return val;
};

export const useSetQueryData = (
  name: QueryKey,
  updater: (key: any) => void
): void => {
  const query = useQueryClient();
  query.setQueryData(name, updater);
};

export const useGetQuery = <T>(
  key: QueryKey,
  url: string,
  options: QueryObserverOptions = {}
): FetchDataInterface<T> => {
  const onError = useHandleErrors();
  const result = useQuery(key, () => axios.get(url), {
    ...options,
    onError,
  });
  const { data, isLoading } = result;
  return [((data as RequestResponse<T>)?.data || {}) as T, isLoading, result];
};
