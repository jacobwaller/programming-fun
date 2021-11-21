type QueueNode = { val: number; depth: number };
const offsets = [6, 10, 15, 17, -6, -10, -15, -17];

export const isValidMove = (pos: number, offset: number): boolean => {
  const end = pos + offset;
  if (end < 0) return false;

  // If you represent a 1D chess board in binary, the upper and lower 3 bits can be used to address for rank and file.
  // ex. Position 0  in the 1D Array would be 0b000000 (rank 000 => 0 & file 000 => 0)
  //     Position 45 in the 1D Array would be 0b101101 (rank 101 => 5 & file 101 => 5)
  const binaryStartString = pos.toString(2).padStart(6, '0');
  const binaryEndString = end.toString(2).padStart(6, '0');

  const startRank = parseInt(binaryStartString.substring(3), 2);
  const endRank = parseInt(binaryEndString.substring(3), 2);

  const startFile = parseInt(binaryStartString.substring(0, 3), 2);
  const endFile = parseInt(binaryEndString.substring(0, 3), 2);

  const rankDiff = Math.abs(startRank - endRank);
  const fileDiff = Math.abs(startFile - endFile);

  // Check if we're doing 2 in one direction and 1 in the other
  if (rankDiff === 2 && fileDiff === 1) return true;
  if (rankDiff === 1 && fileDiff === 2) return true;

  return false;
};

export const getValidMoves = (pos: number): number[] => {
  const ret: number[] = [];
  offsets.forEach((offset) => {
    if (isValidMove(pos, offset)) {
      ret.push(pos + offset);
    }
  });
  return ret;
};

export const solution = (src: number, dest: number): number => {
  if (src === dest) return 0;

  // Do a BFS from src to dest
  const queue: QueueNode[] = [{ val: src, depth: 0 }];
  const visited: { [key: number]: boolean } = {};

  let curr = queue.shift() as QueueNode;
  while (curr.val !== dest) {
    visited[curr.val] = true;
    const potentialMoves = getValidMoves(curr.val);
    queue.push(
      ...potentialMoves
        .map((move) => {
          return { val: move, depth: curr.depth + 1 };
        })
        .filter((move) => !visited[move.val]),
    );

    curr = queue.shift() as QueueNode;
  }
  return curr.depth;
};
