import { createAxiosInstance } from "./ApiConfig";
import { IProdutoModel } from "./models";
import { AxiosRequestConfig, AxiosInstance } from "axios";

export function ProdutoService() {
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

  const getProdutos = async (): Promise<IProdutoModel[]> => {
    const config: AxiosRequestConfig = { method: "get", url: "produto/" };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      return [];
    }
  };

  const getProduto = async (hashId: string): Promise<IProdutoModel> => {
    const config: AxiosRequestConfig = { method: "get", url: `produto/${hashId}` };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      throw error;
    }
  };

  const addProduto = async (model: IProdutoModel): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "post", url: "produto/", data: model };
    try {
      await sendRequest(config);
      console.log("Produto criado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
      return false;
    }
  };

  const deleteProduto = async (hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "delete", url: `produto/${hashId}` };
    try {
      await sendRequest(config);
      console.log("Produto deletado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      return false;
    }
  };

  const updateProduto = async (model: IProdutoModel, hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "put", url: `produto/${hashId}`, data: model };
    try {
      await sendRequest(config);
      console.log("Produto atualizado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      return false;
    }
  };

  return { getProdutos, getProduto, addProduto, deleteProduto, updateProduto };
}
