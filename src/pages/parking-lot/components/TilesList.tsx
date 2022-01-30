import { Button } from "@chakra-ui/react";
import { Children, useEffect, useMemo, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { ENTRANCE, OBSTACLE, SLOT } from "../constants";
import { useParkingLotContext } from "../context";
import { useAddObstacles } from "../hooks";
import TileDetails from "./TileDetails";

interface IHandleClick {
  OBSTACLE: () => Promise<any>;
  ENTRANCE: () => Promise<any>;
  SLOT: () => Promise<any>;
  default: () => void;
}

function TilesList(): JSX.Element {
  const {
    data,
    tilesData,
    selectionMethod,
    showSaveButton,
    handleCancel,
    handleSelect,
  } = useParkingLotContext();
  const { parkingId } = useParams<Params>();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addObstacle] = useAddObstacles(parkingId || "");

  const handleClick: IHandleClick = useMemo(
    () => ({
      [OBSTACLE]: async () => {
        try {
          await addObstacle({
            tile_ids: selectedIds,
          });
          handleCancel();
        } catch (_e) {
          handleCancel();
        }
      },
      [ENTRANCE]: () =>
        addObstacle({
          tile_ids: selectedIds,
        }), // to change
      [SLOT]: () =>
        addObstacle({
          tile_ids: selectedIds,
        }), // to change
      default: () => {
        handleCancel();
      },
    }),
    [addObstacle, handleCancel, selectedIds]
  );

  useEffect(() => {
    if (selectionMethod === "default") setSelectedIds([]);
  }, [selectionMethod]);

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold uppercase">{data?.name}</p>
        <div className="flex space-x-2 items-center">
          {showSaveButton ? (
            <>
              <Button
                type="button"
                colorScheme="brand"
                onClick={() =>
                  handleClick[selectionMethod]() || handleClick.default()
                }
              >
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
      <div
        className="mt-4 grid"
        style={{
          gridTemplateColumns: `repeat(${data?.width}, 1fr)`,
        }}
      >
        {Children.toArray(
          tilesData?.map((tld) => (
            <TileDetails
              key={tld.id}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              data={tld}
            />
          ))
        )}
      </div>
    </>
  );
}

export default TilesList;
