type QueueNode = { val: [number, number]; depth: number };

export const getValidMoves = (
  map: number[][],
  pos: [number, number],
  visited: { [key: string]: boolean },
): [number, number][] => {
  const dirs = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  const iLength = map.length;
  const jLength = map[0].length;

  const ret: [number, number][] = [];

  dirs.forEach((dir) => {
    if (pos[0] + dir[0] >= iLength || pos[0] + dir[0] < 0) {
      // ignore (i is out of bounds)
    } else if (pos[1] + dir[1] >= jLength || pos[1] + dir[1] < 0) {
      // ignore (j is out of bounds)
    } else {
      const target: [number, number] = [pos[0] + dir[0], pos[1] + dir[1]];
      if (map[target[0]][target[1]] === 1) {
        return;
      }
      if (!visited[target.toString()]) {
        ret.push(target);
      }
    }
  });
  return ret;
};

export const bfs = (map: number[][]): number => {
  const visited: { [key: string]: boolean } = {};
  const start: [number, number] = [0, 0];
  const goal = [map.length - 1, map[0].length - 1];
  const queue: QueueNode[] = [];

  // Normally depth would be a 0, but it's a 1 because we count the starting location
  queue.push({ val: start, depth: 1 });

  let curr = queue.shift() as QueueNode;
  while (curr !== undefined) {
    if (JSON.stringify(curr.val) === JSON.stringify(goal)) {
      return curr.depth;
    }
    visited[curr.val.toString()] = true;
    const possibleMoves = getValidMoves(map, curr.val, visited);

    const possibleMovesQueueNodes: QueueNode[] = possibleMoves.map(
      (moveTuple) => {
        return {
          val: moveTuple,
          depth: curr.depth + 1,
        };
      },
    );

    queue.push(...possibleMovesQueueNodes);
    curr = queue.shift() as QueueNode;
  }

  return Number.MAX_SAFE_INTEGER;
};

export const solution = (map: number[][]): number => {
  // There are likely faster ways to do this, but the best way I can think of is to:
  // Remove one wall
  // Perform BFS from 0,0 to i,j
  // Keep track of shortest BFS
  // Start over with a different wall
  // Should be time complexity of ~O(i*j*w) where w is the number of walls

  // improvements: Implement A* instead of BFS

  const wallLocations: [number, number][] = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 1) {
        wallLocations.push([i, j]);
      }
    }
  }

  let shortestSoFar = Number.MAX_SAFE_INTEGER;
  wallLocations.forEach((location) => {
    // Remove the wall location
    const copiedMap = JSON.parse(JSON.stringify(map)) as number[][];
    copiedMap[location[0]][location[1]] = 0;
    const len = bfs(copiedMap);
    if (len < shortestSoFar) {
      shortestSoFar = len;
    }
  });

  return shortestSoFar;
};
