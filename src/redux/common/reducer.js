const InitialState = {
  images: '',
  fileLoading: false,
  error: ""
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case "ACTION_START":
      return {
        ...state,
        fileLoading: true
      };
    case "FILE_UPLOADED":
      return {
        ...state,
        images: action.payload,
        error: ''
      };
    case "DATA_FAILED":
      return {
        ...state,
        images: '',
        error: action.payload
      };
    case "ACTION_COMPLETED":
      return {
        ...state,
        fileLoading: false
      };
    default:
      return state;
  }
};
