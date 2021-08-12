import {
  createUserQuery,
  getUsersQuery,
  getUsersDetailQuery,
  updateUserStatusQuery,
  updateUserDetailQuery,
  updateUserSessionQuery
} from "../../db/users";
import { checkResponse } from "../../config/constants";
import { toast } from "react-toastify";
/* Get All User Action */
export const getUsers = payload => async dispatch => {
  dispatch({ type: "ACTION_START" });
  const originalResponse = await getUsersQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "USERS_LIST",
      payload: response.data,
      totalCount: response.totalCount
    });
  } else {
    toast.error(response.error);
    dispatch({
      type: "DATA_FAILED",
      payload: response.error
    });
  }
  dispatch({ type: "ACTION_COMPLETED" });
};

/* Update User Status */
export const updateUserStatus = payload => async dispatch => {
  dispatch({ type: "UPDATE_ACTION_START" });
  const originalResponse = await updateUserStatusQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "UPDATE_USER_STATUS",
      payload: payload
    });
  } else {
    toast.error(response.error);
    dispatch({
      type: "DATA_FAILED",
      payload: response.error
    });
  }
  dispatch({ type: "ACTION_COMPLETED" });
};
/* Update User Session */
export const updateUserSession = payload => async dispatch => {
  dispatch({ type: "UPDATE_ACTION_START" });
  const originalResponse = await updateUserSessionQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "UPDATE_USER_SESSION",
      payload: payload
    });
  } else {
    toast.error(response.error);
    dispatch({
      type: "DATA_FAILED",
      payload: response.error
    });
  }
  dispatch({ type: "ACTION_COMPLETED" });
};

/* Update User Detail */
export const updateUserDetail = payload => async dispatch => {
  dispatch({ type: "UPDATE_ACTION_START" });
  const originalResponse = await updateUserDetailQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "UPDATE_USER",
      payload: response.message
    });
  } else {
    toast.error(response.error);
    dispatch({
      type: "DATA_FAILED",
      payload: response.error
    });
  }
  dispatch({ type: "ACTION_COMPLETED" });
};

/* Create User Account */
export const createUser = payload => async dispatch => {
  dispatch({ type: "CREATE_ACTION_START" });
  const originalResponse = await createUserQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "CREATED_USER",
      payload: response.message
    });
  } else {
    toast.error(response.error);
    dispatch({
      type: "DATA_FAILED",
      payload: response.error
    });
  }
  dispatch({ type: "ACTION_COMPLETED" });
};

/* Get User By Id */
export const getUsersDetail = payload => async dispatch => {
  dispatch({ type: "ACTION_START" });
  const originalResponse = await getUsersDetailQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "GET_USER_DETAIL",
      payload: response.data
    });
  } else {
    toast.error(response.error);
    dispatch({
      type: "DATA_FAILED",
      payload: response.error
    });
  }
  dispatch({ type: "ACTION_COMPLETED" });
};
