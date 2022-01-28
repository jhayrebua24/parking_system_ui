export interface IParkingLotDetails {
  id: string;
  name: string;
  height: number;
  width: number;
}

export interface IParkingLotList {
  data: IParkingLotDetails[];
}
