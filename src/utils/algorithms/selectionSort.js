import { colors } from "../constant";

export const selectionSort = (arr) => {
  let i, j, min_idx;
  let animations = [];

  // One by one move boundary of unsorted subarray
  for (i = 0; i < arr.length - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    animations.push({
      position: [min_idx],
      color: colors.RED,
    });

    for (j = i + 1; j < arr.length; j++) if (arr[j] < arr[min_idx]) min_idx = j;

    // Swap the found minimum element with the first element
    animations.push({
      position: [min_idx, i],
      value: [arr[i], arr[min_idx]],
      color: colors.YELLOW,
    });
    [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]];

    animations.push({
      position: [i],
      color: colors.BLUE,
      clear: false,
    });
  }

  return animations;
};
