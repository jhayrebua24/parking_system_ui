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
  data: T;
}

export type IMutate = [(key: any) => Promise<any>, boolean];
export type IMutationResult = [(key: any) => Promise<any>, boolean, any];
