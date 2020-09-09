import ApiService from '../utils/ApiServices'
import { tokenConfig } from './utils'

/**
 *
 *  AUTH ACTIONS
 *
 */

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

/**
 *
 * LOCATION ACTIONS
 *
 */

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

// ASYNC CREATE LOCATION ACTION CREATOR
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
      await dispatch(getUserLocations())
    } catch (err) {
      dispatch(addLocationFailure())
    }
  }
}

// UPDATE LOCATION ACTION CREATOR
export const updateLocationFailure = (err) => {
  return { type: "UPDATE_LOCATION_FAIL" }
}
export const updateLocationPending = () => {
  return { type: "UPDATE_LOCATION_PENDING" }
}
export const updateLocationSuccess = (payload) => {
  return { type: "UPDATE_LOCATION_SUCCESS", payload }
}

// ASYNC UPDATE LOCATION ACTION CREATOR
export function updateLocation({ name, locationID }) {
  return async (dispatch, getState) => {
    dispatch(updateLocationPending())
    // Headers
    const axiosConfig = tokenConfig(getState)

    // Request Body
    const body = JSON.stringify({ name })

    try {
      const response = ApiService.updateUserLocation(locationID, body, axiosConfig)
      dispatch(updateLocationSuccess(response.data))
      await dispatch(getUserLocations())
    } catch (err) {
      dispatch(updateLocationFailure())
    }
  }
}

// DELETE LOCATION ACTION CREATOR
export const deleteLocationFailure = (err) => {
  return { type: "DELETE_LOCATION_FAIL" }
}
export const deleteLocationPending = () => {
  return { type: "DELETE_LOCATION_PENDING" }
}
export const deleteLocationSuccess = (payload) => {
  return { type: "DELETE_LOCATION_SUCCESS", payload }
}

// ASYNC DELETE LOCATION ACTION CREATOR
export function deleteLocation({ locationID }) {
  return async (dispatch, getState) => {
    dispatch(deleteLocationPending())

    // Headers
    const axiosConfig = tokenConfig(getState)

    try {
      const response = ApiService.deleteLocation(locationID, axiosConfig)
      dispatch(deleteLocationSuccess(response.data))
      await dispatch(getUserLocations())
    } catch (err) {
      dispatch(deleteLocationFailure())
    }
  }
}

// GET LOCATIONS ACTION CREATOR
export const getUserLocationsFailure = (err) => {
  return { type: "GET_LOCATIONS_FAIL" }
}
export const getUserLocationsPending = () => {
  return { type: "GET_LOCATIONS_PENDING" }
}
export const getUserLocationsSuccess = (payload) => {
  return { type: "GET_LOCATIONS_SUCCESS", payload }
}

// ASYNC RETRIEVE USER LOCATIONS
export function getUserLocations(payload) {
  return async (dispatch, getState) => {
    dispatch(getUserLocationsPending())

    // Headers
    const axiosConfig = tokenConfig(getState)

    try {
      const response = await ApiService.getUserLocations(axiosConfig)
      dispatch(getUserLocationsSuccess(response.data))
    } catch (err) {
      dispatch(getUserLocationsFailure())
    }
  }
}

// GET FRIENDS LOCATIONS ACTION CREATOR
export const getFriendsLocationsFailure = (err) => {
  return { type: "GET_FRIENDS_LOCATIONS_FAIL" }
}
export const getFriendsLocationsPending = () => {
  return { type: "GET_FRIENDS_LOCATIONS_PENDING" }
}
export const getFriendsLocationsSuccess = (payload) => {
  return { type: "GET_FRIENDS_LOCATIONS_SUCCESS", payload }
}

// ASYNC RETRIEVE USER LOCATIONS
export function getFriendsLocations(payload) {
  return async (dispatch, getState) => {
    dispatch(getFriendsLocationsPending())

    // Headers
    const axiosConfig = tokenConfig(getState)

    // body
    const body = JSON.stringify(payload)

    try {
      const response = await ApiService.getFriendsLocations(body, axiosConfig)
      console.log(response.data)
      dispatch(getFriendsLocationsSuccess(response.data))
    } catch (err) {
      dispatch(getFriendsLocationsFailure())
    }
  }
}

/**
 *
 * SHARE REQUESTS
 *
 */

 // SHARE LOCATIONS ACTION CREATOR
 export const shareFailure = (err) => {
   return { type: "SHARE_FAIL" }
 }
 export const sharePending = () => {
   return { type: "SHARE_PENDING" }
 }
 export const shareSuccess = (payload) => {
   return { type: "SHARE_SUCCESS", payload }
 }

 // ASYNC SHARE USER LOCATIONS
 export function sendFriendRequest(payload) {
   return async (dispatch, getState) => {
     dispatch(sharePending())

     // Headers
     const axiosConfig = tokenConfig(getState)


     // body
     const body = JSON.stringify(payload)

     try {
       const response = await ApiService.sendFriendRequest(body, axiosConfig)
       dispatch(shareSuccess(response.data))
     } catch (err) {
       dispatch(shareFailure())
     }
   }
 }

 // ACCEPT REQUEST ACTION CREATOR
 export const acceptFailure = (err) => {
   return { type: "SHARE_FAIL" }
 }
 export const acceptPending = () => {
   return { type: "SHARE_PENDING" }
 }
 export const acceptSuccess = (payload) => {
   return { type: "SHARE_SUCCESS", payload }
 }

 // ACCEPT USER LOCATIONS
 export function acceptFriendRequest(payload) {
   return async (dispatch, getState) => {
     dispatch(acceptPending())

     // Headers
     const axiosConfig = tokenConfig(getState)

     // body
     const body = JSON.stringify(payload)

     try {
       const response = await ApiService.acceptFriendRequest(body, axiosConfig)
       dispatch(acceptSuccess(response.data))
     } catch (err) {
       dispatch(acceptFailure())
     }
   }
 }
