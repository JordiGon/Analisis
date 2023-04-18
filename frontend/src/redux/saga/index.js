import { all } from "@redux-saga/core/effects";
import userSaga from "./LoginSaga";

export default function* rootSaga() {
  yield all([userSaga()]);
}
