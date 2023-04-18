import * as type from "../types";

export function requestUser(payload) {
  return {
    type: type.LOGIN_REQUEST,
    payload,
  };
}
