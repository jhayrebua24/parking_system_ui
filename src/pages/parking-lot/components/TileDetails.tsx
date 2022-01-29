import clsx from "clsx";
import { useMemo } from "react";
import { ENTRANCE, OBSTACLE } from "../constants";
import { ITileDetails } from "../interface";

interface Props {
  data: ITileDetails;
  isSelecting: boolean;
  selectionMethod: string;
}

function TileDetails({
  data,
  isSelecting,
  selectionMethod,
}: Props): JSX.Element {
  console.log(selectionMethod, "qweq");
  const className = useMemo(() => {
    if (data?.slot_details) {
      if (data?.slot_details.is_occupied) return "bg-red-500";
      return "bg-green-500";
    }

    if (data?.is_entrance && data?.entrance_details) return "bg-blue-200";

    if (data?.is_obstacle) return "bg-gray-500";

    return "bg-gray-100";
  }, [data]);

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

  return (
    <div
      className={clsx(
        "flex-1 h-32 border border-gray-500 flex flex-col items-center justify-center",
        className,
        isSelecting && availableForSelection && "cursor-pointer bg-yellow-100"
      )}
    >
      {details}
    </div>
  );
}

export default TileDetails;
