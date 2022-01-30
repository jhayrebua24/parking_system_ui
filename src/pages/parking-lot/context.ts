import { IParkingLotDetails } from "pages/parking-lot-list/interface";
import { createContext, useContext } from "react";

import { ITileDetails, MethodType } from "./interface";

interface Props {
  tilesData: ITileDetails[] | undefined;
  selectionMethod: MethodType;
  setSelectionTiles: (key: any) => void;
  handleCancel: () => void;
  handleSelect: (key: any) => (e: any) => void;
  showSaveButton: boolean;
  data: IParkingLotDetails | null;
}

export const ParkingLotContext = createContext<Props>({
  tilesData: [],
  selectionMethod: "default",
  setSelectionTiles: () => {
    //
  },
  handleCancel: () => {
    //
  },
  handleSelect: () => () => {
    //
  },
  showSaveButton: false,
  data: null,
});

export const useParkingLotContext = (): Props => useContext(ParkingLotContext);
