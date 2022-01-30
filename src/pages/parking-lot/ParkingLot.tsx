import Loader from "components/Loader";
import { useMemo, useState } from "react";
import { useParams, Params } from "react-router-dom";
import TilesList from "./components/TilesList";
import { ENTRANCE, OBSTACLE, SLOT } from "./constants";
import { ParkingLotContext } from "./context";
// import { chunkTileData } from "./helper";
import { useGetParkingLotDetails } from "./hooks";
import { IParkingParams, MethodType } from "./interface";

function ParkingLot(): JSX.Element {
  const { parkingId } = useParams<Params>();
  const [selectingObstacle, setSelectObstacle] = useState(false);
  const [selectingEntrance, setSelectingEntrance] = useState(false);
  const [selectingParkingSlot, setSelectingParkingSlot] = useState(false);
  const [
    { data, tiles },
    isLoading,
    { isRefetching },
  ] = useGetParkingLotDetails<IParkingParams>(parkingId || "");

  const tilesData = useMemo(() => tiles || [], [tiles]);

  const selectionMethod = useMemo<MethodType>(() => {
    if (selectingEntrance) return ENTRANCE;
    if (selectingObstacle) return OBSTACLE;
    if (selectingParkingSlot) return SLOT;
    return "default";
  }, [selectingObstacle, selectingEntrance, selectingParkingSlot]);

  const showSaveButton =
    selectingObstacle || selectingEntrance || selectingParkingSlot;

  const handleCancel = (): void => {
    setSelectObstacle(false);
    setSelectingEntrance(false);
    setSelectingParkingSlot(false);
  };

  const handleSelect = (method: MethodType) => (e: React.MouseEvent): void => {
    e.preventDefault();

    const setSelect = {
      [ENTRANCE]: setSelectingEntrance,
      [OBSTACLE]: setSelectObstacle,
      [SLOT]: setSelectingParkingSlot,
      default: () => {
        //
      },
    };
    setSelect[method](true);
  };

  return (
    <div className="h-full w-full flex flex-col py-24 px-2">
      {(isLoading || isRefetching) && <Loader />}
      <ParkingLotContext.Provider
        value={{
          data,
          tilesData,
          showSaveButton,
          selectionMethod,
          handleCancel,
          handleSelect,
        }}
      >
        <TilesList />
      </ParkingLotContext.Provider>
    </div>
  );
}

export default ParkingLot;
