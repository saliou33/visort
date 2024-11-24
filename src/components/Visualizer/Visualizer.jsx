/* eslint-disable react-hooks/exhaustive-deps */
import {
  useRef,
  useLayoutEffect,
  useContext,
  useEffect,
  useState,
} from "react";

import Context from "../../context/Context";
import { actionType, animationType, colors } from "../../utils/constant";

// Create AudioContext lazily
let audioContext = null;

// Function to create beep sound
const createBeep = (frequency = 440, duration = 0.1, volume = 0.1) => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;
  
  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);
  oscillator.stop(audioContext.currentTime + duration);
};

const Visualizer = () => {
  const { dispatchAnimationInfos, actionInfos, animationInfos } =
    useContext(Context);

  // referencing the visualizer top level div
  const ref = useRef(null);

  const [step, setStep] = useState(0);

  // fn that set or reset the array
  const resetArray = () => {
    dispatchAnimationInfos({
      type: animationType.RESET,
    });
  };

  // update the animation state to running
  const startAnimation = (animationArray) => {
    dispatchAnimationInfos({
      type: animationType.START,
      payload: { animationArray },
    });
  };

  const stopAnimation = () => {
    dispatchAnimationInfos({ type: animationType.STOP });
  };

  // resume animation
  const runAnimation = () => {
    dispatchAnimationInfos({ type: animationType.RUN });
  };

  // side effects for getting the view informations
  useLayoutEffect(() => {
    dispatchAnimationInfos({
      type: animationType.VIEW,
      payload: {
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
        scale: 1,
      },
    });

    resetArray();
  }, []);

  // fn that is used to animate using an animation array
  const playAnimation = (fn) => {
    let { array } = animationInfos;
    const animations = fn(array.map(({ value }) => value));
    animations.push({ position: array.map((v, i) => i), color: colors.GREEN });
    startAnimation(animations);
  };

  // useEffect for running animation
  useEffect(() => {
    let { animationCursor, speed, animationArray, isRunning, soundEnabled } = animationInfos;

    if (
      isRunning &&
      animationArray &&
      animationCursor < animationArray.length
    ) {
      let { position, value, color } = animationArray[animationCursor];
      
      // Play sounds only if enabled
      if (soundEnabled) {
        if (color === colors.RED) {
          // Comparison sound
          createBeep(440, 0.05, 0.1); // Higher pitch for comparison
        } else if (color === colors.YELLOW) {
          // Swap sound
          createBeep(330, 0.05, 0.1); // Lower pitch for swap
        } else if (color === colors.GREEN) {
          // Sorted sound
          createBeep(660, 0.1, 0.1); // Highest pitch for sorted elements
        }
      }

      dispatchAnimationInfos({
        type: animationType.ANIMATE,
        payload: {
          position: position || [],
          value: value || [],
          color: color || "",
          clear: true,
          animationCursor: animationCursor + 1,
        },
      });

      // animation loop
      if (speed > 5) {
        setTimeout(() => setStep(animationCursor + 1), speed);
      } else {
        setStep(animationCursor + 1);
      }
    }
  }, [animationInfos.isRunning, step]);

  // action effects
  useEffect(() => {
    const handleActionChange = (actionInfos) => {
      const alertBadSelection = () => {
        alert("Please select a sorting algorithm first");
      };

      let action = actionInfos?.selectedAction;
      let algo = actionInfos?.selectedAlgo;
      let animations = animationInfos?.animationArray;

      if (!action) return;

      switch (action?.key) {
        case "reset":
          resetArray();
          break;

        case "start":
          if (!algo) {
            alertBadSelection();
            return;
          }
          if (animations && animations.length > 0) {
            runAnimation();
          } else {
            try {
              playAnimation(algo.fn);
            } catch (e) {
              console.error("Error running algorithm:", e);
              alertBadSelection();
            }
          }
          break;

        case "pause":
          stopAnimation();
          break;

        default:
          return;
      }
    };
    handleActionChange(actionInfos);
  }, [actionInfos]);

  return (
    <div className="h-full min-w-screen" ref={ref}>
      <div
        className="flex h-full justify-around gap-[0.8px] items-end array-container overflow-x-scroll"
        style={{ scale: actionInfos?.view?.scale || 1 }}
      >
        {animationInfos.array.map((elm, idx) => (
          <div
            key={idx}
            className={`flex-1 min-w-1 array-bar ${elm.bg} `}
            style={{ height: elm.value + "px" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Visualizer;
