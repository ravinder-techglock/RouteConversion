import { updatePasswordQuery } from "./../../db/common";
import { checkResponse } from "./../../config/constants";
import { toast } from 'react-toastify';
/* Show Modal Action */
export const showModal = payload => async dispatch => {
  dispatch({ type: "SHOW_MODAL" });
};
/* Hide Modal Action */
export const hideModal = payload => async dispatch => {
  dispatch({ type: "HIDE_MODAL" });
};
/* Update password */
export const updatePassword = payload => async dispatch => {
  dispatch({ type: "ACTION_START" });
  const originalResponse = await updatePasswordQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    toast.success(response.message);
    dispatch({
      type: "PASSWORD_CHANGED",
      payload: response.message,
    });
    dispatch({ type: "HIDE_MODAL" });
  } else {
    toast.error(response.error);
    dispatch({
      type: "DATA_FAILED",
      payload: response.error,
    });
  }
  dispatch({ type: "ACTION_COMPLETED" });
};
