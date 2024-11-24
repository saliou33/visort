import { useState, useContext, useRef, useEffect } from "react";
import Slider from "../Slider/Slider";
import { FaGear, FaVolumeLow, FaVolumeXmark } from "react-icons/fa6";
import Context from "../../context/Context";
import { animationType } from "../../utils/constant";

const Params = () => {
  const { dispatchAnimationInfos, animationInfos } = useContext(Context);
  const [toggled, setToggled] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setToggled(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const paramsList = [
    {
      key: "size",
      name: "Array Size",
      min: 3,
      max: 1000,
      step: 1,
      defaultValue: animationInfos?.size || 100,
      handleChange: (v) =>
        dispatchAnimationInfos({
          type: animationType.RESET,
          payload: { arraySize: v },
        }),
      disable: animationInfos?.animationArray.length > 0,
    },
    {
      key: "speed",
      name: "Animation Speed",
      min: 3,
      max: 2000,
      step: 1,
      defaultValue: animationInfos?.speed || 100,
      handleChange: (v) =>
        dispatchAnimationInfos({
          type: animationType.SPEED,
          payload: { speed: v },
        }),
    },
  ];

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    // Store sound preference
    localStorage.setItem('visortSoundEnabled', (!isSoundEnabled).toString());
    // Dispatch to animation context
    dispatchAnimationInfos({
      type: 'SET_SOUND',
      payload: { soundEnabled: !isSoundEnabled }
    });
  };

  // Load sound preference on mount
  useEffect(() => {
    const soundEnabled = localStorage.getItem('visortSoundEnabled');
    if (soundEnabled !== null) {
      const enabled = soundEnabled === 'true';
      setIsSoundEnabled(enabled);
      dispatchAnimationInfos({
        type: 'SET_SOUND',
        payload: { soundEnabled: enabled }
      });
    }
  }, []);

  return (
    <div className="relative">
      <div className="flex gap-2">
        <button
          onClick={() => setToggled(!toggled)}
          className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-700 text-xl hover:text-white hover:bg-gray-500 transition-colors"
          title="Settings"
        >
          <FaGear />
        </button>
        <button
          onClick={toggleSound}
          className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-700 text-xl hover:text-white hover:bg-gray-500 transition-colors"
          title={isSoundEnabled ? "Mute Sound" : "Enable Sound"}
        >
          {isSoundEnabled ? (
            <FaVolumeLow />
          ) : (
            <FaVolumeXmark/>
          )}
        </button>
      </div>

      {toggled && (
        <div
          ref={ref}
          className="absolute left-0 top-16 bg-white rounded-lg shadow-lg p-4 min-w-[300px] z-50"
        >
          <div className="space-y-6">
            {paramsList.map((param) => (
              <div key={param.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-gray-700">
                    {param.name}
                  </label>
                  <span className="text-sm text-gray-500">
                    {param.defaultValue}
                  </span>
                </div>
                <Slider
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  defaultValue={param.defaultValue}
                  handleChange={param.handleChange}
                  disable={param.disable}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Params;
