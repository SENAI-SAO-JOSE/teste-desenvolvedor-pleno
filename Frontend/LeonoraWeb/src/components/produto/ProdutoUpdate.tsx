import React, { useState, useEffect, useMemo } from "react";
import { Container, TextField, Button, Typography, Grid, MenuItem } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { ProdutoService } from "../../services/ProdutoService";
import { CategoriaService } from "../../services/CategoriaService";
import { IProdutoModel, ICategoriaModel } from "../../services/models";

export default function ProdutoUpdate() {
  const produtoService = useMemo(() => ProdutoService(), []);
  const categoriaService = useMemo(() => CategoriaService(), []);
  const navigate = useNavigate();
  const { hashId } = useParams<{ hashId: string }>();

  const [codigo, setCodigo] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<number | null>(null);
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<ICategoriaModel[]>([]);
  const [isDeleted, setIsDeleted] = useState(false); // Novo campo para isDeleted

  useEffect(() => {
    const fetchData = async () => {
      if (!hashId) {
        console.error("HashId está indefinido!");
        return;
      }

      try {
        // Busca os dados do produto
        const produto = await produtoService.getProduto(hashId);

        // Busca as categorias disponíveis
        const categoriasData = await categoriaService.getCategorias();
        setCategorias(categoriasData);

        // Preenche os campos com os dados do produto
        setCodigo(produto?.codigo ?? null);
        setNome(produto?.nome ?? "");
        setDescricao(produto?.descricao ?? "");
        setPreco(produto?.preco ?? null);
        setCategoriaId(produto?.categoriaId ?? "");
        setIsDeleted(produto?.isDeleted ?? false); // Preenche o campo isDeleted
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };

    fetchData();
  }, [produtoService, categoriaService, hashId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: IProdutoModel = {
      hashId: hashId ?? "",
      codigo: codigo ?? 0,
      nome,
      descricao,
      preco: preco ?? 0,
      categoriaId,
      nomeCategoria: categorias.find((c) => c.hashId === categoriaId)?.nome || "",
      isDeleted, // Inclui o campo isDeleted no envio
    };

    try {
      const isSuccessful = await produtoService.updateProduto(data, hashId ?? "");
      if (isSuccessful) {
        navigate("/ProdutoTable");
      } else {
        console.error("Erro ao atualizar o produto!");
      }
    } catch (error) {
      console.error("Erro ao processar a atualização:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Atualizar Produto
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="nome"
              label="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="descricao"
              label="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="preco"
              label="Preço"
              type="number"
              value={preco !== null ? preco : ""}
              onChange={(e) => setPreco(e.target.value === "" ? null : Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              variant="outlined"
              required
              fullWidth
              id="categoria"
              label="Categoria"
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
            >
              {categorias.map((categoria) => (
                <MenuItem key={categoria.hashId} value={categoria.hashId}>
                  {categoria.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="codigo"
              label="Código"
              type="number"
              value={codigo !== null ? String(codigo) : ""}
              onChange={(e) => setCodigo(e.target.value === "" ? null : Number(e.target.value))}
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Atualizar
        </Button>
        <Button fullWidth variant="contained" color="secondary" onClick={() => navigate("/ProdutoTable")}>
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
