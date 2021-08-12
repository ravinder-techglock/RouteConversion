import axios from "axios";
import Constants from "../config/constants";

export const getUsersQuery = data => {
  return axios
    .get(`${Constants.apiBaseUrl}${Constants.adminPrefix}user/listing`, {
      headers: { "Authorization": `Bearer ${localStorage._accessToken}`},
      params: data
    })
    .then(response => response)
    .catch(err => err.response);
};

export const getUsersDetailQuery = data => {
  return axios
    .get(`${Constants.apiBaseUrl}${Constants.adminPrefix}user/${data.userId}`, {
      headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
    })
    .then(response => response)
    .catch(err => err.response);
};

export const updateUserStatusQuery = data => {
  const options = {
    headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
  };
  return axios
		.post(`${Constants.apiBaseUrl}${Constants.adminPrefix}user/active-inactive`, data, options)
		.then(response => response)
		.catch(err => err.response);
};
export const updateUserSessionQuery = data => {
  const options = {
    headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
  };
  return axios
		.post(`${Constants.apiBaseUrl}${Constants.adminPrefix}user/destroy-session`, data, options)
		.then(response => response)
		.catch(err => err.response);
};
export const updateUserDetailQuery = data => {
  const options = {
    headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
  };
  return axios
		.put(`${Constants.apiBaseUrl}${Constants.adminPrefix}user/update`, data, options)
		.then(response => response)
		.catch(err => err.response);
};
export const createUserQuery = data => {
  const options = {
    headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
  };
  return axios
		.post(`${Constants.apiBaseUrl}${Constants.adminPrefix}create/adminOrUser`, data, options)
		.then(response => response)
		.catch(err => err.response);
};
