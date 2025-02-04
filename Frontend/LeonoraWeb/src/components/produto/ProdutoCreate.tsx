import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Grid, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IProdutoModel, ICategoriaModel } from "../../services/models";
import { ProdutoService } from "../../services/ProdutoService";
import { CategoriaService } from "../../services/CategoriaService";

export default function ProdutoCreate() {
  const produtoService = ProdutoService();
  const categoriaService = CategoriaService();
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState<number | null>(null);
  const [categoriaId, setCategoriaId] = useState("");
  const [categorias, setCategorias] = useState<ICategoriaModel[]>([]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const categoriasData = await categoriaService.getCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    fetchCategorias();
  }, [categoriaService]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: IProdutoModel = {
      hashId: "",
      codigo: codigo ?? 0,
      nome,
      descricao,
      preco: preco ?? 0,
      categoriaId,
      nomeCategoria: categorias.find((c) => c.hashId === categoriaId)?.nome || "",
      isDeleted:false
    };

    const isSuccessful = await produtoService.addProduto(data);
    if (isSuccessful) {
      navigate("/ProdutoTable");
    } else {
      console.error("Erro ao criar produto!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Criar Produto
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
          Criar
        </Button>
        <Button fullWidth variant="contained" color="secondary" onClick={() => navigate("/ProdutoTable")}>
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
