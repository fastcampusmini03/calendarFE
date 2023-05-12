import {
  DatesPayload,
  MainDatePayload,
  ResponseApproveData,
  ResponseData,
  ResponseDeleteData,
  ResponseEditData,
  ResponseUpdateRole,
} from '../types/dates'
import { LoginRequest, SignupRequest } from '../types/request'
import { instance } from './instance'
import { LoginResponse, SignupResponse } from '../types/response'
import { ResponseUser } from '../types/user'

export const getUserDuty = async () => {
  const response = await instance.get('/s/user/annualDutyCheck')
  return response.data
}

export const getUser = async () => {
  const response = await instance.get<DatesPayload[]>('/s/user')
  return response.data
}

//@ts-ignore
export const postUser = async (user) => {
  const response = await instance.post<DatesPayload[]>('/s/user', user)
  return response.data
}

export const getUsers = async () => {
  const response = await instance.get<ResponseUser>('/s/admin/users')
  return response.data.data
}

export const getAllDates = async () => {
  const response = await instance.get<DatesPayload[]>('/s/admin/users')
  return response.data
}

/** 관리자 전용 : 모든 데이터를 가져오는 메소드 */
export const getCalendarDates = async () => {
  const response = await instance.get<ResponseData>(`/annualDuty?year=2023&month=5`)
  return response.data.data
}

export const getCalendar = async (year: any, month: any) => {
  const response = await instance.get<ResponseData>(`/annualDuty?year=${year}&month=${month}`)
  return response.data.data
}

export const getAllCalendarDates = async () => {
  const response = await instance.get<ResponseData>('/annualDuty')
  return response.data.data
}

export const getSaveDates = async () => {
  const response = await instance.get<ResponseApproveData>('/s/admin/save?page=0')
  return response.data.data
}

export const getEditDates = async () => {
  const response = await instance.get<ResponseEditData>('/s/admin/update?page=0')
  return response.data.data
}

export const getDeleteDates = async () => {
  const response = await instance.get<ResponseDeleteData>('/s/admin/delete')
  return response.data.data
}

/** 등록 승인 수락 */
export const acceptSave = async (id: number) => {
  const response = await instance.post<ResponseData>(`/s/admin/save/accept/${id}`)
  return response.data.data
}
/** 등록 승인 거절 */
export const rejectSave = async (id: number) => {
  const response = await instance.post<ResponseData>(`/s/admin/save/reject/${id}`)
  return response.data.data
}

/** 수정 승인 수락 */
export const acceptUpdate = async (id: number) => {
  const response = await instance.post<ResponseData>(`/s/admin/update/accept/${id}`)
  return response.data.data
}
/** 수정 승인 거절 */
export const rejectUpdate = async (id: number) => {
  const response = await instance.post<ResponseData>(`/s/admin/update/reject/${id}`)
  return response.data.data
}
/** 삭제 승인 수락 */
export const acceptDelete = async (id: number) => {
  const response = await instance.post<ResponseData>(`/s/admin/delete/accept/${id}`)
  return response.data.data
}
/** 삭제 승인 거절 */
export const rejectDelete = async (id: number) => {
  const response = await instance.post<ResponseData>(`/s/admin/delete/reject/${id}`)
  return response.data.data
}

/** 권한 업데이트 */
export const updateRole = async (email: string, role: string) => {
  const response = await instance.post<ResponseUpdateRole>('/s/admin/update/role', { email, role })
  return response.data.data
}

export const login = async (user: LoginRequest) => {
  try {
    const { data } = await instance.post<LoginResponse>('/login', user)
    return data
  } catch (error) {
    throw error
  }
}

export const signup = async (user: SignupRequest): Promise<SignupResponse> => {
  try {
    const { data } = await instance.post<SignupResponse>('/join', user)
    return data
  } catch (error) {
    console.log(error)
    throw error // 예외를 던져서 catch 블록에서 오류 처리를 할 수 있도록 합니다.
  }
}

export const verify = async () => {
  try {
    const { data } = await instance.get('/s/user')
    return data
  } catch (error) {
    console.log(error)
  }
}

export const refresh = async () => {
  const { data } = await instance.get<SignupResponse>('/auth/refresh')
  return data
}

/**Calendar 일정 작성, 수정, 삭제 */
export const postDate = async (post: MainDatePayload) => {
  const { data } = await instance.post('/s/user/annualDuty/save', post)
  return data
}
export const putDate = async ({ put, mainid }: any) => {
  const { data } = await instance.post(`/s/user/annualDuty/update/${mainid}`, put)
  return data
}
export const deleteDate = async (mainid: any) => {
  const { data } = await instance.post(`/s/user/annualDuty/delete/${mainid}`)
  return data
}
