import { colors } from "../constant";

export const bubbleSort = (arr) => {
  let animations = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      // animate 1
      animations.push({ position: [j, j + 1], color: colors.RED });

      if (arr[j] > arr[j + 1]) {
        // animate swap
        animations.push({
          position: [j, j + 1],
          value: [arr[j + 1], arr[j]],
          color: colors.YELLOW,
        });

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }

    // animate
    animations.push({
      position: [arr.length - i - 1],
      color: colors.BLUE,
      clear: false,
    });
  }

  return animations;
};
