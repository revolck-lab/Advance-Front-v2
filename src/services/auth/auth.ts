import { login, register, getUserProfile } from "@/services/api-client/auth";
import { LoginRequest, RegisterUserRequest, User } from "@/types/users";
import { CustomJwtPayload } from "@/types/auth";
import jwt from "jsonwebtoken";

export const handleLogin = async (
  data: LoginRequest
): Promise<{ user: User; token: string }> => {
  try {
    const { token } = await login(data);
    localStorage.setItem("token", token);
    const user = await getUserProfile();
    return { user, token };
  } catch {
    throw new Error("Login failed");
  }
};

export async function verifyToken(token: string): Promise<CustomJwtPayload> {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "sua-chave-secreta"
    ) as CustomJwtPayload;
    return decoded;
  } catch {
    throw new Error("Token inválido");
  }
}

export const handleRegister = async (
  data: RegisterUserRequest
): Promise<User> => {
  try {
    const user = await register(data);
    return user;
  } catch {
    throw new Error("Registration failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
