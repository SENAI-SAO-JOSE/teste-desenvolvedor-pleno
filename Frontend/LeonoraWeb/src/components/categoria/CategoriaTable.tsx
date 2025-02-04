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
import { ICategoriaModel } from "../../services/models";
import { CategoriaService } from "../../services/CategoriaService";

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

export default function CategoriaTable() {
  const classes = useStyles();
  const categoriaService = useMemo(() => CategoriaService(), []);
  const navigate = useNavigate();
  const [categorias, setCategorias] = useState<Array<ICategoriaModel>>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Buscando todas as categorias...");
      try {
        const response = await categoriaService.getCategorias();
        console.log("Categorias recebidas e armazenadas no estado:", response);
        setCategorias(response);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchData();
  }, [categoriaService]);

  const categoriaDelete = async (hashId: string) => {
    try {
      const isSuccessful = await categoriaService.deleteCategoria(hashId);
      if (isSuccessful) {
        console.log("Categoria excluída com sucesso!");
        setCategorias((prevCategorias) =>
          prevCategorias.filter((categoria) => categoria.hashId !== hashId)
        );
      } else {
        console.error("Falha ao excluir a categoria!");
      }
    } catch (error) {
      console.error("Erro ao excluir categoria:", error);
    }
  };

  const categoriaUpdate = (hashId: string) => {
    navigate("/categoriaUpdate/" + hashId);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Categorias
              </Typography>
            </Box>
            <Box>
              <Link to="/categoriaCreate">
                <Button variant="contained" color="primary">
                  CRIAR
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="Tabela de Categorias">
              <TableHead>
                <TableRow>
                  <TableCell align="left">HashId</TableCell>
                  <TableCell align="left">Código</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Descrição</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categorias.length > 0 ? (
                  categorias.map((categoria, index) => (
                    <TableRow key={categoria.hashId ?? `row-${index}`}>
                      <TableCell align="left">{categoria.hashId}</TableCell>
                      <TableCell align="left">{categoria.codigo}</TableCell>
                      <TableCell align="left">{categoria.nome}</TableCell>
                      <TableCell align="left">{categoria.descricao}</TableCell>
                      <TableCell align="right">
                        <ButtonGroup color="primary" aria-label="Botões de ação">
                          <Button onClick={() => categoriaUpdate(categoria.hashId ?? "")}>
                            Editar
                          </Button>
                          <Button onClick={() => categoriaDelete(categoria.hashId ?? "")}>
                            Excluir
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography>Nenhuma categoria disponível</Typography>
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
