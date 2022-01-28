import { Button } from "@chakra-ui/react";
import Loader from "components/Loader";
import { useOpenModal } from "hooks/useModal";
import ParkingLotDetails from "./components/ParkingLotDetails";
import CreateParking from "./forms/CreateParking";
import { useGetParkingLot } from "./hooks";
import { IParkingLotList } from "./interface";

function ParkingLotList(): JSX.Element {
  const openModal = useOpenModal();
  const [{ data }, isLoading] = useGetParkingLot<IParkingLotList>();

  const handleCreateParking = () => {
    openModal({
      title: "Create Parking Lot",
      content: (close) => <CreateParking onClose={close} />,
    });
  };
  return (
    <div className="h-full w-full flex flex-col py-24">
      {isLoading && <Loader />}
      <div className="flex justify-end">
        <Button type="button" colorScheme="brand" onClick={handleCreateParking}>
          Add Parking
        </Button>
      </div>
      <div className="w-full my-8 grid grid-cols-3 gap-8">
        {data?.map((dt) => (
          <ParkingLotDetails key={dt.id} data={dt} />
        ))}
      </div>
    </div>
  );
}

export default ParkingLotList;
