/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from "clsx";
import { useErrorToast } from "hooks/useCustomToast";
import { useMemo } from "react";
import moment from "moment";
import { useOpenModal } from "hooks/useModal";
import { ENTRANCE, OBSTACLE } from "../constants";
import { useParkingLotContext } from "../context";
import { ITileDetails } from "../interface";
import UnparkCar from "../forms/UnparkCar";

interface Props {
  data: ITileDetails;
  setSelectedIds: (key: any) => void;
  selectedIds: number[];
  isMaxEntryPoint: boolean;
}

function TileDetails({
  data,
  selectedIds,
  setSelectedIds,
  isMaxEntryPoint,
}: Props): JSX.Element {
  const {
    selectionMethod,
    data: parkingLotData,
    showSaveButton: isSelecting,
  } = useParkingLotContext();
  const openModal = useOpenModal();
  const toastError = useErrorToast();
  const className = useMemo(() => {
    if (selectedIds.includes(data?.id))
      return "bg-indigo-400 hover:bg-indigo-500";
    if (data?.slot_details) {
      if (data?.slot_details.is_occupied) return "bg-red-500";
      return "bg-green-500";
    }
    if (data?.is_entrance && data?.entrance_details) return "bg-blue-200";
    if (data?.is_obstacle) return "bg-gray-300";
    return "bg-gray-100";
  }, [data, selectedIds]);

  const details = useMemo(() => {
    if (data?.slot_details) {
      const { slot_details: slotDetails } = data;
      return (
        <div className="font-semibold text-center">
          {slotDetails?.is_occupied ? (
            <div>
              <p>{slotDetails?.transactions?.plate_number}</p>
              <p>
                {moment(
                  slotDetails?.transactions?.datetime_in,
                  "YYYY-MM-DD HH:mm:ss"
                ).fromNow()}
              </p>
            </div>
          ) : null}
          {slotDetails?.size} {data?.id}
          <div>
            {slotDetails?.distances
              ?.map((d) => `[${d.entry},${d.distance}]`)
              .join(",")}
          </div>
        </div>
      );
    }

    if (data?.is_entrance && data?.entrance_details)
      return (
        <div className="font-semibold">
          Entry - {data?.entrance_details?.name} {data?.entrance_details?.id}
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
    const { slot_details } = data;
    if (
      slot_details &&
      slot_details?.is_occupied &&
      slot_details?.transactions
    ) {
      openModal({
        title: "Unpark car",
        content: (close) => (
          <UnparkCar
            parkingId={parkingLotData?.id?.toString()}
            data={slot_details}
            onClose={close}
          />
        ),
      });
    }

    if (
      slot_details ||
      data?.is_obstacle ||
      !data?.is_open_space ||
      data?.is_entrance ||
      (!data?.can_be_entrance && selectionMethod === ENTRANCE) ||
      !isSelecting
    )
      return;

    if (selectedIds.includes(data?.id) && isSelecting) {
      setSelectedIds((prev: number[]) => prev.filter((id) => id !== data.id));
      return;
    }

    if (
      isMaxEntryPoint &&
      selectionMethod === ENTRANCE &&
      data?.can_be_entrance
    ) {
      toastError("Failed to add more entrances");
      return;
    }
    setSelectedIds((prev: number[]) => [...prev, data?.id]);
  };

  return (
    <div
      className={clsx(
        "flex-1 h-32 border border-gray-500 flex flex-col items-center justify-center",
        isSelecting &&
          availableForSelection &&
          "cursor-pointer bg-yellow-100 hover:bg-yellow-200",
        className
      )}
      onClick={onClick}
    >
      {details}
    </div>
  );
}

export default TileDetails;
