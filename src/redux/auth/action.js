import { doLogin } from "./../../db/auth";
import { checkResponse } from "./../../config/constants";
import { toast } from "react-toastify";
/* Login */
export const login = payload => async dispatch => {
  dispatch({ type: "ACTION_START" });
  const originalResponse = await doLogin(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    let token = response.accessToken;
    let user = btoa(JSON.stringify(response.data));
    localStorage.setItem("_accessToken", token);
    localStorage.setItem("_user", user);
    dispatch({
      type: "LOGIN_SUCCESSFUL",
      payload: response.data
    });
  } else {
    toast.error(response.error);
    dispatch({
      type: "LOGIN_FAILED",
      payload: response.error
    });
  }
  dispatch({
    type: "ACTION_COMPLETED"
  });
};
