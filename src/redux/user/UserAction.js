import { loginUser, postNewUser } from "../../helpers/axiosHelper";
import {
  loginSuccess,
  registerSuccess,
  requestFailed,
  requestPending,
} from "./UserSlice";
import { toast } from "react-toastify";
//  for login in
export const loginAction = (form) => async (dispatch) => {
  try {
    dispatch(requestPending());
    const { status, message, user } = await loginUser(form);
    status === "success"
      ? dispatch(loginSuccess(user)) && toast[status](message)
      : dispatch(requestFailed({ status, message })) && toast[status](message);
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const registerAction = (form) => async (dispatch) => {
  try {
    dispatch(requestPending());
    const { status, message } = await postNewUser(form);
    status === "succes"
      ? dispatch(registerSuccess({ status, message })) && toast[status](message)
      : dispatch(requestFailed({ status, message })) && toast[status](message);
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
