const InitialState = {
  user: {},
  isLogin: false,
  loginLoading: false,
  error: ""
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case "ACTION_START":
      return {
        ...state,
        loginLoading: true
      };
    case "LOGIN_SUCCESSFUL":
      return {
        ...state,
        user: action.payload,
        isLogin: true,
        loginLoading: false,
        error: ""
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        user: {},
        error: action.payload,
        loginLoading: false,
        isLogin: false
      };
    case "ACTION_COMPLETED":
      return {
        ...state,
        loginLoading: false,
      };
    default:
      return state;
  }
};
