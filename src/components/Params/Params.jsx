import { useState, useContext } from "react";
import Slider from "../Slider/Slider";
import { FaCodeCompare } from "react-icons/fa6";
import Context from "../../context/Context";
import { animationType } from "../../utils/constant";

const Params = () => {
  const [toggled, setToggled] = useState(false);
  const { dispatchAnimationInfos, animationInfos } = useContext(Context);

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
        <FaCodeCompare className={`text-[1.5rem] text-orange-500`} />
      </button>

      {toggled && (
        <div className="w-[12rem] absolute bg-gray-400 p-3 rounded-xl -left-[125%] top-[110%] border border-slate-200 shadow-sm">
          {paramsList.map((param) => (
            <Slider key={param.key} {...param} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Params;
