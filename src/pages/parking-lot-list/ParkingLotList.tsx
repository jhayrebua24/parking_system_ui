import { useGetParkingLot } from "./hooks";
import { IParkingLotList } from "./interface";

function ParkingLotList(): JSX.Element {
  const [data] = useGetParkingLot<IParkingLotList[]>();
  console.log(data);
  return <div>test</div>;
}

export default ParkingLotList;
