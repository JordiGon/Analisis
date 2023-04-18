import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";
import * as type from "../types";
import { loginUsuario } from "../../actions/UsuarioAction";

function* fetchUser(action) {
  try {
    const user = yield call(loginUsuario);
    yield put({
      type: type.LOGIN_SUCCESS,
      user: user,
    });
  } catch (error) {
    yield put({
      type: type.LOGIN_ERROR,
      message: error.message,
    });
  }
}

function* userSaga() {
  yield takeEvery(type.LOGIN_REQUEST, fetchUser);
}

export default userSaga;
