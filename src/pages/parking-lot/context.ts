import { IParkingLotDetails } from "pages/parking-lot-list/interface";
import { createContext, useContext } from "react";

import { ITileDetails, MethodType } from "./interface";

interface Props {
  tilesData: ITileDetails[] | undefined;
  selectionMethod: MethodType;
  handleCancel: () => void;
  handleSelect: (key: any) => (e: any) => void;
  showSaveButton: boolean;
  data: IParkingLotDetails;
}

export const ParkingLotContext = createContext<Props>({
  tilesData: [],
  selectionMethod: "default",
  handleCancel: () => {
    //
  },
  handleSelect: () => () => {
    //
  },
  showSaveButton: false,
  data: {
    id: 0,
    name: "",
    height: 0,
    width: 0,
  },
});

export const useParkingLotContext = (): Props => useContext(ParkingLotContext);
