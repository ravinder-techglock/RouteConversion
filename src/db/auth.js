import axios from "axios";
import Constants from "./../config/constants";

export const doLogin = (data) => {
    return axios
		.post(`${Constants.apiBaseUrl}${Constants.adminPrefix}login`, data)
		.then(response => response)
		.catch(err => err.response);
}