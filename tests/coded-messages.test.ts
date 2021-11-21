import { countingSort, solution, sum, toNum } from '../coded-messages';

describe('Test cases for the whole solution', () => {
  test.each([
    [[3, 1, 4, 1], 4311],
    [[3, 1, 4, 1, 5, 9], 94311],
    [[8, 1, 9], 981],
    [[8, 6, 7, 1, 0], 8760],
    [[1], 0],
    [[0, 0, 0, 0, 0, 0], 0],
    [[9, 8, 6, 8, 6], 966],
  ])('Check given test cases pass', (arr: number[], result: number) => {
    expect(solution(arr)).toBe(result);
  });
});

describe('Dev based unit tests', () => {
  test.each([
    [[], 0],
    [[3, 4], 34],
    [[4, 0], 40],
    [[0], 0],
    [[4], 4],
    [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1000000000],
  ])('Check toNum works', (arr: number[], result: number) => {
    expect(toNum(arr)).toBe(result);
  });

  test('check counting sort works backwards', () => {
    const unsorted = [
      9, 8, 7, 6, 5, 4, 3, 2, 1, 1, 1, 1, 1, 1, 1, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5,
    ];
    const sorted = [...unsorted];
    sorted.sort((a, b) => b - a);
    const countingSorted = countingSort(unsorted);

    expect(sorted).toEqual(countingSorted);
  });

  test.each([
    [[3, 4], 7],
    [[4, 0], 4],
    [[0], 0],
    [[4], 4],
    [[1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 1],
  ])('check sum works', (arr: number[], result: number) => {
    expect(sum(arr)).toBe(result);
  });
});
