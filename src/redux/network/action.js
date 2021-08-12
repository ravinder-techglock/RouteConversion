import {
  createNetworkQuery,
  getNetworkQuery,
  getNetworkDetailQuery,
  updateNetworkStatusQuery,
  updateNetworkDetailQuery,
  updateNetworkSessionQuery
} from "../../db/network";
import { checkResponse } from "../../config/constants";
import { toast } from "react-toastify";
/* Get All Network Action */
export const getNetwork = payload => async dispatch => {
  dispatch({ type: "ACTION_START" });
  const originalResponse = await getNetworkQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "NETWORKS_LIST",
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

/* Update Network Status */
export const updateNetworkStatus = payload => async dispatch => {
  dispatch({ type: "UPDATE_ACTION_START" });
  const originalResponse = await updateNetworkStatusQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "UPDATE_NETWORK_STATUS",
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
/* Update Network Session */
export const updateNetworkSession = payload => async dispatch => {
  dispatch({ type: "UPDATE_ACTION_START" });
  const originalResponse = await updateNetworkSessionQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "UPDATE_NETWORK_SESSION",
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

/* Update Network Detail */
export const updateNetworkDetail = payload => async dispatch => {
  dispatch({ type: "UPDATE_ACTION_START" });
  const originalResponse = await updateNetworkDetailQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "UPDATE_NETWORK",
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

/* Create Network Account */
export const createNetwork = payload => async dispatch => {
  dispatch({ type: "CREATE_ACTION_START" });
  const originalResponse = await createNetworkQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "CREATED_NETWORK",
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

/* Get Network By Id */
export const getNetworkDetail = payload => async dispatch => {
  dispatch({ type: "ACTION_START" });
  const originalResponse = await getNetworkDetailQuery(payload);
  const response = await checkResponse(originalResponse);
  if (response.success) {
    dispatch({
      type: "GET_NETWORK_DETAIL",
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
