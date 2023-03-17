import { AxiosResponse } from 'axios'
import axiosInstance from './axiosConfig'

export interface LoginRequestData {
  email: string
  password: string
}

export interface LoginResponseData {
  AccessToken: string
  RefreshToken: string
  Expiration: string
}

const LoginRequest = async (body: LoginRequestData): Promise<AxiosResponse<LoginResponseData>> => {
  return axiosInstance.post<LoginResponseData>('api/Auth/login', body)
}

export default LoginRequest
