import { Button } from "@chakra-ui/react";
import { Children, useEffect, useState } from "react";
import { ENTRANCE, OBSTACLE, SLOT } from "../constants";
import { useParkingLotContext } from "../context";
import TileDetails from "./TileDetails";

function TilesList(): JSX.Element {
  const {
    data,
    tilesData,
    selectionMethod,
    showSaveButton,
    handleCancel,
    handleSelect,
  } = useParkingLotContext();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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
