export interface IParkingLotDetails {
  id: number;
  name: string;
  height: number;
  width: number;
}

export interface IParkingLotList {
  data: IParkingLotDetails[];
}
