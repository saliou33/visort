import { useState, useContext, useRef, useEffect } from "react";
import Slider from "../Slider/Slider";
import { FaCodeCompare } from "react-icons/fa6";
import Context from "../../context/Context";
import { animationType } from "../../utils/constant";

const Params = () => {
  const { dispatchAnimationInfos, animationInfos } = useContext(Context);

  const [toggled, setToggled] = useState(false);

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
      name: "Size",
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
      name: "Speed/Delay",
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

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100  hover:bg-gray-500 hover:text-white"
        onClick={() => setToggled((toggled) => !toggled)}
      >
        <FaCodeCompare className="text-[1rem]" />
      </button>

      {toggled && (
        <div
          className="w-[12rem] absolute bg-slate-100 text-gray-70 shadow-md p-3 rounded-xl -left-[125%] top-[110%] border border-slate-200"
          ref={ref}
        >
          {paramsList.map((param) => (
            <Slider key={param.key} {...param} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Params;
