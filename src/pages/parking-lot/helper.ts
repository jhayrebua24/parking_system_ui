import {
  ChunkTileValue,
  ILocationAndDistance,
  ITileDetails,
} from "./interface";

export const chunkTileData = (
  tiles: ITileDetails[],
  width: number,
  sourceId: number,
  destinationId: number
): ChunkTileValue[][] => {
  return tiles.reduce((accu, tile, index) => {
    let val = "open"; // default open
    if (
      tile.is_obstacle ||
      tile.is_entrance ||
      tile.is_parking_space ||
      tile.slot_details?.is_occupied
    )
      val = "block";
    if (tile.id === destinationId) val = "destination";
    if (tile.id === sourceId) val = "source";

    const newValue: any = [...accu];
    const cIndex = Math.floor(index / width);
    if (!accu[cIndex]) {
      newValue[cIndex] = [];
    }
    newValue[cIndex].push(val);
    return newValue;
  }, []);
};

const locationAndDistance = (
  row = 0,
  col = 0,
  dist = 0
): ILocationAndDistance => ({
  row,
  col,
  dist,
});

export const getDistance = (
  grid: ChunkTileValue[][],
  height: number,
  width: number
): number => {
  const source = locationAndDistance();
  // blocked cells as visited.
  const visited = Array.from(Array(height), () => Array(width).fill(0));
  if (visited.length < 1) return -1;
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
    if (grid[p.row][p.col] === "destination") return p.dist;

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
  return -1;
};
