import { combineReducers } from 'redux'
import * as types from './types'
import { reducer as formReducer } from 'redux-form';

// INITIAL AUTH STATE
const initialAuthState = {
  token:
    (typeof window === 'undefined') ? null : localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
}

// AUTH REDUCER
const authReducer = (state = initialAuthState, action) => {
  switch(action.type) {
    case types.GET_USER_PENDING:
    case types.LOGIN_PENDING:
    case types.LOGOUT_PENDING:
      return {
        ...state,
        isLoading: true
      }
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case types.LOGIN_SUCCESS:
    case types.CREATE_USER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      }
    case types.GET_USER_FAIL:
    case types.LOGIN_FAIL:
    case types.LOGOUT_SUCCESS:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    default:
      return state;
  }
}

// INITIAL AUTH STATE
const initialLocationState = {
  selectedMarker: {},
  userLocations: []
}

const locationsReducer = (state = initialLocationState, action) => {
  switch(action.type) {
    case types.SELECT_MARKER:
      return {
        ...state,
        selectedMarker: {...action.payload}
      }
    case types.REMOVE_MARKER:
      return {
        ...state,
        selectedMarker: {}
      }
    default:
      return state;
  }
}
// COMBINED REDUCERS
const reducers = {
  form: formReducer,
  auth: authReducer,
  locations: locationsReducer
}

export default combineReducers(reducers)
