import * as type from "../types";

const inicialState = {
  loading: false,
  user: [],
  error: null,
};

export default function user(state = inicialState, action) {
  switch (action.type) {
    case type.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.message,
      };
    case type.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case type.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.user,
      };
    default:
      break;
  }
}
