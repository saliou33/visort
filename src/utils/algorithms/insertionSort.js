import { colors } from "../constant";

export const insertionSort = (arr) => {
  let animations = [];

  let i, key, j;

  for (i = 1; i < arr.length; i++) {
    key = arr[i];
    animations.push({ position: [i], color: colors.RED, clear: false });
    j = i - 1;

    /* Move elements of arr[0..i-1], that are  
        greater than key, to one position ahead  
        of their current position */
    while (j >= 0 && arr[j] > key) {
      animations.push({
        position: [j + 1],
        value: [arr[j]],
        color: colors.YELLOW,
      });

      arr[j + 1] = arr[j];
      j = j - 1;
    }

    animations.push({
      position: [j + 1],
      value: [key],
      color: colors.BLUE,
    });
    arr[j + 1] = key;
  }

  return animations;
};
