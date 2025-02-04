import { createAxiosInstance } from "./ApiConfig";
import { IFornecedorModel } from "./models";
import { AxiosRequestConfig, AxiosInstance } from "axios";

export function FornecedorService() {
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

  const getFornecedores = async (): Promise<IFornecedorModel[]> => {
    const config: AxiosRequestConfig = { method: "get", url: "fornecedor/" };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
      return [];
    }
  };

  const getFornecedor = async (hashId: string): Promise<IFornecedorModel> => {
    const config: AxiosRequestConfig = { method: "get", url: `fornecedor/${hashId}` };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar fornecedor:", error);
      throw error;
    }
  };

  const addFornecedor = async (model: IFornecedorModel): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "post", url: "fornecedor/", data: model };
    try {
      await sendRequest(config);
      console.log("Fornecedor criado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao adicionar fornecedor:", error);
      return false;
    }
  };

  const deleteFornecedor = async (hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "delete", url: `fornecedor/${hashId}` };
    try {
      await sendRequest(config);
      console.log("Fornecedor deletado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
      return false;
    }
  };

  const updateFornecedor = async (model: IFornecedorModel, hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "put", url: `fornecedor/${hashId}`, data: model };
    try {
      await sendRequest(config);
      console.log("Fornecedor atualizado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      return false;
    }
  };

  return { getFornecedores, getFornecedor, addFornecedor, deleteFornecedor, updateFornecedor };
}
