
export interface IUsuarioModel {
    hashId?: string;
    codigo: number;
    nome: string;
    login: string;
    senha: string;
    cpf: string;
    isAtivo: boolean; 
}

export interface IProdutoModel {
    hashId?: string;
    codigo: number;
    nome: string;
    descricao: string;
    preco: number;
    categoriaId: string;
    nomeCategoria: string;
    isDeleted: boolean;
  }
  

  export interface ICategoriaModel {
    hashId?: string;
    codigo: number;
    nome: string;
    descricao: string;

  }


  export interface IFornecedorModel {
    hashId?: string;
    codigo: number;
    nome: string;
    cnpj: string;
    telefone: string;
    endereco: string;
  }

  export interface IProdutoFornecedorModel {
    hashId?: string;
    produtoHashId: string;
    produtoNome: string;
    fornecedorHashId: string;
    fornecedorNome: string;
  }
  
  

