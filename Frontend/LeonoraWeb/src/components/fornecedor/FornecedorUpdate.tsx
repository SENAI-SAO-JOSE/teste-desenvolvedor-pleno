import React, { useState, useEffect, useMemo } from "react";
import { Container, TextField, Button, Typography, Grid } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { FornecedorService } from "../../services/FornecedorService";
import { IFornecedorModel } from "../../services/models";

export default function FornecedorUpdate() {
  const fornecedorService = useMemo(() => FornecedorService(), []);
  const navigate = useNavigate();
  const { hashId } = useParams<{ hashId: string }>();

  const [codigo, setCodigo] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!hashId) {
        console.error("HashId está indefinido!");
        return;
      }

      try {
        const fornecedor = await fornecedorService.getFornecedor(hashId);
        setCodigo(fornecedor?.codigo ?? null);
        setNome(fornecedor?.nome ?? "");
        setCnpj(fornecedor?.cnpj ?? "");
        setTelefone(fornecedor?.telefone ?? "");
        setEndereco(fornecedor?.endereco ?? "");
      } catch (error) {
        console.error("Erro ao buscar fornecedor:", error);
      }
    };

    fetchData();
  }, [fornecedorService, hashId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: IFornecedorModel = {
      hashId: hashId ?? "",
      codigo: codigo ?? 0,
      nome,
      cnpj,
      telefone,
      endereco,
    };

    try {
      const isSuccessful = await fornecedorService.updateFornecedor(data, hashId ?? "");
      if (isSuccessful) {
        navigate("/FornecedorTable");
      } else {
        console.error("Erro ao atualizar o fornecedor!");
      }
    } catch (error) {
      console.error("Erro ao processar a atualização:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Atualizar Fornecedor
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
          Atualizar
        </Button>
        <Button fullWidth variant="contained" color="secondary" onClick={() => navigate("/FornecedorTable")}>
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
