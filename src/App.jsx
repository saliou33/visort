import { useReducer } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Context from "./context/Context";
import Visualizer from "./components/Visualizer/Visualizer";

import {
  initialActionInfos,
  actionInfosReducer,
} from "./context/reducers/Action";

import {
  initialAnimationInfos,
  animationInfosReducer,
} from "./context/reducers/Animation";

const App = () => {
  const [actionInfos, dispatchActionInfos] = useReducer(
    actionInfosReducer,
    initialActionInfos
  );

  const [animationInfos, dispatchAnimationInfos] = useReducer(
    animationInfosReducer,
    initialAnimationInfos
  );

  return (
    <Context.Provider
      value={{
        actionInfos,
        dispatchActionInfos,
        animationInfos,
        dispatchAnimationInfos,
      }}
    >
      <div className="h-screen overflow-y-hidden flex flex-col bg-gray-300 gap-2">
        <Navbar />
        <Visualizer />
      </div>
    </Context.Provider>
  );
};
export default App;
