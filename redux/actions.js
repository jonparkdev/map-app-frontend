import ApiService from '../utils/ApiServices'

// HELPER:  SET HEADER WITH AUTHORIZATION
export const tokenConfig = (getState) => {
  // Headers
  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  // If token exists add to header
  const token = getState().auth.token
  if(token){
    axiosConfig.headers['Authorization'] = `Token ${token}`
  }

  return axiosConfig
}

// GET USER ACTION CREATORS
export const getUserFailure = (err) => {
  return { type: "GET_USER_FAIL" }
}
export const getUserPending = () => {
  return { type: "GET_USER_PENDING" }
}
export const getUserSuccess = (payload) => {
  return { type: "GET_USER_SUCCESS", payload }
}

// ASYNC GET USER ACTION CREATOR
export function getUser() {
  return async (dispatch, getState) => {
    dispatch(getUserPending())

    const axiosConfig = tokenConfig(getState)

    try {
      const response = await ApiService.getUser(axiosConfig)
      dispatch(getUserSuccess(response.data))
    } catch (err) {
      dispatch(getUserFailure())
    }
  }
}


// LOGIN ACTION CREATORS
export const loginUserFailure = (err) => {
  return { type: "LOGIN_FAIL" }
}
export const loginUserPending = () => {
  return { type: "LOGIN_PENDING" }
}
export const loginUserSuccess = (payload) => {
  return { type: "LOGIN_SUCCESS", payload }
}

// ASYNC LOGIN ACTION CREATOR
export function loginUser({ username, password }) {
  return async (dispatch, getState) => {
    dispatch(loginUserPending())

    // Headers
    const axiosConfig = tokenConfig(getState)

    // Request Body
    const body = JSON.stringify({ username, password })

    try {
      const response = await ApiService.loginUser(body, axiosConfig)
      dispatch(loginUserSuccess(response.data))
    } catch (err) {
      dispatch(loginUserFailure())
    }
  }
}

// LOGOUT ACTION CREATORS
export const logoutUserFailure = (err) => {
  return { type: "LOGOUT_FAIL" }
}
export const logoutUserPending = () => {
  return { type: "LOGOUT_PENDING" }
}
export const logoutUserSuccess = () => {
  return { type: "LOGOUT_SUCCESS" }
}

// LOGOUT USER
export function logout() {
  return async (dispatch, getState) => {
    dispatch(logoutUserPending())

    // Headers
    const axiosConfig = tokenConfig(getState)
    console.log(axiosConfig )

    try {
      const response = await ApiService.logoutUser(axiosConfig)
      dispatch(logoutUserSuccess())
    } catch (err) {
      dispatch(logoutUserFailure(err))
    }
  }
}

// CREATE USER ACTION CREATOR
export const createUserFailure = (err) => {
  return { type: "CREATE_USER_FAIL" }
}
export const createUserPending = () => {
  return { type: "CREATE_USER_PENDING" }
}
export const createUserSuccess = (payload) => {
  return { type: "CREATE_USER_SUCCESS", payload }
}

// ASYNC CREATE USER ACTION CREATOR
export function createUser(payload) {
  return async (dispatch, getState) => {
    dispatch(createUserPending())

    // Headers
    const axiosConfig = tokenConfig(getState)

    // Request Body
    const body = JSON.stringify(payload)

    try {
      const response = await ApiService.createUser(body, axiosConfig)
      dispatch(createUserSuccess(response.data))
    } catch (err) {
      dispatch(createUserFailure())
    }
  }
}

// SELECTED MARKER ACTION
export const selectMarker = (payload) => {
  return {type: "SELECT_MARKER", payload }
}
// REMOVE MARKER ACTION
export const removeMarker = () => {
  return { type: "REMOVE_MARKER" }
}


// ADD LOCATION ACTION CREATOR
export const addLocationFailure = (err) => {
  return { type: "ADD_LOCATION_FAIL" }
}
export const addLocationPending = () => {
  return { type: "ADD_LOCATION_PENDING" }
}
export const addLocationSuccess = (payload) => {
  return { type: "ADD_LOCATION_SUCCESS", payload }
}

// ASYNC CREATE USER ACTION CREATOR
export function addLocation(payload) {
  return async (dispatch, getState) => {
    dispatch(addLocationPending())

    // Headers
    const axiosConfig = tokenConfig(getState)

    const owner = getState().auth.user.id
    // Request Body
    const body = JSON.stringify({...payload, owner})

    try {
      const response = await ApiService.addLocation(body, axiosConfig)
      dispatch(addLocationSuccess(response.data))
    } catch (err) {
      dispatch(addLocationFailure())
    }
  }
}
