import axios from 'axios'
import { DatesPayload } from '../types/dates'
import { LoginRequest, SignupRequest } from '../types/request'
import { instance } from './instance'
import { LoginResponse, SignupResponse, VerifyPayload } from '../types/response'

export const getDates = async () => {
  const response = await axios.get<DatesPayload[]>('/annualDuty')
  return response.data
}

export const login = async (user: LoginRequest) => {
  try {
    const { data } = await instance.post<LoginResponse>("/auth/login", user);
    return data;
  } catch (error) {
    throw error;
  }
};

export const signup = async ({ email, password, username }: SignupRequest) => {
  try {
    const { data } = await instance.post<SignupResponse>(
      "/auth/signup",
      {
        email,
        password,
        username,
      },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const verify = async () => {
  try {
    const { data } = await instance.get("/auth/verify");
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const refresh = async () => {
  const { data } = await instance.get<SignupResponse>("/auth/refresh");
  return data;
};