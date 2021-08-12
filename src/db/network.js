import axios from "axios";
import Constants from "../config/constants";

export const getNetworkQuery = data => {
  return axios
    .get(`${Constants.apiBaseUrl}${Constants.adminPrefix}network/listing`, {
      headers: { "Authorization": `Bearer ${localStorage._accessToken}`},
      params: data
    })
    .then(response => response)
    .catch(err => err.response);
};

export const getNetworkDetailQuery = data => {
  return axios
    .get(`${Constants.apiBaseUrl}${Constants.adminPrefix}network/${data.networkId}`, {
      headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
    })
    .then(response => response)
    .catch(err => err.response);
};

export const updateNetworkStatusQuery = data => {
  const options = {
    headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
  };
  return axios
		.post(`${Constants.apiBaseUrl}${Constants.adminPrefix}network/active-inactive`, data, options)
		.then(response => response)
		.catch(err => err.response);
};
export const updateNetworkSessionQuery = data => {
  const options = {
    headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
  };
  return axios
		.post(`${Constants.apiBaseUrl}${Constants.adminPrefix}network/destroy-session`, data, options)
		.then(response => response)
		.catch(err => err.response);
};
export const updateNetworkDetailQuery = data => {
  const options = {
    headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
  };
  return axios
		.put(`${Constants.apiBaseUrl}${Constants.adminPrefix}network/update`, data, options)
		.then(response => response)
		.catch(err => err.response);
};
export const createNetworkQuery = data => {
  const options = {
    headers: { "Authorization": `Bearer ${localStorage._accessToken}`}
  };
  return axios
		.post(`${Constants.apiBaseUrl}${Constants.adminPrefix}create/network`, data, options)
		.then(response => response)
		.catch(err => err.response);
};
