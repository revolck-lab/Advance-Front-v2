import apiClient from "@/services/api-client";
import {
  LoginRequest,
  LoginResponse,
  RegisterUserRequest,
  User,
  PasswordResetRequest,
  PasswordResetResponse,
} from "@/types/users";

export const login = async (data: LoginRequest) => {
  const response = await apiClient.post<LoginResponse>("/api/auth/login", data);
  return response.data;
};

export const register = async (data: RegisterUserRequest) => {
  const response = await apiClient.post<User>("/api/auth/register", data);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await apiClient.get<User>("/api/auth/welcome");
  return response.data;
};

export const requestPasswordReset = async (data: PasswordResetRequest) => {
  const response = await apiClient.post<PasswordResetResponse>(
    "/api/password/recovery",
    data
  );
  return response.data;
};
