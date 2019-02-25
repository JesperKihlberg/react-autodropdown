import IState from "./IState";
import { union } from "ts-action";

const All = union({});

const initialState: IState = {
  main: "Test"
};

function reducer(state: IState = initialState, action: typeof All) {
  switch (action.type) {
    default:
      return state;
  }
}

export default reducer;
