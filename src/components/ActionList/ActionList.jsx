import { useContext } from "react";
import Context from "../../context/Context";
import { actionType, actions } from "../../utils/constant";
import Params from "../Params/Params";

const ActionList = () => {
  const { dispatchActionInfos, actionInfos } = useContext(Context);

  const handleActionClick = (action) => {
    dispatchActionInfos({
      type: actionType.SELECT_ACTION,
      payload: { selectedAction: action },
    });
  };

  return (
    <div className="flex gap-2">
      {actions.map((action, idx) => (
        <button
          className={`flex items-center justify-center w-12 h-12 rounded-full text-xl text-gray-700 ${
            actionInfos?.selectedAction == action
              ? "bg-gray-500"
              : "bg-gray-100"
          } hover:bg-gray-500 hover:text-white`}
          key={idx}
          onClick={() => {
            handleActionClick(action);
          }}
        >
          <action.icon />
        </button>
      ))}
      <Params />
    </div>
  );
};

export default ActionList;
