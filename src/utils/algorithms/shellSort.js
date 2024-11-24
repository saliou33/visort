import { colors } from "../constant";

export const shellSort = (arr) => {
  const animations = [];
  const n = arr.length;
  
  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
    // Do a gapped insertion sort for this gap size
    for (let i = gap; i < n; i++) {
      // Add this element to gap sorting
      let temp = arr[i];
      let j;

      // Highlight the current gap elements being compared
      animations.push({
        position: [i, i - gap],
        color: colors.PURPLE,
      });

      // Shift earlier gap-sorted elements up until the correct location for a[i] is found
      for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
        // Compare elements
        animations.push({
          position: [j, j - gap],
          color: colors.RED,
        });

        // Swap elements
        animations.push({
          position: [j, j - gap],
          value: [arr[j - gap], arr[j]],
          color: colors.YELLOW,
        });

        arr[j] = arr[j - gap];
      }

      // Put temp in its correct location
      arr[j] = temp;

      // Mark the element as placed
      animations.push({
        position: [j],
        color: colors.GREEN,
        clear: false,
      });
    }
  }

  // Mark all elements as sorted at the end
  for (let i = 0; i < n; i++) {
    animations.push({
      position: [i],
      color: colors.BLUE,
      clear: false,
    });
  }

  return animations;
};