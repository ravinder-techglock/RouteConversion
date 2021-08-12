import { fileUploadQuery } from "./../../db/common";
import { toast } from 'react-toastify';
/* Upload Image Action */
export const fileUploadAction = payload => async dispatch => {
  dispatch({ type: "ACTION_START" });
  const response = await fileUploadQuery(payload);
  if (response.status === 201) {
    dispatch({
      type: "FILE_UPLOADED",
      payload: response.data?.uploads?.[0]?.path,
    });
  } else {
    toast.error('Somthing went wrong in file uploading!');
    dispatch({
      type: "DATA_FAILED",
      payload: 'Somthing went wrong in file uploading!'
    });
  }
  dispatch({ type: "ACTION_COMPLETED" });
};
