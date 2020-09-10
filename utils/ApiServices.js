import axios from 'axios'

class ApiService {
  constructor() {
    if(process.env.NODE_ENV === "development") {
        const devPort = parseInt(process.env.PORT, 10) || 3000;
        this.axios = axios.create({
          baseURL: `http://localhost:${devPort}/`
        })
      } else {
        this.axios = axios.create({
          baseURL: `https://maps.jonathanpark.ca/`
        })
      }
  }

  createUser(body, axiosConfig) {
    const { headers } = axiosConfig
    return this.axios.post('/api/auth/register', body, {
      headers
    })
  }

  getUser(axiosConfig) {
    const { headers } = axiosConfig
    return this.axios.get('/api/auth/user', {
      headers
    })
  }

  loginUser(body, axiosConfig) {
    const { headers } = axiosConfig
    return this.axios.post('/api/auth/login', body, {
      headers
    })
  }

  logoutUser(axiosConfig) {
    const { headers } = axiosConfig
    return this.axios.post('/api/auth/logout', null, {
      headers
    })
  }

  addLocation(body, axiosConfig) {
    const { headers } = axiosConfig

    return this.axios.post('/api/locations/', body, {
      headers
    })
  }

  getUserLocations(axiosConfig) {
    const { headers } = axiosConfig

    return this.axios.get(`/api/locations`, {
      headers
    })
  }

  updateUserLocation(locationID, body, axiosConfig) {
    const { headers } = axiosConfig

    return this.axios.patch(`/api/locations/${locationID}/`, body, {
      headers
    })
  }

  updateUserLocation(locationID, body, axiosConfig) {
    const { headers } = axiosConfig

    return this.axios.patch(`/api/locations/${locationID}/`, body, {
      headers
    })
  }

  deleteLocation(locationID, axiosConfig) {
    const { headers } = axiosConfig

    return this.axios.delete(`/api/locations/${locationID}/`, {
      headers
    })
  }

  sendFriendRequest(body, axiosConfig) {
    const { headers } = axiosConfig

    return this.axios.post(`/api/friend-request`, body, {
      headers
    })
  }

  acceptFriendRequest(body, axiosConfig) {
    const { headers } = axiosConfig

    return this.axios.post(`/api/accept-friend-request`, body, {
      headers
    })
  }

  getFriendsLocations(body, axiosConfig) {
    const { headers } = axiosConfig

    return this.axios.get(`/api/friends-location-list`, {
      headers
    })
  }

}

export default new ApiService();
