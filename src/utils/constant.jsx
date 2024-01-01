import { FaPlay, FaForwardStep, FaPause, FaRotate } from "react-icons/fa6";
import { quickSort, mergeSort, bubbleSort } from "./algorithms";

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
  QUICK_SORT: "quick-sort",
};

export const algorithms = [
  { key: algorithmType.MERGE_SORT, name: "Merge sort", fn: mergeSort },
  { key: algorithmType.BUBBLE_SORT, name: "Bubble sort", fn: bubbleSort },
  { key: algorithmType.QUICK_SORT, name: "Quick sort", fn: quickSort },
];

export const actionType = {
  START: "start",
  Pause: "pause",
  RESET: "reset",
  RESUME: "resume",
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
  {
    key: actionType.RESUME,
    name: "Resume",
    icon: FaForwardStep,
    color: colors.BLUE,
  },
  { key: actionType.RESET, name: "Reset", icon: FaRotate },
];
