/* eslint-disable camelcase */
import { IParkingLotDetails } from "pages/parking-lot-list/interface";

export interface IEntranceDetails {
  id: 1;
  name: string;
}

export interface ISlotDetails {
  size: string;
  rate: number;
  is_occupied: boolean;
  transactions: any;
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
