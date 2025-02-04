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
import { IProdutoFornecedorModel } from "../../services/models";
import { ProdutoFornecedorService } from "../../services/ProdutoFornecedorService";

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

export default function ProdutoFornecedorTable() {
  const classes = useStyles();
  const produtoFornecedorService = useMemo(() => ProdutoFornecedorService(), []);
  const navigate = useNavigate();
  const [produtosFornecedores, setProdutosFornecedores] = useState<Array<IProdutoFornecedorModel>>([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Buscando todos os produtos e seus fornecedores...");
      try {
        const response = await produtoFornecedorService.getProdutoFornecedores();
        console.log("Dados recebidos e armazenados no estado:", response);
        setProdutosFornecedores(response);
      } catch (error) {
        console.error("Erro ao buscar produtos fornecedores:", error);
      }
    };

    fetchData();
  }, [produtoFornecedorService]);

  const produtoFornecedorDelete = async (hashId: string) => {
    try {
      const isSuccessful = await produtoFornecedorService.deleteProdutoFornecedor(hashId);
      if (isSuccessful) {
        console.log("ProdutoFornecedor excluído com sucesso!");
        setProdutosFornecedores((prev) => prev.filter((item) => item.hashId !== hashId));
      } else {
        console.error("Falha ao excluir ProdutoFornecedor!");
      }
    } catch (error) {
      console.error("Erro ao excluir ProdutoFornecedor:", error);
    }
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Produtos e seus Fornecedores
              </Typography>
            </Box>
            <Box>
              <Link to="/ProdutoFornecedorCreate">
                <Button variant="contained" color="primary">
                  CRIAR
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="Tabela de Produtos e Fornecedores">
              <TableHead>
                <TableRow>
                  <TableCell align="left">HashId</TableCell>
                  <TableCell align="left">Produto</TableCell>
                  <TableCell align="left">Fornecedor</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produtosFornecedores.length > 0 ? (
                  produtosFornecedores.map((item, index) => (
                    <TableRow key={item.hashId ?? `row-${index}`}>
                      <TableCell align="left">{item.hashId}</TableCell>
                      <TableCell align="left">{item.produtoNome}</TableCell>
                      <TableCell align="left">{item.fornecedorNome}</TableCell>
                      <TableCell align="right">
                        <ButtonGroup color="primary" aria-label="Botões de ação">
                          <Button onClick={() => produtoFornecedorDelete(item.hashId ?? "")}>
                            Excluir
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
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
