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
import { IFornecedorModel } from "../../services/models";
import { FornecedorService } from "../../services/FornecedorService";

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

export default function FornecedorTable() {
  const classes = useStyles();
  const fornecedorService = useMemo(() => FornecedorService(), []);
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState<Array<IFornecedorModel>>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Buscando todos os fornecedores...");
      try {
        const response = await fornecedorService.getFornecedores();
        console.log("Fornecedores recebidos e armazenados no estado:", response);
        setFornecedores(response);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };

    fetchData();
  }, [fornecedorService]);

  const fornecedorDelete = async (hashId: string) => {
    try {
      const isSuccessful = await fornecedorService.deleteFornecedor(hashId);
      if (isSuccessful) {
        console.log("Fornecedor excluído com sucesso!");
        setFornecedores((prevFornecedores) =>
          prevFornecedores.filter((fornecedor) => fornecedor.hashId !== hashId)
        );
      } else {
        console.error("Falha ao excluir o fornecedor!");
      }
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const fornecedorUpdate = (hashId: string) => {
    navigate("/fornecedorUpdate/" + hashId);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Fornecedores
              </Typography>
            </Box>
            <Box>
              <Link to="/fornecedorCreate">
                <Button variant="contained" color="primary">
                  CRIAR
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="Tabela de Fornecedores">
              <TableHead>
                <TableRow>
                  <TableCell align="left">HashId</TableCell>
                  <TableCell align="left">Código</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">CNPJ</TableCell>
                  <TableCell align="left">Telefone</TableCell>
                  <TableCell align="left">Endereço</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {fornecedores.length > 0 ? (
                  fornecedores.map((fornecedor, index) => (
                    <TableRow key={fornecedor.hashId ?? `row-${index}`}>
                      <TableCell align="left">{fornecedor.hashId}</TableCell>
                      <TableCell align="left">{fornecedor.codigo}</TableCell>
                      <TableCell align="left">{fornecedor.nome}</TableCell>
                      <TableCell align="left">{fornecedor.cnpj}</TableCell>
                      <TableCell align="left">{fornecedor.telefone}</TableCell>
                      <TableCell align="left">{fornecedor.endereco}</TableCell>
                      <TableCell align="right">
                        <ButtonGroup color="primary" aria-label="Botões de ação">
                          <Button onClick={() => fornecedorUpdate(fornecedor.hashId ?? "")}>
                            Editar
                          </Button>
                          <Button onClick={() => fornecedorDelete(fornecedor.hashId ?? "")}>
                            Excluir
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      <Typography>Nenhum fornecedor disponível</Typography>
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
