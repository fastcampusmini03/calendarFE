import axios, { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
//   import { TIMEOUTERROR_MESSAGE, TimeoutError } from "@/error";

import { getCookie, setCookie } from '../utils/cookies'
import { createBearerToken } from '../utils/bearerToken'

export const AUTHORIZATION_KEY = 'authorization'
export const ACCESSTOKEN_KEY = 'accessToken'

const getInstance = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
  })

  instance.defaults.timeout = 5000
  // instance.defaults.timeoutErrorMessage = TIMEOUTERROR_MESSAGE;

  instance.interceptors.request.use(handleRequest)

  instance.interceptors.response.use(handleResponse, handleIntercepterError)

  return instance
}

export const instance = getInstance()

function handleRequest(req: InternalAxiosRequestConfig<any>) {
  const accessToken = getCookie(ACCESSTOKEN_KEY)

  if (getCookie(ACCESSTOKEN_KEY)) {
    req.headers[AUTHORIZATION_KEY] = createBearerToken(accessToken)
  }

  return req
}

function handleResponse(res: AxiosResponse<any, any>) {
  let token = res.headers[AUTHORIZATION_KEY]

  token = token?.split(' ')
  if (token) {
    console.log('Token from header:', token[1])
    setCookie('accessToken', token[1], {
      path: '/',
      maxAge: 300000,
    })
  }
  return res
}

function handleIntercepterError(error: AxiosError) {
  if (error?.code === AxiosError.ECONNABORTED) {
    return Promise.reject({ ok: false })
  }
  return Promise.reject(error)
}
