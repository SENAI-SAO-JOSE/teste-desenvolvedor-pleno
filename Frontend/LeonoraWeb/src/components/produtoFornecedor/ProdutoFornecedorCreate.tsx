import React, { useState, useEffect } from "react";
import { Container, TextField, Button, Typography, Grid, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IProdutoFornecedorModel, IProdutoModel, IFornecedorModel } from "../../services/models";
import { ProdutoFornecedorService } from "../../services/ProdutoFornecedorService";
import { ProdutoService } from "../../services/ProdutoService";
import { FornecedorService } from "../../services/FornecedorService";

export default function ProdutoFornecedorCreate() {
  const produtoFornecedorService = ProdutoFornecedorService();
  const produtoService = ProdutoService();
  const fornecedorService = FornecedorService();
  const navigate = useNavigate();

  const [produtoHashId, setProdutoHashId] = useState("");
  const [fornecedorHashId, setFornecedorHashId] = useState("");
  const [produtos, setProdutos] = useState<IProdutoModel[]>([]);
  const [fornecedores, setFornecedores] = useState<IFornecedorModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosData = await produtoService.getProdutos();
        const fornecedoresData = await fornecedorService.getFornecedores();
        setProdutos(produtosData);
        setFornecedores(fornecedoresData);
      } catch (error) {
        console.error("Erro ao buscar produtos ou fornecedores:", error);
      }
    };

    fetchData();
  }, [produtoService, fornecedorService]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: IProdutoFornecedorModel = {
      produtoHashId,
      fornecedorHashId,
      produtoNome: produtos.find((p) => p.hashId === produtoHashId)?.nome || "",
      fornecedorNome: fornecedores.find((f) => f.hashId === fornecedorHashId)?.nome || "",
    };

    const isSuccessful = await produtoFornecedorService.addProdutoFornecedor(data);
    if (isSuccessful) {
      navigate("/ProdutoFornecedorTable");
    } else {
      console.error("Erro ao associar produto e fornecedor!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Associar Produto a Fornecedor
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              variant="outlined"
              required
              fullWidth
              id="produto"
              label="Produto"
              value={produtoHashId}
              onChange={(e) => setProdutoHashId(e.target.value)}
            >
              {produtos.map((produto) => (
                <MenuItem key={produto.hashId} value={produto.hashId}>
                  {produto.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              variant="outlined"
              required
              fullWidth
              id="fornecedor"
              label="Fornecedor"
              value={fornecedorHashId}
              onChange={(e) => setFornecedorHashId(e.target.value)}
            >
              {fornecedores.map((fornecedor) => (
                <MenuItem key={fornecedor.hashId} value={fornecedor.hashId}>
                  {fornecedor.nome}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
          Associar
        </Button>
        <Button fullWidth variant="contained" color="secondary" onClick={() => navigate("/ProdutoFornecedorTable")}>
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
