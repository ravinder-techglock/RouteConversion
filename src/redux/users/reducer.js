const InitialState = {
  usersList: [],
  userDetail: {},
  isUserAdd: false,
  isUserUpdate: false,
  loading: false,
  error: ""
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case "ACTION_START":
      return {
        ...state,
        loading: true
      };
    case "UPDATE_ACTION_START":
      return {
        ...state,
        isUserUpdate: true
      };
    case "CREATE_ACTION_START":
      return {
        ...state,
        isUserAdd: true
      };
    case "GET_USER_DETAIL":
      return {
        ...state,
        userDetail: action.payload
      };
    case "CREATED_USER":
      return {
        ...state,
        message: action.payload,
        isUserAdd: false,
        error: ""
      };
    case "USERS_LIST":
      return {
        ...state,
        usersList: action.payload,
        total_count: action.totalCount,
        error: ""
      };
    case "UPDATE_USER_STATUS":
      const usersList = state.usersList;
      usersList[usersList.findIndex(user => user.id === action.payload.userId)].status = action.payload.status;
      return {
        ...state,
        isUserUpdate: false,
        usersList: usersList,
        error: ""
      };
    case "UPDATE_USER_SESSION":
      const usersListS = state.usersList;
      usersListS[usersListS.findIndex(user => user.id === action.payload.userId)].session = action.payload.status;
      return {
        ...state,
        isUserUpdate: false,
        usersList: usersListS,
        error: ""
      };
    case "UPDATE_USER":
      return {
        ...state,
        isUserUpdate: false,
        error: ""
      };
    case "DATA_FAILED":
      return {
        ...state,
        usersList: [],
        error: action.payload,
        total_count: 0
      };
    case "ACTION_COMPLETED":
      return {
        ...state,
        loading: false,
        isUserUpdate: false,
        isUserAdd: false
      };
    default:
      return state;
  }
};
