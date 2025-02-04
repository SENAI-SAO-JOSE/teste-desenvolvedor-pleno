import React, { useState, useEffect, useMemo } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useParams, useNavigate, Link } from "react-router-dom";
import { UsuarioService } from "../../services/UsuarioService";
import { IUsuarioModel } from "../../services/models";

export default function UsuarioUpdate() {

  const usuarioService = useMemo(() => UsuarioService(), []);
  const navigate = useNavigate();

  const [codigo, setCodigo] = useState<number | null>(null);
  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [isAtivo, setIsAtivo] = useState<boolean>(true);

  const { hashId } = useParams<{ hashId: string }>();

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching user with hashId:", hashId);
      try {
        if (!hashId) {
          console.error("HashId is undefined!");
          return;
        }

        const usuario = await usuarioService.getUsuario(hashId);
        console.log("User data received:", usuario);

        setCodigo(usuario?.codigo ?? null);
        setNome(usuario?.nome ?? "");
        setLogin(usuario?.login ?? "");
        setSenha(usuario?.senha ?? "");
        setCpf(usuario?.cpf ?? "");
        setIsAtivo(usuario?.isAtivo ?? true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [usuarioService, hashId]); 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: IUsuarioModel = {
      hashId: hashId ?? "",
      codigo: codigo ?? 0,
      nome,
      senha,
      login,
      cpf,
      isAtivo,
    };

    console.log("Updating user with data:", data);
    try {
      const isSuccesfull = await usuarioService.updateUsuario(data, hashId ?? "");
      if (isSuccesfull) {
        navigate("/UsuarioTable");
      } else {
        console.error("Failed to update user!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Typography component="h1" variant="h5" align="center" gutterBottom>
        Atualizar Usuário
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
          <Grid item xs={12} sm={6}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="login"
              label="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="senha"
              label="Senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="cpf"
              label="CPF"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={isAtivo}
                  onChange={(e) => setIsAtivo(e.target.checked)}
                  color="primary"
                />
              }
              label="Ativo"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Atualizar
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          component={Link}
          to="/UsuarioTable"
        >
          Cancelar
        </Button>
      </form>
    </Container>
  );
}
