import { createAxiosInstance } from "./ApiConfig";
import { ICategoriaModel } from "./models";
import { AxiosRequestConfig, AxiosInstance } from "axios";

export function CategoriaService() {
  let axiosInstance: AxiosInstance | null = null;

  const getAxiosInstance = async (): Promise<AxiosInstance> => {
    if (!axiosInstance) {
      axiosInstance = await createAxiosInstance();
    }
    return axiosInstance;
  };

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

  const getCategorias = async (): Promise<ICategoriaModel[]> => {
    const config: AxiosRequestConfig = { method: "get", url: "categoria/" };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      return [];
    }
  };

  const getCategoria = async (hashId: string): Promise<ICategoriaModel> => {
    const config: AxiosRequestConfig = { method: "get", url: `categoria/${hashId}` };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar categoria:", error);
      throw error;
    }
  };

  const addCategoria = async (model: ICategoriaModel): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "post", url: "categoria/", data: model };
    try {
      await sendRequest(config);
      console.log("Categoria criada com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao adicionar categoria:", error);
      return false;
    }
  };

  const deleteCategoria = async (hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "delete", url: `categoria/${hashId}` };
    try {
      await sendRequest(config);
      console.log("Categoria deletada com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      return false;
    }
  };

  const updateCategoria = async (model: ICategoriaModel, hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "put", url: `categoria/${hashId}`, data: model };
    try {
      await sendRequest(config);
      console.log("Categoria atualizada com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      return false;
    }
  };

  return { getCategorias, getCategoria, addCategoria, deleteCategoria, updateCategoria };
}
