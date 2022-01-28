import { useParams, Params } from "react-router-dom";

function ParkingLot(): JSX.Element {
  const { parkingId } = useParams<Params>();
  console.log(parkingId);
  return <div>parking lot</div>;
}

export default ParkingLot;
