import { createAxiosInstance } from "./ApiConfig";
import { IUsuarioModel } from "./models";
import { AxiosRequestConfig, AxiosInstance } from "axios";

export function UsuarioService() {
  let axiosInstance: AxiosInstance | null = null;

  // Inicializa o AxiosInstance apenas uma vez
  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    if (!axiosInstance) {
      axiosInstance = await createAxiosInstance();
    }
    return axiosInstance;
  };

  // Função genérica para requisições
  const sendRequest = async (config: AxiosRequestConfig): Promise<any> => {
    try {
      const instance = await getAxiosInstance();
      const response = await instance.request(config);
      return response.data;
    } catch (error: any) {
      console.error("Erro na requisição:", error);
      throw error;
    }
  };

  // Operação: Buscar todos os usuários
  const getUsuarios = async (): Promise<IUsuarioModel[]> => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: "usuario/",
    };

    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
      return [];
    }
  };

  // Operação: Buscar um usuário específico
  const getUsuario = async (hashId: string): Promise<IUsuarioModel> => {
    const config: AxiosRequestConfig = {
      method: "get",
      url: `usuario/${hashId}`,
    };

    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error;
    }
  };

  // Operação: Adicionar usuário
  const addUsuario = async (model: IUsuarioModel): Promise<boolean> => {
    const config: AxiosRequestConfig = {
      method: "post",
      url: "usuario/",
      data: model,
    };

    try {
      await sendRequest(config);
      console.log("Usuário criado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
      return false;
    }
  };

  // Operação: Deletar usuário
  const deleteUsuario = async (hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = {
      method: "delete",
      url: `usuario/${hashId}`,
    };

    try {
      await sendRequest(config);
      console.log("Usuário deletado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      return false;
    }
  };

  // Operação: Atualizar usuário
  const updateUsuario = async (model: IUsuarioModel, hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = {
      method: "put",
      url: `usuario/${hashId}`,
      data: model,
    };

    try {
      await sendRequest(config);
      console.log("Usuário atualizado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return false;
    }
  };

  return {
    getUsuarios,
    getUsuario,
    addUsuario,
    deleteUsuario,
    updateUsuario,
  };
}
