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
