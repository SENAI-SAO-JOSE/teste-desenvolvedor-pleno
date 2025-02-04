import { createAxiosInstance } from "./ApiConfig";
import { IProdutoFornecedorModel } from "./models";
import { AxiosRequestConfig, AxiosInstance } from "axios";

export function ProdutoFornecedorService() {
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

  const getProdutoFornecedores = async (): Promise<IProdutoFornecedorModel[]> => {
    const config: AxiosRequestConfig = { method: "get", url: "produtoFornecedor/" };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar produtos fornecedores:", error);
      return [];
    }
  };

  const getProdutoFornecedor = async (hashId: string): Promise<IProdutoFornecedorModel> => {
    const config: AxiosRequestConfig = { method: "get", url: `produtoFornecedor/${hashId}` };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar produto fornecedor:", error);
      throw error;
    }
  };

  const getFornecedoresPorProduto = async (produtoHashId: string): Promise<IProdutoFornecedorModel[]> => {
    const config: AxiosRequestConfig = { method: "get", url: `produtoFornecedor/porProduto/${produtoHashId}` };
    try {
      return await sendRequest(config);
    } catch (error) {
      console.error("Erro ao buscar fornecedores do produto:", error);
      return [];
    }
  };

  const addProdutoFornecedor = async (model: IProdutoFornecedorModel): Promise<IProdutoFornecedorModel> => {
    const config: AxiosRequestConfig = { method: "post", url: "produtoFornecedor/", data: model };
    try {
      const response = await sendRequest(config);
      return response as IProdutoFornecedorModel;
    } catch (error) {
      console.error("Erro ao adicionar ProdutoFornecedor:", error);
      throw error;
    }
  };

  const deleteProdutoFornecedor = async (hashId: string): Promise<boolean> => {
    const config: AxiosRequestConfig = { method: "delete", url: `produtoFornecedor/${hashId}` };
    try {
      await sendRequest(config);
      console.log("ProdutoFornecedor deletado com sucesso!");
      return true;
    } catch (error) {
      console.error("Erro ao deletar ProdutoFornecedor:", error);
      return false;
    }
  };

  return {
    getProdutoFornecedores,
    getProdutoFornecedor,
    getFornecedoresPorProduto,
    addProdutoFornecedor,
    deleteProdutoFornecedor,
  };
}
