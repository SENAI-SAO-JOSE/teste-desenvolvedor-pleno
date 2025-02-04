import React, { useState } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ICategoriaModel } from "../../services/models";
import { CategoriaService } from "../../services/CategoriaService";

export default function CategoriaCreate() {
  const categoriaService = CategoriaService();
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: ICategoriaModel = {
      hashId: "",
      codigo: codigo ?? 0,
      nome,
      descricao,
    };

    const isSuccessful = await categoriaService.addCategoria(data);
    if (isSuccessful) {
      navigate("/CategoriaTable");
    } else {
      console.error("Erro ao criar categoria!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Criar Categoria
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
        <Button fullWidth variant="contained" color="secondary" onClick={() => navigate("/CategoriaTable")}>
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
