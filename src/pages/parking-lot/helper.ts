/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ChunkTileValue,
  IEntranceDetails,
  IFormattedDataDistance,
  ILocationAndDistance,
  ITileDetails,
  ITilesEntranceDetails,
} from "./interface";

export const chunkTileData = (
  tiles: ITileDetails[],
  width: number,
  sourceId: number,
  destinationId: number,
  slotIds: number[]
): Promise<ChunkTileValue[][]> =>
  new Promise((res, rej) => {
    try {
      const chunkedTiles = tiles.reduce((accu, tile, index) => {
        let val = "open"; // default open
        if (
          tile.is_obstacle ||
          tile.is_entrance ||
          tile.is_parking_space ||
          tile.slot_details?.is_occupied ||
          slotIds.includes(tile.id)
        )
          val = "block";
        if (tile.id === destinationId) val = "destination";
        if (tile.id === sourceId) val = "source";

        const newValue: any = [...accu];
        const cIndex = Math.floor(index / width);
        if (!newValue[cIndex]) {
          newValue[cIndex] = [];
        }
        newValue[cIndex].push(val);
        return newValue;
      }, []);
      res(chunkedTiles);
    } catch (_e) {
      rej(new Error("SOMETHING WENT WRONG"));
    }
  });

const locationAndDistance = (
  row = 0,
  col = 0,
  dist = 0
): ILocationAndDistance => ({
  row,
  col,
  dist,
});

export const getDistance = async (
  grid: ChunkTileValue[][],
  height: number,
  width: number
): Promise<number> =>
  new Promise((res) => {
    try {
      const source = locationAndDistance();
      // blocked cells as visited.
      const visited = Array.from(Array(height), () => Array(width).fill(0));
      if (visited.length < 1) res(-1);
      for (let i = 0; i < height; i += 1) {
        for (let j = 0; j < width; j += 1) {
          if (grid[i][j] === "block") visited[i][j] = true;
          else visited[i][j] = false;

          // Finding source
          if (grid[i][j] === "source") {
            source.row = i;
            source.col = j;
          }
        }
      }
      // applying BFS on matrix cells starting from source
      const q: ILocationAndDistance[] = [];
      q.push(source);
      visited[source.row][source.col] = true;
      while (q.length !== 0) {
        const p = q[0];
        q.shift();

        // Destination found;
        if (grid[p.row][p.col] === "destination") res(p.dist);

        // moving up
        if (p.row - 1 >= 0 && visited[p.row - 1][p.col] === false) {
          q.push(locationAndDistance(p.row - 1, p.col, p.dist + 1));
          visited[p.row - 1][p.col] = true;
        }

        // moving down
        if (p.row + 1 < height && visited[p.row + 1][p.col] === false) {
          q.push(locationAndDistance(p.row + 1, p.col, p.dist + 1));
          visited[p.row + 1][p.col] = true;
        }

        // moving left
        if (p.col - 1 >= 0 && visited[p.row][p.col - 1] === false) {
          q.push(locationAndDistance(p.row, p.col - 1, p.dist + 1));
          visited[p.row][p.col - 1] = true;
        }

        // moving right
        if (p.col + 1 < width && visited[p.row][p.col + 1] === false) {
          q.push(locationAndDistance(p.row, p.col + 1, p.dist + 1));
          visited[p.row][p.col + 1] = true;
        }
      }
      res(-1);
    } catch (_e) {
      console.log("something went wrong when getting distance");
      res(-1);
    }
  });

export const formatAndGetDistance = async (
  slotIds: number[],
  entrance: ITilesEntranceDetails[],
  tiles: ITileDetails[],
  width: number,
  height: number
): Promise<IFormattedDataDistance[]> => {
  try {
    const data = await Promise.all(
      slotIds.map(async (id) => ({
        id,
        entrance_distances: await Promise.all(
          entrance.map(async (ent) => {
            const chunkedData = await chunkTileData(
              tiles,
              width,
              id,
              ent.tile_id,
              slotIds
            );
            const distance = await getDistance(chunkedData, height, width);
            return {
              id: ent.id,
              name: ent.name,
              distance,
            };
          })
        ),
      }))
    );
    return Promise.resolve(data);
  } catch (_e) {
    return Promise.reject(
      new Error("Encoutered error while formatting and getting distance")
    );
  }
};
