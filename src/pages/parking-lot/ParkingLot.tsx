import { useMemo, useState } from "react";
import { useParams, Params } from "react-router-dom";
import TilesList from "./components/TilesList";
import { ENTRANCE, OBSTACLE, SLOT } from "./constants";
import { ParkingLotContext } from "./context";
// import { chunkTileData } from "./helper";
import { useGetParkingLotDetails } from "./hooks";
import { IParkingParams, ITileDetails, MethodType } from "./interface";

function ParkingLot(): JSX.Element {
  const { parkingId } = useParams<Params>();
  const [selectingObstacle, setSelectObstacle] = useState(false);
  const [selectingEntrance, setSelectingEntrance] = useState(false);
  const [selectingParkingSlot, setSelectingParkingSlot] = useState(false);
  const [selectionTiles, setSelectionTiles] = useState<ITileDetails[]>();
  const [{ data, tiles }] = useGetParkingLotDetails<IParkingParams>(
    parkingId || ""
  );

  const formattedTiles = useMemo(() => tiles, [tiles]);

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
    setSelectionTiles(JSON.parse(JSON.stringify(formattedTiles)));
  };

  const handleSelect = (method: MethodType) => (e: React.MouseEvent): void => {
    e.preventDefault();
    setSelectionTiles(JSON.parse(JSON.stringify(formattedTiles)));
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

  const tilesData = useMemo(
    () => (showSaveButton ? selectionTiles : formattedTiles),
    [showSaveButton, selectionTiles, formattedTiles]
  );

  return (
    <div className="h-full w-full flex flex-col py-24 px-2">
      <ParkingLotContext.Provider
        value={{
          data,
          tilesData,
          setSelectionTiles,
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
