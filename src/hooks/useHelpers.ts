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

export const useGetListQuery = <T>(
  key: QueryKey,
  url: string,
  options: QueryObserverOptions = {}
): FetchDataInterface<T> => {
  const onError = useHandleErrors();
  const result = useQuery(
    key,
    async () => {
      const { data }: RequestResponse<T> = await axios.get(url);
      return data;
    },
    {
      keepPreviousData: true,
      initialData: {},
      onError,
      ...options,
    }
  );
  return [result?.data as T, result?.isLoading, result];
};
