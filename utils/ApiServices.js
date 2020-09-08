import axios from 'axios'

class ApiService {
  constructor() {
    const devPort = parseInt(process.env.PORT, 10) || 3000;
    this.axios = axios.create({
      baseURL: `http://localhost:${devPort}/`
    })
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

    console.log(body, headers)
    return this.axios.post('/api/locations/', body, {
      headers
    })
  }

}

export default new ApiService();
