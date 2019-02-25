import mainSaga from "Pages/Main/saga";
import { fork } from "redux-saga/effects";

// import { fork } from "redux-saga/effects";

export default function* root() {
  yield [fork(mainSaga)];
}
