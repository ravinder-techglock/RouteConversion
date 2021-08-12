import { combineReducers } from "redux";
import auth from "./../redux/auth/reducer";
import user from "../redux/users/reducer";
import network from "../redux/network/reducer";
import common from "./../redux/common/reducer";
import changePassword from "./../redux/changePassword/reducer";
const reducers = combineReducers({
  auth,
  user,
  common,
  network,
  changePassword
});
export default reducers;
