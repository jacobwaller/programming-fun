import { getValidMoves, isValidMove, solution } from '../knight-moves';

describe('knight moves solution unit tests', () => {
  test.each([
    [19, 36, 1],
    [0, 1, 3],
    [0, 2, 2],
    [0, 63, 6],
  ])(
    'should calculate number of moves between %p and %p',
    (src: number, dest: number, result: number) => {
      expect(solution(src, dest)).toBe(result);
    },
  );
});

describe('in dev unit tests', () => {
  test.each([
    [0, 6, false],
    [0, 17, true],
    [0, 10, true],
    [27, -15, true],
  ])(
    'Should determine if move is valid',
    (pos: number, offset: number, result) => {
      expect(isValidMove(pos, offset)).toBe(result);
    },
  );

  test.each([
    [0, [10, 17]],
    [27, [12, 21, 37, 44, 42, 33, 17, 10]],
  ])('Should give list of valid moves', (pos: number, moves: number[]) => {
    const arr = getValidMoves(pos);

    arr.forEach((move) => {
      expect(moves).toContain(move);
    });
    expect(moves.length).toBe(arr.length);
  });
});
