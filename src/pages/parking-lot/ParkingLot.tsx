import { Button } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { useParams, Params } from "react-router-dom";
import TileDetails from "./components/TileDetails";
import { ENTRANCE, OBSTACLE, SLOT } from "./constants";
import { chunkTileData } from "./helper";
import { useGetParkingLotDetails } from "./hooks";
import { IParkingParams, ITileDetails } from "./interface";

type MethodType = "ENTRANCE" | "OBSTACLE" | "SLOT";

function ParkingLot(): JSX.Element {
  const { parkingId } = useParams<Params>();
  const [selectingObstacle, setSelectObstacle] = useState(false);
  const [selectingEntrance, setSelectingEntrance] = useState(false);
  const [selectingParkingSlot, setSelectingParkingSlot] = useState(false);
  const [selectionTiles, setSelectionTiles] = useState<ITileDetails[][]>();
  const [{ data, tiles }] = useGetParkingLotDetails<IParkingParams>(
    parkingId || ""
  );

  const formattedTiles = useMemo(
    () => chunkTileData(tiles || [], data?.width),
    [data, tiles]
  );

  const selectionMethod = useMemo<string>(() => {
    if (selectingEntrance) return ENTRANCE;
    if (selectingObstacle) return OBSTACLE;
    if (selectingParkingSlot) return SLOT;
    return "";
  }, [selectingObstacle, selectingEntrance, selectingParkingSlot]);

  const showSaveButton =
    selectingObstacle || selectingEntrance || selectingParkingSlot;

  const handleCancel = () => {
    setSelectObstacle(false);
    setSelectingEntrance(false);
    setSelectingParkingSlot(false);
    setSelectionTiles(formattedTiles);
  };

  const handleSelect = (method: MethodType) => (e: React.MouseEvent): void => {
    e.preventDefault();
    setSelectionTiles(formattedTiles);
    const setSelect = {
      [ENTRANCE]: setSelectingEntrance,
      [OBSTACLE]: setSelectObstacle,
      [SLOT]: setSelectingParkingSlot,
    };
    setSelect[method](true);
  };

  const tilesData = useMemo(
    () => (showSaveButton ? selectionTiles : formattedTiles),
    [showSaveButton, selectionTiles, formattedTiles]
  );

  return (
    <div className="h-full w-full flex flex-col py-24 px-2">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold uppercase">{data?.name}</p>
        <div className="flex space-x-2 items-center">
          {showSaveButton ? (
            <>
              <Button type="button" colorScheme="brand" onClick={handleCancel}>
                Save
              </Button>
              <Button type="button" colorScheme="blue" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                colorScheme="blue"
                onClick={handleSelect(ENTRANCE)}
              >
                Add Entrance
              </Button>
              <Button
                type="button"
                colorScheme="blue"
                onClick={handleSelect(OBSTACLE)}
              >
                Add Obstacle
              </Button>
              <Button
                type="button"
                colorScheme="blue"
                onClick={handleSelect(SLOT)}
              >
                Add Parking Slot
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        {tilesData?.map((tls) => (
          <div className="w-full flex">
            {tls.map((tl) => (
              <TileDetails
                selectionMethod={selectionMethod}
                isSelecting={showSaveButton}
                data={tl}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ParkingLot;
