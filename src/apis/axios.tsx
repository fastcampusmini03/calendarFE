import axios from 'axios'
import { DatesPayload } from '../types/dates'
import { LoginRequest, SignupRequest } from '../types/request'
import { instance } from './instance'
import { LoginResponse, SignupResponse, VerifyPayload } from '../types/response'

export const getUser = async () => {
  const response = await instance.get<DatesPayload[]>('/s/user')
  return response.data
}

export const postUser = async (user) => {
  const response = await instance.post<DatesPayload[]>('/s/user',user)
  return response.data
}

/** 관리자 전용 : 모든 데이터를 가져오는 메소드 */
export const getAllDates = async () => {
  const response = await instance.get<DatesPayload[]>('/s/admin/users')
  return response.data
}

export const getSaveDates = async () => {
  const response = await instance.get<DatesPayload[]>('/s/admin/save')
  return response.data
}

export const getEditDates = async () => {
  const response = await instance.get<DatesPayload[]>('/s/admin/update')
  return response.data
}

export const getDeleteDates = async () => {
  const response = await instance.get<DatesPayload[]>('/s/admin/delete')
  return response.data
}

export const login = async (user: LoginRequest) => {
  try {
    const { data } = await instance.post<LoginResponse>('/login', user)
    return data
  } catch (error) {
    throw error
  }
}

export const signup = async (user: SignupRequest) => {
  try {
    const data = await instance.post<SignupResponse>(
      '/join',
      user,
      // {
      //   headers: { 'Content-Type': 'multipart/form-data' },
      // }
    )
    return data
  } catch (error) {
    console.log(error)
  }
}

export const verify = async () => {
  try {
    const { data } = await instance.get('/auth/verify')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const refresh = async () => {
  const { data } = await instance.get<SignupResponse>('/auth/refresh')
  return data
}
