import { Button } from "@chakra-ui/react";
import { useOpenModal } from "hooks/useModal";
import { Children, useEffect, useMemo, useState } from "react";
import { Params, useParams } from "react-router-dom";
import { ENTRANCE, OBSTACLE, SLOT } from "../constants";
import { useParkingLotContext } from "../context";
import AddParkingEntrance from "../forms/AddParkingEntrance";
import AddParkingSLot from "../forms/AddParkingSlot";
import { useAddObstacles } from "../hooks";
import { ITilesEntranceDetails } from "../interface";
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
  const openModal = useOpenModal();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [addObstacle, loadingAddObstacle] = useAddObstacles(parkingId || "");
  const entranceLength = useMemo<number>(
    () => tilesData?.filter((td) => !!td.entrance_details)?.length || 0,
    [tilesData]
  );
  // only allow 10% of total tiles for maximum entrance count. e.g 25 tiles = 2.5 round off to 3;
  const isMaxEntryPoint = useMemo<boolean>(() => {
    const maxEntryPoint = Math.ceil((data?.height * data?.width) / 10);
    return entranceLength + selectedIds.length >= maxEntryPoint;
  }, [entranceLength, selectedIds, data]);

  const handleClick: IHandleClick = useMemo(
    () => ({
      [OBSTACLE]: async () => {
        try {
          await addObstacle({
            tile_ids: selectedIds,
          });
        } finally {
          handleCancel();
        }
      },
      [ENTRANCE]: () =>
        openModal({
          title: `Add Parking Entry`,
          content: (close) => (
            <AddParkingEntrance
              parkingId={parkingId || ""}
              onClose={close}
              callback={handleCancel}
              ids={selectedIds}
            />
          ),
        }),
      [SLOT]: () =>
        openModal({
          title: `Add Parking Slot`,
          content: (close) => (
            <AddParkingSLot
              tilesData={tilesData || []}
              entranceData={
                (tilesData
                  ?.filter((td) => td.entrance_details)
                  .map((td) => ({
                    tile_id: td.id,
                    ...td.entrance_details,
                  })) || []) as ITilesEntranceDetails[]
              }
              width={data?.width}
              height={data?.height}
              parkingId={parkingId || ""}
              onClose={close}
              callback={handleCancel}
              ids={selectedIds.concat(
                tilesData
                  ?.filter((td) => td.is_parking_space && td.slot_details)
                  .map((tl) => tl.id) as number[]
              )}
            />
          ),
        }),
      default: () => {
        handleCancel();
      },
    }),
    [
      addObstacle,
      selectedIds,
      handleCancel,
      openModal,
      parkingId,
      tilesData,
      data,
    ]
  );

  useEffect(() => {
    if (selectionMethod === "default") setSelectedIds([]);
  }, [selectionMethod]);

  const onClickSave = handleClick[selectionMethod] || handleClick.default;
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
                disabled={selectedIds.length < 1 || loadingAddObstacle}
                isLoading={loadingAddObstacle}
                onClick={() => {
                  if (selectedIds.length < 1) return;
                  onClickSave();
                }}
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
                disabled={isMaxEntryPoint}
              >
                Add Entrance
              </Button>
              <Button
                type="button"
                colorScheme="blue"
                onClick={handleSelect(OBSTACLE)}
                disabled={entranceLength < 1}
              >
                Add Obstacle
              </Button>
              <Button
                type="button"
                colorScheme="blue"
                onClick={handleSelect(SLOT)}
                disabled={entranceLength < 1}
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
              isMaxEntryPoint={isMaxEntryPoint}
            />
          ))
        )}
      </div>
    </>
  );
}

export default TilesList;
