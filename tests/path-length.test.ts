import { getValidMoves, solution } from '../path-length';

describe('path length solution unit tests', () => {
  test.each([
    [
      [
        [0, 1, 1, 0],
        [0, 0, 0, 1],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
      ],
      7,
    ],
    [
      [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0],
      ],
      11,
    ],
  ])(
    'should calculate path length with option to remove wall',
    (map: number[][], result: number) => {
      expect(solution(map)).toBe(result);
    },
  );
});

describe('in dev unit tests', () => {
  // In my defense, this is cleaner than writing all the individual tests...
  test.each([
    [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [1, 1],
      [
        [1, 0],
        [2, 1],
        [1, 2],
        [0, 1],
      ],
    ],
    [
      [
        [0, 1, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [1, 1],
      [
        [1, 0],
        [2, 1],
        [1, 2],
      ],
    ],
    [
      [
        [0, 1, 0],
        [1, 0, 1],
        [0, 1, 0],
      ],
      [1, 1],
      [],
    ],
    [
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ],
      [0, 0],
      [
        [1, 0],
        [0, 1],
      ],
    ],
  ])(
    'should calculate valid moves properly',
    (map: number[][], pos: number[], result: number[][]) => {
      const validMoves = getValidMoves(map, pos as [number, number], {});

      validMoves.forEach((move) => {
        expect(result).toContainEqual(move);
      });
      expect(validMoves.length).toBe(result.length);
    },
  );
});
