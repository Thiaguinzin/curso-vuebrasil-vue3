import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UsersService from './users'
import { setGlobalLoading } from '../store/global'
import FeedbacksService from './feedbacks'

const API_ENVS = {
  production: 'https://backend-vue-brasil-vue3.vercel.app/',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

httpClient.interceptors.request.use(config => {
    setGlobalLoading(true)
    const token = window.localStorage.getItem('token');

    if (token) {
      config.headers.setAuthorization(`Bearer ${token}`)
    }

    return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  const canThrowAnError = error.request.status === 0 || error.request.status === 500

  if (canThrowAnError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  if (error.response.status === 401) {
    router.push({name: 'Home'})
  }

  setGlobalLoading(false)
  return error
})

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
