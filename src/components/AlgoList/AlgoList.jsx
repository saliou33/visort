import { useContext, useEffect, useRef, useState } from "react";
import { actionType, algorithms } from "../../utils/constant";
import { FaBarsStaggered, FaXmark, FaCircleInfo } from "react-icons/fa6";
import Context from "../../context/Context";

const AlgoList = () => {
  const [toggled, setToggled] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

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

  const { dispatchActionInfos, actionInfos, dispatchAnimationInfos } = useContext(Context);

  const handleAlgoClick = (algo) => {
    // Reset the visualizer first
    dispatchAnimationInfos({
      type: "reset"
    });
    
    // Then select the new algorithm
    dispatchActionInfos({
      type: actionType.SELECT_ALGO,
      payload: { selectedAlgo: algo },
    });
    setToggled(false);
  };

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (toggled) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [toggled]);

  return (
    <div className="h-full">
      <button
        onClick={() => setToggled((toggled) => !toggled)}
        className="flex items-center justify-center w-12 h-12 hover:bg-gray-700 rounded-lg transition-colors"
      >
        <FaBarsStaggered className="text-gray-100 text-[1.5rem]" />
      </button>
      
      {toggled && (
        <div className="fixed inset-0 bg-black/20 z-40">
          <div
            className="absolute right-0 top-0 h-full bg-white shadow-lg max-w-[24rem] w-full z-50 flex flex-col"
            ref={ref}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h1 className="text-2xl font-bold text-gray-800">Sorting Algorithms</h1>
              <button 
                onClick={() => setToggled(false)}
                className="p-2 hover:bg-red-50 rounded-full transition-colors"
              >
                <FaXmark className="text-red-500 text-xl" />
              </button>
            </div>

            <div className="flex justify-between items-center px-6 py-4">
              <h2 className="text-gray-600 font-medium">Select Algorithm</h2>
              <button
                onClick={() => setShowGuide(true)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <FaCircleInfo /> Guide
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <div className="grid gap-3">
                {algorithms.map((algo) => (
                  <button
                    key={algo.key}
                    onClick={() => handleAlgoClick(algo)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      actionInfos.selectedAlgo?.key === algo.key
                        ? "bg-blue-50 border-2 border-blue-500"
                        : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
                    }`}
                  >
                    <h3 className="font-semibold text-gray-800">{algo.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{algo.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700">
                        Time: {algo.timeComplexity}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-200 rounded-full text-gray-700">
                        Space: {algo.spaceComplexity}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showGuide && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">How to Use</h2>
              <button
                onClick={() => setShowGuide(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaXmark className="text-gray-500" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">1. Select an Algorithm</h3>
                <p className="text-gray-600">Choose from various sorting algorithms in the sidebar. Each algorithm has its own characteristics and performance metrics.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">2. Adjust Parameters</h3>
                <p className="text-gray-600">Use the controls to adjust array size and sorting speed. A larger array size will create a more complex visualization.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">3. Control Visualization</h3>
                <p className="text-gray-600">Use the play, pause, and reset buttons to control the sorting process. Watch how the algorithm organizes the elements step by step.</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-2">Color Guide</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded"></div>
                    <span>Comparing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded"></div>
                    <span>Swapping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>Sorted</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-500 rounded"></div>
                    <span>Unsorted</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgoList;
