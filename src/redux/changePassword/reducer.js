const InitialState = {
  modalProps: {
    open: false
  },
  isPasswordChanges:false,
  changePasswordLoading: false,
  error: ""
};

export default (state = InitialState, action) => {
  switch (action.type) {
    case "ACTION_START":
      return {
        ...state,
        changePasswordLoading: true
      };
    case "SHOW_MODAL":
      return {
        ...state,
        modalProps: {
          open: true
        },
      };
    case "HIDE_MODAL":
      return {
        ...state,
        modalProps: {
          open: false
        },
      };
    case "PASSWORD_CHANGED":
      return {
        ...state,
        isPasswordChanges: action.payload,
        changePasswordLoading: false,
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
        changePasswordLoading: false
      };
    default:
      return state;
  }
};
