import { FaPlay, FaPause, FaRotate } from "react-icons/fa6";
import {
  quickSort,
  mergeSort,
  bubbleSort,
  insertionSort,
  selectionSort,
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
  RUN: "run",
  START: "start",
  STOP: "stop",
  VIEW: "view",
  SPEED: "speed",
  COMPARE: "compare",
  SWAP: "swap",
  FIX: "fix",
  MERGE: "merge",
  ANIMATE: "animate",
};

export const algorithmType = {
  MERGE_SORT: "merge-sort",
  BUBBLE_SORT: "bubble-sort",
  INSERTION_SORT: "insertion-sort",
  QUICK_SORT: "quick-sort",
  SELECTION_SORT: "selection-sort",
};

export const algorithms = [
  { key: algorithmType.MERGE_SORT, name: "Merge sort", fn: mergeSort },
  { key: algorithmType.BUBBLE_SORT, name: "Bubble sort", fn: bubbleSort },
  { key: algorithmType.QUICK_SORT, name: "Quick sort", fn: quickSort },
  {
    key: algorithmType.INSERTION_SORT,
    name: "Insertion sort",
    fn: insertionSort,
  },
  { key: algorithmType.SELECTION_SORT, name: "Select sort", fn: selectionSort },
];

export const actionType = {
  START: "start",
  PAUSE: "pause",
  RESET: "reset",
  SELECT_ACTION: "select-action",
  SELECT_ALGO: "select-algo",
};

export const actions = [
  {
    key: actionType.START,
    name: "Start",
    icon: FaPlay,
    color: colors.GREEN,
  },
  {
    key: actionType.PAUSE,
    name: "Pause",
    icon: FaPause,
    color: colors.RED,
  },

  { key: actionType.RESET, name: "Reset", icon: FaRotate },
];
