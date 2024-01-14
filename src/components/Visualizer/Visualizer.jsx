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
    let { animationCursor, speed, animationArray, isRunning } = animationInfos;

    if (
      isRunning &&
      animationArray &&
      animationCursor < animationArray.length
    ) {
      let { position, value, color, clear } = animationArray[animationCursor];
      dispatchAnimationInfos({
        type: animationType.ANIMATE,
        payload: {
          position: position || [],
          value: value || [],
          color: color || "",
          clear: clear === undefined ? true : false,
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
        alert("Algorithm not selected or not supported");
      };

      let action = actionInfos?.selectedAction;
      let algo = actionInfos?.selectedAlgo;
      let animations = animationInfos?.animationArray;

      if (!action) return;

      switch (action?.key) {
        // on click reset
        case actionType.RESET:
          return resetArray();

        // on click start
        case actionType.START:
          if (animations && animations?.length > 0) {
            return runAnimation();
          }

          try {
            playAnimation(algo?.fn);
          } catch (e) {
            alertBadSelection();
          }
          return;
        // on click pause
        case actionType.PAUSE:
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
