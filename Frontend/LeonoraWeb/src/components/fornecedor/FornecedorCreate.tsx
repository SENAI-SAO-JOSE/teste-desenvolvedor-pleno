import React, { useState } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IFornecedorModel } from "../../services/models";
import { FornecedorService } from "../../services/FornecedorService";

export default function FornecedorCreate() {
  const fornecedorService = FornecedorService();
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: IFornecedorModel = {
      hashId: "",
      codigo: codigo ?? 0,
      nome,
      cnpj,
      telefone,
      endereco,
    };

    const isSuccessful = await fornecedorService.addFornecedor(data);
    if (isSuccessful) {
      navigate("/FornecedorTable");
    } else {
      console.error("Erro ao criar fornecedor!");
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Criar Fornecedor
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
              id="cnpj"
              label="CNPJ"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="telefone"
              label="Telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="endereco"
              label="Endereço"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
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
        <Button fullWidth variant="contained" color="secondary" onClick={() => navigate("/FornecedorTable")}>
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
