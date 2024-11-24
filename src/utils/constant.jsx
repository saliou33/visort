import { FaPlay, FaPause, FaRotate } from "react-icons/fa6";
import {
  quickSort,
  mergeSort,
  bubbleSort,
  insertionSort,
  selectionSort,
  heapSort,
  shellSort,
  radixSort,
} from "./algorithms";

export const colors = {
  RED: "red",
  GREEN: "green",
  YELLOW: "yellow",
  PURPLE: "purple",
  BLUE: "blue",
  CYAN: "cyan",
  SKY: "sky",
  ORANGE: "orange",
};

export const defaultColor = "slate";

export const animationColors = Object.values(colors);

export const animationType = {
  RESET: "reset",
  VIEW: "view",
  START: "start",
  STOP: "stop",
  RUN: "run",
  ANIMATE: "animate",
  SPEED: "speed",
  SET_SOUND: "SET_SOUND",
  COMPARE: "compare",
  SWAP: "swap",
  FIX: "fix",
  MERGE: "merge",
};

export const algorithmType = {
  MERGE_SORT: "merge-sort",
  BUBBLE_SORT: "bubble-sort",
  INSERTION_SORT: "insertion-sort",
  QUICK_SORT: "quick-sort",
  SELECTION_SORT: "selection-sort",
  HEAP_SORT: "heap-sort",
  SHELL_SORT: "shell-sort",
  RADIX_SORT: "radix-sort",
};

// Action buttons configuration
export const actions = [
  {
    key: "start", 
    name: "Start",
    icon: FaPlay,
  },
  {
    key: "pause", 
    name: "Pause",
    icon: FaPause,
  },
  {
    key: "reset", 
    name: "Reset",
    icon: FaRotate,
  },
];

export const algorithms = [
  { 
    key: algorithmType.MERGE_SORT,
    name: "Merge Sort",
    fn: mergeSort,
    description: "A divide-and-conquer algorithm that recursively breaks down a problem into smaller, more manageable subproblems until they become simple enough to solve directly.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(n)"
  },
  { 
    key: algorithmType.QUICK_SORT,
    name: "Quick Sort",
    fn: quickSort,
    description: "An efficient, in-place sorting algorithm that uses a divide-and-conquer strategy to sort elements around a pivot.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(log n)"
  },
  { 
    key: algorithmType.HEAP_SORT,
    name: "Heap Sort",
    fn: heapSort,
    description: "A comparison-based sorting algorithm that uses a binary heap data structure to build a max-heap and repeatedly extract the maximum element.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)"
  },
  { 
    key: algorithmType.BUBBLE_SORT,
    name: "Bubble Sort",
    fn: bubbleSort,
    description: "A simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  { 
    key: algorithmType.INSERTION_SORT,
    name: "Insertion Sort",
    fn: insertionSort,
    description: "Builds the final sorted array one item at a time by repeatedly inserting a new element into a sorted portion of the array.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  { 
    key: algorithmType.SELECTION_SORT,
    name: "Selection Sort",
    fn: selectionSort,
    description: "Divides the input into a sorted and unsorted region, repeatedly selecting the smallest element from the unsorted region.",
    timeComplexity: "O(n²)",
    spaceComplexity: "O(1)"
  },
  { 
    key: algorithmType.SHELL_SORT,
    name: "Shell Sort",
    fn: shellSort,
    description: "An optimization of insertion sort that allows the exchange of items that are far apart, reducing the number of swaps required.",
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)"
  },
  { 
    key: algorithmType.RADIX_SORT,
    name: "Radix Sort",
    fn: radixSort,
    description: "A non-comparative sorting algorithm that sorts numbers by processing each digit position, starting from the least significant digit.",
    timeComplexity: "O(nk)",
    spaceComplexity: "O(n + k)"
  }
];

export const actionType = {
  SELECT_ALGO: "select-algo",
  SET_ARRAY: "set-array",
  SET_SPEED: "set-speed",
  SET_ARRAY_SIZE: "set-array-size",
  SET_ANIMATION: "set-animation",
  SET_RUNNING: "set-running",
  SET_COMPLETED: "set-completed",
  SELECT_ACTION: "select-action",
};
