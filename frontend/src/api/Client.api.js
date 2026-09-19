import axios from 'axios'

// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

// if (!BACKEND_URL) {
//   throw new Error('VITE_BACKEND_URL is not defined')
// }

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

apiClient.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      // Backend ne response bheja
      console.log('Status:', error.response.status)
      console.log('Data:', error.response.data)

      if (error.response.status === 401) {
        console.log('User not authenticated')
      }

      if (error.response.status === 500) {
        console.log('Server error')
      }
    } else if (error.request) {
      // Request gayi but response nahi aaya
      console.log('Network error')
    } else {
      // Request banane mein error
      console.log(error.message)
    }

    return Promise.reject(error)
  },
)

export default apiClient
