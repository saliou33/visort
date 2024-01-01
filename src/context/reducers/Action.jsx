import { actionType, algorithms } from "../../utils/constant";

export const initialActionInfos = {
  selectedAction: {},
  selectedAlgo: { ...algorithms[0] },
};

export const actionInfosReducer = (actionInfos, action) => {
  switch (action.type) {
    // dispatch if user click on an action
    case actionType.SELECT_ACTION:
      return {
        ...actionInfos,
        selectedAction: action?.payload?.selectedAction,
      };

    // dispatched if user select an algorithm
    case actionType.SELECT_ALGO:
      return { ...actionInfos, selectedAlgo: action?.payload?.selectedAlgo };

    default:
      throw Error("Unknow action type:" + action.type);
  }
};
