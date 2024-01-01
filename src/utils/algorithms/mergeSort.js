import { colors } from "../constant";

function merge(arr, l, m, r) {
  let animations = [];
  let n1 = m - l + 1;
  let n2 = r - m;

  // Create temp arrays
  let L = new Array(n1);
  let R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (let i = 0; i < n1; i++) L[i] = arr[l + i];
  for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  let i = 0;

  // Initial index of second subarray
  let j = 0;

  // Initial index of merged subarray
  let k = l;

  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }

    // animation 1
    animations.push({
      position: [k],
      value: [arr[k]],
      color: colors.RED,
      clear: false,
    });

    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = L[i];

    // leftover elements
    animations.push({
      position: [k],
      value: [arr[k]],
      color: colors.RED,
      clear: false,
    });
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = R[j];

    // leftover elements
    animations.push({
      position: [k],
      value: [arr[k]],
      color: colors.RED,
      clear: false,
    });
    j++;
    k++;
  }

  animations.push({
    position: animations.map((v) => v.position),
    value: animations.map((v) => v.value),
    clear: false,
  });

  return animations;
}

// l is for left index and r is
// right index of the sub-array
// of arr to be sorted
function mergeSortRecursive(arr, l, r) {
  if (l >= r) {
    return [];
  }

  let m = l + parseInt((r - l) / 2);
  let r1 = mergeSortRecursive(arr, l, m);
  let r2 = mergeSortRecursive(arr, m + 1, r);
  let animations = merge(arr, l, m, r);

  return [...r1, ...r2, ...animations];
}

export const mergeSort = (arr) => {
  return mergeSortRecursive(arr, 0, arr.length - 1);
};
