/* eslint-disable camelcase */
import { IParkingLotDetails } from "pages/parking-lot-list/interface";

export interface IFormattedEntranceDistance {
  id: number;
  name: string;
  distance: number;
}
export interface IFormattedDataDistance {
  id: number;
  entrance_distances: IFormattedEntranceDistance[];
}

export interface IEntranceDetails {
  id: number;
  name: string;
}

export interface ITilesEntranceDetails extends IEntranceDetails {
  tile_id: number;
}

export interface ISlotTypes {
  vehicle_size: string;
  id: number;
}

export interface ISlotTypesData {
  data: ISlotTypes[];
}

export interface ISlotDetails {
  size: string;
  rate: number;
  is_occupied: boolean;
  transactions: any;
  distances: {
    id: number;
    distance: number;
    entry: string;
  }[];
}

export interface ITileDetails {
  id: number;
  is_obstacle: boolean;
  is_open_space: boolean;
  is_parking_space: boolean;
  can_be_entrance: boolean;
  is_entrance: boolean;
  entrance_details: IEntranceDetails | null;
  slot_details: ISlotDetails | null;
}

export interface IParkingParams {
  data: IParkingLotDetails;
  tiles: ITileDetails[];
}

export type ChunkTileValue = "source" | "destination" | "block" | "open";
export interface ILocationAndDistance {
  row: number;
  dist: number;
  col: number;
}

export type MethodType = "ENTRANCE" | "OBSTACLE" | "SLOT" | "default";
