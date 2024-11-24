import { animationColors, animationType } from "../../utils/constant";

export const initialAnimationInfos = {
  // animations details and helper
  animationArray: [],
  lastAnimation: {},
  animationCursor: 0,
  isRunning: false,
  speed: 20,
  soundEnabled: true,

  // array params
  array: [],
  arraySize: 100,
  arrayMin: 10,
  arrayMax: 500,

  // view params
  view: {
    width: 0,
    height: 0,
    scale: 1,
  },
  mode: {},
};

export const animationInfosReducer = (animationInfos, action) => {
  // current index of the animation array loop
  const animationCursor = action?.payload?.animationCursor;

  // reset color of previously dispatched animation
  const clearColor = () => {
    const { position, clear } = animationInfos.lastAnimation;
    // reset color of previous positions in animation
    if (position && clear) {
      position.map((i) => {
        animationInfos.array[i] = {
          ...animationInfos.array[i],
          bg: "bg-slate-500",
        };
      });
    }
  };

  // animation utility function
  const animate = ({ position, value, color }) => {
    // reset the color of last animationi
    clearColor();

    let finalColor =
      color ||
      animationColors[Math.floor(Math.random() * animationColors.length)];

    let bg = `bg-${finalColor}-500`;

    position.map((i, j) => {
      animationInfos.array[i] = {
        ...animationInfos.array[i],
        bg,
      };

      if (value) {
        animationInfos.array[i].value = value[j];
      }
    });
  };

  // action logics
  switch (action.type) {
    // reset the array
    case animationType.RESET:
      return {
        ...animationInfos,
        arraySize: action?.payload?.arraySize || animationInfos.arraySize,
        array: randomIntArrayInposition(
          animationInfos.arrayMin,
          animationInfos.arrayMax,
          action?.payload?.arraySize || animationInfos.arraySize
        ),
        animationArray: [],
        animationCursor: 0,
        lastAnimation: { position: [], clear: false },
        isRunning: false,
      };

    // update view informations
    case animationType.VIEW:
      return {
        ...animationInfos,
        view: action.payload.view,
      };

    // update speed
    case animationType.SPEED:
      return {
        ...animationInfos,
        speed: action.payload.speed,
      };

    // set the animation arrays
    case animationType.START:
      return {
        ...animationInfos,
        animationArray: action.payload.animationArray,
        isRunning: true,
      };

    // set isRunning to true
    case animationType.RUN:
      return {
        ...animationInfos,
        isRunning: true,
      };

    // set isRunning to false
    case animationType.STOP:
      return {
        ...animationInfos,
        isRunning: false,
      };

    // animate
    case animationType.ANIMATE:
      animate(action.payload);
      return {
        ...animationInfos,
        animationCursor,
        lastAnimation: action.payload,
      };

    case animationType.SET_SOUND:
      return {
        ...animationInfos,
        soundEnabled: action.payload.soundEnabled,
      };

    default:
      throw Error("Unknown animation type: " + action?.type);
  }
};

// helper fn to generate random array of values in position[min, max] with size n
const randomIntArrayInposition = (min, max, n = 1) => {
  return Array.from({ length: n }, () => ({
    value: Math.floor(Math.random() * (max - min + 1)) + min,
    bg: "bg-slate-500",
  }));
};
