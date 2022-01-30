/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from "clsx";
import { useMemo } from "react";
import { ENTRANCE, OBSTACLE, SLOT } from "../constants";
import { useParkingLotContext } from "../context";
import { ITileDetails } from "../interface";

interface Props {
  data: ITileDetails;
  setSelectedIds: (key: any) => void;
  selectedIds: number[];
}

function TileDetails({
  data,
  selectedIds,
  setSelectedIds,
}: Props): JSX.Element {
  const {
    selectionMethod,
    setSelectionTiles,
    showSaveButton: isSelecting,
  } = useParkingLotContext();
  //   console.log(selectedIds);
  const className = useMemo(() => {
    if (selectedIds.includes(data?.id)) return "bg-indigo-400";
    if (data?.slot_details) {
      if (data?.slot_details.is_occupied) return "bg-red-500";
      return "bg-green-500";
    }
    if (data?.is_entrance && data?.entrance_details) return "bg-blue-200";
    if (data?.is_obstacle) return "bg-gray-300";
    return "bg-gray-100";
  }, [data, selectedIds]);

  const details = useMemo(() => {
    if (data?.slot_details)
      return <div className="font-semibold">{data?.slot_details?.size}</div>;
    if (data?.is_entrance && data?.entrance_details)
      return (
        <div className="font-semibold">
          Entry - {data?.entrance_details?.name}
        </div>
      );
    return null;
  }, [data]);

  const availableForSelection = useMemo(() => {
    if (selectionMethod === OBSTACLE)
      return data?.is_open_space && !data?.is_obstacle && !data?.is_entrance;
    if (selectionMethod === ENTRANCE)
      return (
        data?.can_be_entrance &&
        !data?.is_entrance &&
        !data?.is_obstacle &&
        !data?.is_parking_space
      );
    return (
      !data?.is_entrance &&
      !data?.slot_details &&
      !data?.is_obstacle &&
      data?.is_open_space
    );
  }, [data, selectionMethod]);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (
      selectedIds.includes(data?.id) ||
      !availableForSelection ||
      !isSelecting
    )
      return;
    const selectionFunctions: {
      [OBSTACLE]: (prev: any) => void;
      [ENTRANCE]: (prev: any) => void;
      [SLOT]: (prev: any) => void;
      default: (prev: any) => void;
    } = {
      [OBSTACLE]: (prev: any) => {
        const newPrev: ITileDetails[] = [...prev];
        const currentTileIndex = newPrev.findIndex((dt) => dt.id === data?.id);
        if (currentTileIndex > -1) {
          const tileDetails = newPrev[currentTileIndex];
          newPrev[currentTileIndex] = {
            ...tileDetails,
            is_obstacle: true,
            is_open_space: false,
          };
        }
        return newPrev;
      },
      [ENTRANCE]: (prev: any) => {
        const newPrev: ITileDetails[] = [...prev];
        const currentTileIndex = newPrev.findIndex((dt) => dt.id === data?.id);
        if (currentTileIndex > -1) {
          const tileDetails = newPrev[currentTileIndex];
          newPrev[currentTileIndex] = {
            ...tileDetails,
            is_obstacle: true,
            is_open_space: false,
          };
        }
        return newPrev;
      },
      [SLOT]: (prev: any) => {
        const newPrev: ITileDetails[] = [...prev];
        const currentTileIndex = newPrev.findIndex((dt) => dt.id === data?.id);
        if (currentTileIndex > -1) {
          const tileDetails = newPrev[currentTileIndex];
          newPrev[currentTileIndex] = {
            ...tileDetails,
            is_obstacle: true,
            is_open_space: false,
          };
        }
        return newPrev;
      },
      default: (prev: any) => prev,
    };

    setSelectionTiles(
      selectionFunctions[selectionMethod] || selectionFunctions.default
    );
    setSelectedIds((prev: number[]) => [...prev, data?.id]);
  };

  return (
    <div
      className={clsx(
        "flex-1 h-32 border border-gray-500 flex flex-col items-center justify-center",
        className,
        isSelecting &&
          availableForSelection &&
          "cursor-pointer bg-yellow-100 hover:bg-yellow-200"
      )}
      onClick={onClick}
    >
      {details}
    </div>
  );
}

export default TileDetails;
