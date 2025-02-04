import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { IUsuarioModel } from "../../services/models";
import { UsuarioService } from "../../services/UsuarioService";
import { Link, useNavigate } from "react-router-dom"; 
import { FormControlLabel, Switch } from "@mui/material";


const useStyles = makeStyles({
  paper: {
    marginTop: "64px", 
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", 
    marginTop: "24px", 
  },
  submit: {
    margin: "24px 0 16px", 
  },
});

export default function UsuariorCreate() {
  const classes = useStyles();
  const usuarioService = UsuarioService();
  const navigate = useNavigate(); 

  const [nome, setNome] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [codigo, setCodigo] = useState<number | null>(null);
  const [isAtivo, setIsAtivo] = useState<boolean>(true);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data: IUsuarioModel = {
      hashId: "", 
      codigo: codigo ?? 0,
      nome,
      login,
      senha,
      cpf,
      isAtivo
      
    };

    const isSuccesfull = await usuarioService.addUsuario(data);
    if (isSuccesfull) {
      navigate("/UsuarioTable"); 
    } else {
      console.log("Unexpected error!");
    }
  };

  return (
    <Container maxWidth="xs">
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Criar Usuário
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
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
                id="login"
                label="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
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
            <Grid item xs={12}>
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
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Criar
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button  color="secondary" fullWidth variant="contained" component={Link} to="/UsuarioTable">
                Cancelar
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
