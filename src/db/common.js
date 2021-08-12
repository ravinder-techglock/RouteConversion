import axios from "axios";
import Constants from "./../config/constants";

export const fileUploadQuery = data => {
  return axios
    .post(`${Constants.apiBaseUrl}${Constants.adminPrefix}upload`, data)
    .then(response => response)
    .catch(err => err.response);
};
export const updatePasswordQuery = data => {
  const options = {
    headers: { Authorization: `Bearer ${localStorage._accessToken}` }
  };
  return axios
    .post(`${Constants.apiBaseUrl}${Constants.adminPrefix}changepassword`, data, options)
    .then(response => response)
    .catch(err => err.response);
};
