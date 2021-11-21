/**
 * Returns a hashTable where the digits in the given array are the keys,
 * and the value is an array of indices where that digit lives
 */
export const getTable = (arr: number[]): { [key: number]: number[] } => {
  const digitTable: { [key: number]: number[] } = {};

  arr.forEach((value, idx) => {
    if (!digitTable[value]) {
      digitTable[value] = [idx];
    } else {
      digitTable[value].push(idx);
    }
  });

  return digitTable;
};

export const sum = (arr: number[]): number => {
  return arr.reduce((prev, curr) => {
    return prev + curr;
  }, 0);
};

export const toNum = (arr: number[]): number => {
  if (arr.length === 0) {
    return 0;
  }
  return parseInt(arr.join(''));
};

export const countingSort = (arr: number[]): number[] => {
  const digitTable: { [key: number]: number } = {};
  arr.forEach((value) => {
    if (!digitTable[value]) {
      digitTable[value] = 1;
    } else {
      digitTable[value]++;
    }
  });

  const ret: number[] = [];

  // This is contant time because the most it will ever be is 9
  const keys: number[] = Object.keys(digitTable)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .map((str) => parseInt(str));

  keys.forEach((key) => {
    const subArray: number[] = Array(digitTable[key]).fill(key);
    ret.push(...subArray);
  });

  return ret;
};

export const solution = (arr: number[]): number => {
  // Check the sum of all the digits, if we sum % 3 === 0, we're done
  // If sum % 3 === 1, then we need to either
  //   Remove something with remainder 1 (1,4,7)
  //   Or, if that's not possible, remove 2 that sum up to remainder 1 (2,5,8) => 2+2=4 => 4%3==1
  // If sum % 3 === 2, then we need to either
  //   Remove something with remainder 2 (2,5,8)
  //   Or, if that's not possible, remove 2 that sum up to remainder 2 (1,4,7) => 1+1=2 => 2%3==2

  // Once we do that, if we concatenate all of the digits together in descending order, we'll have the largest number possible

  const numsWithRemainderOf1 = [1, 4, 7];
  const numsWithRemainderOf2 = [2, 5, 8];

  const sorted = countingSort(arr);
  const hashTable = getTable(sorted);
  const sm = sum(sorted);
  if (sm % 3 === 0) {
    return toNum(sorted);
  } else if (sm % 3 === 1) {
    // Checks if a digit with a remainder of 1 exists
    for (const num of numsWithRemainderOf1) {
      // If it does, remove it and return the array
      if (hashTable[num]) {
        const idx = hashTable[num][0];
        sorted.splice(idx, 1);
        return toNum(sorted);
      }
    }

    // If not, try to remove 2 remainders of 2
    let count = 0;
    const indices = [-1, -1];
    for (const num of numsWithRemainderOf2) {
      if (hashTable[num]) {
        indices[count] = hashTable[num].pop() as number;
        count++;

        // Handle case of removing 2 of the same number
        if (hashTable[num].length !== 0) {
          indices[count] = hashTable[num].pop() as number;
          count++;
        }
      }
      if (count === 2) {
        sorted.splice(indices[0], 1);
        sorted.splice(indices[1], 1);
        return toNum(sorted);
      }
    }
  } else if (sm % 3 === 2) {
    // Checks if a digit with a remainder of 2 exists
    for (const num of numsWithRemainderOf2) {
      // If it does, remove it and return the array
      if (hashTable[num]) {
        const idx = hashTable[num][0];
        sorted.splice(idx, 1);
        return toNum(sorted);
      }
    }

    // If not, try to remove 2 remainders of 1
    let count = 0;
    const indices = [-1, -1];
    for (const num of numsWithRemainderOf1) {
      if (hashTable[num]) {
        indices[count] = hashTable[num].pop() as number;
        count++;

        // Handle case of removing 2 of one number
        if (hashTable[num].length !== 0) {
          indices[count] = hashTable[num].pop() as number;
          count++;
        }
      }
      if (count === 2) {
        sorted.splice(indices[0], 1);
        sorted.splice(indices[1], 1);
        return toNum(sorted);
      }
    }
  }

  return 0;
};
