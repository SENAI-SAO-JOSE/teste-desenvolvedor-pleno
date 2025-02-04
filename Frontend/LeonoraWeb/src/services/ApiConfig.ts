import axios, { AxiosInstance } from "axios";

// Base URL da API
const API_BASE_URL = "https://localhost:7055/api/";
const TOKEN_KEY = "user_token";

// Função para criar e configurar o AxiosInstance
export const createAxiosInstance = (): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Adiciona interceptador para incluir o token
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

// Função para obter o token de autenticação
const getToken = async (): Promise<string | null> => {
  // Tenta obter o token da sessão
  let token = sessionStorage.getItem(TOKEN_KEY);

  if (!token) {
    try {
      // TODO: depois de pronto o login usara os dados do usuario logado
      const response = await axios.post(`${API_BASE_URL}auth/login`, {
        username: "admin", // vira do login
        password: "123",
      });
      token = response.data.token;

      if (token) {
        // Armazena o token na sessão
        sessionStorage.setItem(TOKEN_KEY, token);
      }
    } catch (error) {
      console.error("Erro ao obter token:", error);
      return null;
    }
  }

  return token;
};

// Exporta uma instância configurada de Axios
export const axiosInstance = createAxiosInstance();
