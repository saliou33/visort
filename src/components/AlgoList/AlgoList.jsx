import { useContext, useState } from "react";
import { actionType, algorithms } from "../../utils/constant";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import Context from "../../context/Context";

const AlgoList = () => {
  const [toggled, setToggled] = useState(false);

  const { dispatchActionInfos, actionInfos } = useContext(Context);

  const handleAlgoClick = (algo) => {
    dispatchActionInfos({
      type: actionType.SELECT_ALGO,
      payload: { selectedAlgo: algo },
    });
  };

  return (
    <div className="h-full">
      <button
        onClick={() => setToggled((toggled) => !toggled)}
        className="flex items-center justify-center w-12 h-12"
      >
        <FaBarsStaggered className="text-gray-100 text-[1.5rem]" />
      </button>
      {toggled && (
        <div className="absolute right-0 top-0 h-screen bg-gray-100 px-2 max-w-[20rem] w-full ">
          <div className="flex justify-between mb-5">
            <h1>Algorithms</h1>
            <button onClick={() => setToggled(false)}>
              <FaXmark className="text-red-500" />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {algorithms.map((algo) => (
              <button
                className={`rounded-md p-2  hover:text-white ${
                  actionInfos?.selectedAlgo.key == algo.key
                    ? "bg-cyan-500 hover:bg-cyan-600"
                    : "bg-gray-300 hover:bg-gray-500"
                }`}
                key={algo.key}
                onClick={() => {
                  handleAlgoClick(algo);
                }}
              >
                {algo.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgoList;
