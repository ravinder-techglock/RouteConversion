const InitialState = {
  networksList: [],
  networkDetail: {},
  isNetworkAdd: false,
  isNetworkUpdate: false,
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
        isNetworkUpdate: true
      };
    case "CREATE_ACTION_START":
      return {
        ...state,
        isNetworkAdd: true
      };
    case "GET_NETWORK_DETAIL":
      return {
        ...state,
        networkDetail: action.payload
      };
    case "CREATED_NETWORK":
      return {
        ...state,
        message: action.payload,
        isNetworkAdd: false,
        error: ""
      };
    case "NETWORKS_LIST":
      return {
        ...state,
        networksList: action.payload,
        total_count: action.totalCount,
        error: ""
      };
    case "UPDATE_NETWORK_STATUS":
      const networksList = state.networksList;
      networksList[networksList.findIndex(network => network.id === action.payload.networkId)].active = action.payload.status;
      return {
        ...state,
        isNetworkUpdate: false,
        networksList: networksList,
        error: ""
      };
    case "UPDATE_NETWORK":
      return {
        ...state,
        isNetworkUpdate: false,
        error: ""
      };
    case "DATA_FAILED":
      return {
        ...state,
        networksList: [],
        error: action.payload,
        total_count: 0
      };
    case "ACTION_COMPLETED":
      return {
        ...state,
        loading: false,
        isNetworkUpdate: false,
        isNetworkAdd: false
      };
    default:
      return state;
  }
};
