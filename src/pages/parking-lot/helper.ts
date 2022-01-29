import { ITileDetails } from "./interface";

export const chunkTileData = (
  tiles: ITileDetails[],
  width: number
): ITileDetails[][] => {
  // need to rework
  return tiles.reduce((accu, tile, index) => {
    const newValue: any = [...accu];
    const cIndex = Math.floor(index / width);
    if (!accu[cIndex]) {
      newValue[cIndex] = [tile];
      return newValue;
    }
    newValue[cIndex].push(tile);
    return newValue;
  }, []);
};
