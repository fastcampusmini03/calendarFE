import { User } from './user'
import { AccessToken, JwtPayload } from './jwt'
import { UpdateRoleData } from './dates'

export interface LoginPayload {
  content: Pick<User, 'id' | 'username' | 'email'> & Required<Pick<JwtPayload, 'iat' | 'exp'>>
  accessToken: AccessToken
}

export interface SignupPayload {
  content: Pick<User, 'id' | 'username' | 'email'> & Required<Pick<JwtPayload, 'iat' | 'exp'>>
  accessToken: AccessToken
}

export interface VerifyPayload {
  user: Pick<User, 'id' | 'username' | 'email'>
}

export type APIResponse<T = unknown, E = Error> = {
  ok: boolean
  payload?: T
  error?: E
}
// export type LoginResponse = APIResponse<LoginPayload>

// export type SignupResponse = APIResponse<SignupPayload>

export interface APIResponses {
  status: number
  msg: string
  data: UpdateRoleData
}
