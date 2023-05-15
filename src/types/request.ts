import { User } from './user'

export type LoginRequest = Pick<User, 'email' | 'password'>

export type SignupRequest = Pick<User, 'email' | 'password' | 'username'> & {
  profile?: File
}
