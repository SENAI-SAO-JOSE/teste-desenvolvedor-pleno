import React, { useState, useEffect, useMemo } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { CategoriaService } from "../../services/CategoriaService";
import { ICategoriaModel } from "../../services/models";

export default function CategoriaUpdate() {
  const categoriaService = useMemo(() => CategoriaService(), []);
  const navigate = useNavigate();
  const { hashId } = useParams<{ hashId: string }>();

  const [codigo, setCodigo] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!hashId) {
        console.error("HashId está indefinido!");
        return;
      }

      try {
        const categoria = await categoriaService.getCategoria(hashId);
        setCodigo(categoria?.codigo ?? null);
        setNome(categoria?.nome ?? "");
        setDescricao(categoria?.descricao ?? "");
      } catch (error) {
        console.error("Erro ao buscar categoria:", error);
      }
    };

    fetchData();
  }, [categoriaService, hashId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: ICategoriaModel = {
      hashId: hashId ?? "",
      codigo: codigo ?? 0,
      nome,
      descricao,
    };

    try {
      const isSuccessful = await categoriaService.updateCategoria(data, hashId ?? "");
      if (isSuccessful) {
        navigate("/CategoriaTable");
      } else {
        console.error("Erro ao atualizar a categoria!");
      }
    } catch (error) {
      console.error("Erro ao processar a atualização:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Atualizar Categoria
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
          Atualizar
        </Button>
        <Button fullWidth variant="contained" color="secondary" onClick={() => navigate("/CategoriaTable")}>
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
