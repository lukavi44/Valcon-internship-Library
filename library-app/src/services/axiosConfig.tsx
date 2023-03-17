import axios from 'axios'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(
  (config) => {
    ;(config.baseURL = process.env.REACT_APP_API_BASE_URL),
      (config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
