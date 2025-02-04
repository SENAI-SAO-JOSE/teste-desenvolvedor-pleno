import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import UsuarioCreate from "../components/usuario/UsuarioCreate";
import UsuarioUpdate from "../components/usuario/UsuarioUpdate";
import UsuarioTable from "../components/usuario/UsuarioTable";
import ProdutoCreate from "../components/produto/ProdutoCreate";
import ProdutoUpdate from "../components/produto/ProdutoUpdate";
import ProdutoTable from "../components/produto/ProdutoTable";
import CategoriaCreate from "../components/categoria/CategoriaCreate";
import CategoriaUpdate from "../components/categoria/CategoriaUpdate";
import CategoriaTable from "../components/categoria/CategoriaTable";
import FornecedorCreate from "../components/fornecedor/FornecedorCreate";
import FornecedorUpdate from "../components/fornecedor/FornecedorUpdate";
import FornecedorTable from "../components/fornecedor/FornecedorTable";
import ProdutoFornecedorCreate from "../components/produtoFornecedor/ProdutoFornecedorCreate";
import ProdutoFornecedorTable from "../components/produtoFornecedor/ProdutoFornecedorTable";
import MainPage from "../pages/MainPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRoutes() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* Rotas para Usuário */}
        <Route path="/UsuarioTable" element={<UsuarioTable />} />
        <Route path="/usuarioCreate" element={<UsuarioCreate />} />
        <Route path="/usuarioUpdate/:hashId" element={<UsuarioUpdate />} />

        {/* Rotas para Produto */}
        <Route path="/ProdutoTable" element={<ProdutoTable />} />
        <Route path="/produtoCreate" element={<ProdutoCreate />} />
        <Route path="/produtoUpdate/:hashId" element={<ProdutoUpdate />} />

        {/* Rotas para Categoria */}
        <Route path="/CategoriaTable" element={<CategoriaTable />} />
        <Route path="/categoriaCreate" element={<CategoriaCreate />} />
        <Route path="/categoriaUpdate/:hashId" element={<CategoriaUpdate />} />

        {/* Rotas para Fornecedor */}
        <Route path="/FornecedorTable" element={<FornecedorTable />} />
        <Route path="/fornecedorCreate" element={<FornecedorCreate />} />
        <Route path="/fornecedorUpdate/:hashId" element={<FornecedorUpdate />} />

        {/* Rotas para ProdutoFornecedor */}
        <Route path="/ProdutoFornecedorTable" element={<ProdutoFornecedorTable />} />
        <Route path="/ProdutoFornecedorCreate" element={<ProdutoFornecedorCreate />} />

        {/* Rota de Página Não Encontrada */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default AppRoutes;
