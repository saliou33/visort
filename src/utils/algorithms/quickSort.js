import { colors, defaultColor } from "../constant";

function partition(arr, low, high) {
  // animations array
  let animations = [];
  let interval = [];
  // Choosing the pivot
  let pivot = arr[high];
  // color the pivot bar
  animations.push({ position: [high], color: colors.BLUE, clear: false });

  // Index of smaller element and indicates the right position of pivot found so far
  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    // If current element is smaller than the pivot
    if (arr[j] < pivot) {
      // Increment index of smaller element
      i++;
      //animate swap
      animations.push({
        position: [i, j],
        value: [arr[j], arr[i]],
        color: defaultColor,
      });

      //color inf
      animations.push({
        position: [j],
        color: colors.YELLOW,
        clear: false,
      });
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    } else {
      //color sup
      animations.push({
        position: [j],
        color: colors.RED,
        clear: false,
      });
    }

    interval.push(j);
  }

  // last swapp
  animations.push({
    position: [i + 1, high],
    value: [arr[high], arr[i + 1]],
    color: defaultColor,
  });
  animations.push({ position: [i + 1], color: colors.BLUE });
  animations.push({ position: interval, color: defaultColor });

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot to its correct position

  return [animations, i + 1]; // Return the partition index
}

// The main function that implements QuickSort
function quickSortRecursive(arr, low, high) {
  if (low < high) {
    // pi is the partitioning index, arr[pi] is now at the right place
    let [animations, pi] = partition(arr, low, high);

    // // Separately sort elements before partition and after partition
    let r1 = quickSortRecursive(arr, low, pi - 1);
    let r2 = quickSortRecursive(arr, pi + 1, high);

    return [...animations, ...r1, ...r2];
  }

  return [];
}

export const quickSort = (arr) => {
  return quickSortRecursive(arr, 0, arr.length - 1);
};
