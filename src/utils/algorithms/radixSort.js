import { colors } from "../constant";

// Function to get the digit at a specific place value
const getDigit = (num, place) => {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
};

// Function to get the number of digits in the largest number
const digitCount = (num) => {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
};

// Function to get the number of digits in the largest number of the array
const mostDigits = (nums) => {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
};

export const radixSort = (arr) => {
  const animations = [];
  const maxDigitCount = mostDigits(arr);
  
  for (let k = 0; k < maxDigitCount; k++) {
    // Create buckets for each digit (0-9)
    const buckets = Array.from({ length: 10 }, () => []);
    
    // Place numbers in buckets
    for (let i = 0; i < arr.length; i++) {
      const digit = getDigit(arr[i], k);
      
      // Highlight current element being processed
      animations.push({
        position: [i],
        color: colors.RED,
      });
      
      buckets[digit].push(arr[i]);
    }
    
    // Reconstruct array from buckets
    let idx = 0;
    for (let b = 0; b < buckets.length; b++) {
      for (let j = 0; j < buckets[b].length; j++) {
        // Highlight position where number will be placed
        animations.push({
          position: [idx],
          color: colors.YELLOW,
        });
        
        // Place number from bucket back into array
        animations.push({
          position: [idx],
          value: [buckets[b][j]],
          color: colors.PURPLE,
        });
        
        arr[idx] = buckets[b][j];
        idx++;
      }
    }
    
    // Mark completion of this digit place
    for (let i = 0; i < arr.length; i++) {
      animations.push({
        position: [i],
        color: colors.GREEN,
        clear: false,
      });
    }
  }
  
  // Mark all elements as fully sorted
  for (let i = 0; i < arr.length; i++) {
    animations.push({
      position: [i],
      color: colors.BLUE,
      clear: false,
    });
  }
  
  return animations;
};