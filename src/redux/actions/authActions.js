import {
  USER_SUCCESS,
  USER_LOADING,
  USER_FAIL,
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_LOADING,
  CLEAR_ERROR,
  REGISTER_SUCCESS,
} from "../types/authTypes";

//USERLOAD
export const loadUser = () => async (dispatch, getState) => {
  const token = getState().auth.refreshToken;
  console.log("tokenIS:", token);
  if (token) {
    const result = await doRequestAndParse(
      "http://165.227.143.167:9000/auth/jwt/refresh/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: token }),
      }
    );
    const { hasError, data } = result;

    console.log("result:", result);

    if (hasError) {
      const { detail } = data;
      dispatch(userFail(detail || "Что-то пошло не так"));
    } else {
      const { user, access } = data;
      dispatch(userSuccess(user, access));
    }
  } else {
    dispatch(loginFail(""));
  }
};

//USERLOGIN
export const login = (username, password) => async (dispatch) => {
  const result = await doRequestAndParse(
    "http://165.227.143.167:9000/auth/jwt/create/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    }
  );
  const { hasError, data } = result;
  if (hasError) {
    dispatch(loginFail(data));

  } else {
    const { access, refresh } = data;
    dispatch(loginSuccess( access, refresh));
  }
};

//REGISTER
export const register = (
  email,
  username,
  password,
  toLogin
) => async (dispatch) => {
  const result = await doRequestAndParse(
    "http://165.227.143.167:9000/auth/users/",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email,username, password }),
    }
  );
  const { hasError, data } = result;
  if (hasError) {

  } else {
    const { email, username, password } = data;
    toLogin();
    dispatch(registerSuccess(email, username, password));
  }
};

// FUNCTIONS CASES
export const loginLoading = () => ({ type: LOGIN_LOADING });
export const loginSuccess = ( accessToken, refreshToken) => ({
  type: LOGIN_SUCCESS,
  payload: {  accessToken, refreshToken },
});
export const registerSuccess = (email, username, password) => ({
  type: REGISTER_SUCCESS,
  payload: { email, username, password },
});
export const loginFail = (error) => ({ type: LOGIN_FAIL, payload: error });

export const userLoading = () => ({ type: USER_LOADING });
export const userSuccess = (user, accessToken) => ({
  type: USER_SUCCESS,
  payload: { user, accessToken },
});
export const userFail = (error) => ({ type: USER_FAIL, payload: error });

export const logout = () => ({ type: LOGOUT });

export const clearError = () => ({ type: CLEAR_ERROR });

//FUNCTION  DOREQUESTANDPARSE
const doRequestAndParse = async (url, options) => {
  try {
    let hasError = false;
    const res = await fetch(url, options);
    if (!res.ok) {
      hasError = true;
    }
    const data = await res.json();
    return { hasError, data };
  } catch (err) {
    // console.log("errrrresponse::", err.res)
    return { hasError: true, data: err };
  }
};
