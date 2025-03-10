import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/storage";
import { API_ROUTES } from "@/constants/api-endpoints";
import { STORAGE_KEYS } from "@/constants/storage-keys";

/**
 * Classe que encapsula toda a lógica de configuração e interceptação do Axios
 * para manter um código limpo e facilitar manutenção/testes
 */
class ApiClient {
  private client: AxiosInstance;
  private authToken: string | null = null;
  private refreshToken: string | null = null;
  private refreshPromise: Promise<string> | null = null;

  constructor(config: AxiosRequestConfig = {}) {
    // Configurações base do cliente
    this.client = axios.create({
      baseURL:
        process.env.NEXT_PUBLIC_API_URL ||
        "https://advancemais-api.onrender.com/api",
      timeout: 30000, // 30 segundos
      headers: {
        "Content-Type": "application/json",
      },
      ...config,
    });

    // Inicializa tokens (se disponíveis)
    this.loadTokens();

    // Configura interceptadores
    this.setupInterceptors();
  }

  /**
   * Carrega tokens do localStorage para memória
   */
  private loadTokens(): void {
    if (typeof window !== "undefined") {
      this.authToken = getLocalStorage<string>(STORAGE_KEYS.AUTH_TOKEN);
      this.refreshToken = getLocalStorage<string>(STORAGE_KEYS.REFRESH_TOKEN);
    }
  }

  /**
   * Configura interceptadores para requisições e respostas
   */
  private setupInterceptors(): void {
    // Interceptador de requisição - adiciona token
    this.client.interceptors.request.use(
      (config) => {
        // Verifica se tem token e adiciona ao cabeçalho
        if (this.authToken) {
          config.headers.Authorization = `Bearer ${this.authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // Interceptador de resposta - lida com erros e refresh token
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & {
          _retry?: boolean;
        };

        // Verifica se é erro 401 (não autorizado) e temos token de refresh
        if (
          error.response?.status === 401 &&
          this.refreshToken &&
          !originalRequest._retry
        ) {
          if (!this.refreshPromise) {
            // Inicia processo de refresh de token
            this.refreshPromise = this.refreshAuthToken();
          }

          try {
            // Aguarda conclusão do refresh
            const newToken = await this.refreshPromise;
            this.refreshPromise = null;

            // Atualiza token na requisição original e retenta
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newToken}`,
            };
            originalRequest._retry = true;
            return this.client(originalRequest);
          } catch (refreshError) {
            // Se falhar o refresh, limpa tokens e rejeita
            this.refreshPromise = null;
            this.logout();
            return Promise.reject(refreshError);
          }
        }

        // Tratamento padronizado de erros
        return this.handleApiError(error);
      },
    );
  }

  /**
   * Processa o refresh do token de autenticação
   */
  private async refreshAuthToken(): Promise<string> {
    try {
      const response = await this.client.post(API_ROUTES.AUTH.REFRESH_TOKEN, {
        refreshToken: this.refreshToken,
      });

      const { token, refreshToken } = response.data;

      // Atualiza tokens em memória e localStorage
      this.authToken = token;
      this.refreshToken = refreshToken || this.refreshToken;

      setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, token);
      if (refreshToken) {
        setLocalStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
      }

      return token;
    } catch (error) {
      // Se falhar o refresh, força logout
      this.logout();
      throw error;
    }
  }

  /**
   * Trata erros da API de forma padronizada
   */
  private handleApiError(error: AxiosError): Promise<never> {
    const status = error.response?.status;
    const data = error.response?.data as any;

    // Constrói um erro padronizado com informações úteis
    const apiError: Record<string, any> = {
      status,
      message: data?.message || data?.error || error.message || "Unknown error",
      errors: data?.errors || {},
      timestamp: new Date().toISOString(),
      originalError: error,
    };

    // Log centralizado de erros (em ambiente dev)
    if (process.env.NODE_ENV === "development") {
      console.error("[API Error]", apiError);
    }

    return Promise.reject(apiError);
  }

  /**
   * Limpa tokens e força logout
   */
  public logout(): void {
    this.authToken = null;
    this.refreshToken = null;
    removeLocalStorage(STORAGE_KEYS.AUTH_TOKEN);
    removeLocalStorage(STORAGE_KEYS.REFRESH_TOKEN);

    // Código para redirecionar para login pode ser adicionado aqui
    // ou, preferencialmente, via um evento que o store de autenticação escuta
  }

  /**
   * Atualiza tokens após login bem-sucedido
   */
  public setTokens(authToken: string, refreshToken?: string): void {
    this.authToken = authToken;
    setLocalStorage(STORAGE_KEYS.AUTH_TOKEN, authToken);

    if (refreshToken) {
      this.refreshToken = refreshToken;
      setLocalStorage(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
    }
  }

  // Métodos de conveniência para requisições HTTP
  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  public patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }
}

// Exporta uma única instância
export const apiClient = new ApiClient();

// Exporta a classe para casos em que múltiplas instâncias são necessárias (como testes)
export default ApiClient;
