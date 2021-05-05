import {
  USER_SUCCESS,
  USER_LOADING,
  USER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  LOGIN_LOADING,
  CLEAR_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from '../types/authTypes'
import Cookies from "js-cookie"

const initialState = {
  accessToken: Cookies.get('access_token_aalam') || '',
  refreshToken: Cookies.get('refresh_token') || '',
  isAuth: false,
  user: null,
  error: null,
  isUserLoading: true,
  isLoginLoading: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isUserLoading: true,
        isAuth: false,
        error: null
      }
    case LOGIN_LOADING:
      return {
        ...state,
        isLoginLoading: true,
        error: null
      }
    case USER_SUCCESS:
      Cookies.set('access_token_aalam', action.payload.accessToken, { expires: 7 })
      return {
        ...state,
        isAuth: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isUserLoading: false,
        error: null
      }
    case REGISTER_SUCCESS:
      Cookies.set('access_token_aalam', action.payload.accessToken)
      Cookies.set('refresh_token', action.payload.refreshToken)
      return {
        ...state,
        user:action.payload.user,
        isAuth: false,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isLoginLoading:false,
      }
   
    case LOGIN_SUCCESS:
      Cookies.set('access_token_aalam', action.payload.accessToken, { expires: 7 })
      Cookies.set('refresh_token', action.payload.refreshToken, { expires: 7 })
      return {
        ...state,
        user: action.payload.user,
        isAuth: true,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        isLoginLoading: false,
        error: null
      }
    case USER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case REGISTER_FAIL:
      Cookies.remove('access_token_aalam')
      Cookies.remove('refresh_token')
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        user: null,
        isAuth: false,
        isLoginLoading: false,
        isUserLoading: false,
        error: action.payload || null
      }
    case CLEAR_ERROR:
      return {
        ...state,
        error: null
      }
    default:
      return {
        ...state
      }
  }
}
