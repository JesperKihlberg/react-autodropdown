import { combineReducers } from "redux";
import IState from "./IState";
import main from "Pages/Main/reducers";

const reducers = combineReducers<IState>({
  main
});

export default reducers;
