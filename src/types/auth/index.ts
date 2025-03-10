// Interface para credenciais de login
export interface LoginCredentials {
  login: string; // CPF ou CNPJ
  password: string;
}

// Resposta do login
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    role_id: number;
    role?: {
      name: string;
      level: number;
    };
  };
}

// Tokens de autenticação
export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

// Solicitação de recuperação de senha
export interface PasswordRecoveryRequest {
  login: string; // CPF ou CNPJ
}

// Redefinição de senha
export interface PasswordResetRequest {
  newPassword: string;
}

// Payload do JWT decodificado
export interface JwtPayload {
  id: number;
  role_id: number;
  iat: number;
  exp: number;
}

// Estado da autenticação
export interface AuthState {
  isAuthenticated: boolean;
  user: UserInfo | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

// Informações resumidas do usuário autenticado
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  role_id: number;
  role_name?: string;
  role_level?: number;
}
