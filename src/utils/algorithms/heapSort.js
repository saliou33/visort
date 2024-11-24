import { colors } from "../constant";

const heapify = (arr, n, i, animations) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  // Compare with left child
  if (left < n) {
    animations.push({
      position: [largest, left],
      color: colors.RED,
    });

    if (arr[left] > arr[largest]) {
      largest = left;
    }
  }

  // Compare with right child
  if (right < n) {
    animations.push({
      position: [largest, right],
      color: colors.RED,
    });

    if (arr[right] > arr[largest]) {
      largest = right;
    }
  }

  // If largest is not root
  if (largest !== i) {
    animations.push({
      position: [i, largest],
      value: [arr[largest], arr[i]],
      color: colors.YELLOW,
    });

    [arr[i], arr[largest]] = [arr[largest], arr[i]];

    // Recursively heapify the affected sub-tree
    heapify(arr, n, largest, animations);
  }
};

export const heapSort = (arr) => {
  const animations = [];
  const n = arr.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  // One by one extract an element from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    animations.push({
      position: [0, i],
      value: [arr[i], arr[0]],
      color: colors.YELLOW,
    });

    [arr[0], arr[i]] = [arr[i], arr[0]];

    // Mark the sorted element
    animations.push({
      position: [i],
      color: colors.BLUE,
      clear: false,
    });

    // Call max heapify on the reduced heap
    heapify(arr, i, 0, animations);
  }

  // Mark the last element as sorted
  animations.push({
    position: [0],
    color: colors.BLUE,
    clear: false,
  });

  return animations;
};