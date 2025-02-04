import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import { IUsuarioModel } from "../../services/models";
import { UsuarioService } from "../../services/UsuarioService";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  container: {
    marginTop: "16px",
  },
  paper: {
    padding: "16px",
    color: "#6c757d",
  },
});

export default function UsuarioTable() {
  const classes = useStyles();

  // Memoize the service to ensure stability
  const usuarioService = useMemo(() => UsuarioService(), []);
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState<Array<IUsuarioModel>>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching all users...");
      try {
        const response = await usuarioService.getUsuarios();
        console.log("Dados recebidos e armazenados no estado:", response);
        setUsuarios(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, [usuarioService]); // Added usuarioService to dependencies

  const usuarioDelete = async (hashId: string) => {
    try {
      const isSuccesfull = await usuarioService.deleteUsuario(hashId);
      if (isSuccesfull) {
        console.log("Usuário excluído com sucesso!");
        setUsuarios((prevUsuarios) =>
          prevUsuarios.filter((usuario) => usuario.hashId !== hashId)
        );
      } else {
        console.error("Failed to delete user!");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const usuarioUpdate = (hashId: string) => {
    navigate("/usuarioUpdate/" + hashId);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Usuários
              </Typography>
            </Box>
            <Box>
              <Link to="/usuarioCreate">
                <Button variant="contained" color="primary">
                  CRIAR
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">HashId</TableCell>
                  <TableCell align="left">Código</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">CPF</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usuarios.length > 0 ? (
                  usuarios.map((usuario, index) => (
                    <TableRow key={usuario.hashId ?? `row-${index}`}>
                      <TableCell align="left">{usuario.hashId}</TableCell>
                      <TableCell align="left">{usuario.codigo}</TableCell>
                      <TableCell align="left">{usuario.nome}</TableCell>
                      <TableCell align="left">{usuario.cpf}</TableCell>
                      <TableCell align="right">
                        <ButtonGroup
                          color="primary"
                          aria-label="outlined primary button group"
                        >
                          <Button onClick={() => usuarioUpdate(usuario.hashId ?? "")}>
                            Editar
                          </Button>
                          <Button onClick={() => usuarioDelete(usuario.hashId ?? "")}>
                            Excluir
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography>Nenhum dado disponível</Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </div>
  );
}
