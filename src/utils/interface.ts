import { HeadersDefaults } from "axios";
import { UseQueryResult } from "react-query";

export interface AxiosHeaders extends HeadersDefaults {
  "Content-Type": string;
  Accept: string;
}
export interface DynamicObject {
  [key: string]: any;
}

export type FetchDataInterface<Type> = [Type, boolean, UseQueryResult];

export interface RequestResponse<T> {
  data: {
    data: T;
    message?: string;
    [key: string]: any;
  };
}
