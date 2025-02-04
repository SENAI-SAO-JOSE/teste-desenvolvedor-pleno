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
import { ProdutoService } from "../../services/ProdutoService";
import { FornecedorService } from "../../services/FornecedorService";
import { ProdutoFornecedorService } from "../../services/ProdutoFornecedorService";
import { IProdutoModel, IFornecedorModel, IProdutoFornecedorModel } from "../../services/models";
import { FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";

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
  fornecedoresColumn: {
    minWidth: "180px", // 🔹 Define um mínimo para não encolher demais
    maxWidth: "250px", // 🔹 Define um máximo para não estourar
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default function ProdutoTable() {
  const classes = useStyles();
  const produtoService = useMemo(() => ProdutoService(), []);
  const fornecedorService = useMemo(() => FornecedorService(), []);
  const produtoFornecedorService = useMemo(() => ProdutoFornecedorService(), []);

  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<IProdutoModel[]>([]);
  const [fornecedores, setFornecedores] = useState<IFornecedorModel[]>([]);
  const [fornecedoresVinculados, setFornecedoresVinculados] = useState<Record<string, IProdutoFornecedorModel[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const produtosData = await produtoService.getProdutos();
        setProdutos(produtosData);

        const fornecedoresData = await fornecedorService.getFornecedores();
        setFornecedores(fornecedoresData);

        const vinculosData = await produtoFornecedorService.getProdutoFornecedores();
        const vinculosMap = vinculosData.reduce((acc, vinculo) => {
          acc[vinculo.produtoHashId] = acc[vinculo.produtoHashId] || [];
          acc[vinculo.produtoHashId].push(vinculo);
          return acc;
        }, {} as Record<string, IProdutoFornecedorModel[]>);
        setFornecedoresVinculados(vinculosMap);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [produtoService, fornecedorService, produtoFornecedorService]);

  const handleToggleFornecedor = async (
    produtoHashId: string,
    fornecedor: IFornecedorModel,
    isChecked: boolean
  ) => {
    try {
      if (!fornecedor.hashId) {
        console.error("Fornecedor hashId está indefinido.");
        return;
      }

      if (isChecked) {
        await produtoFornecedorService.addProdutoFornecedor({
          produtoHashId,
          fornecedorHashId: fornecedor.hashId,
          produtoNome: "",
          fornecedorNome: "",
        });

        const fornecedoresAtualizados = await produtoFornecedorService.getFornecedoresPorProduto(produtoHashId);

        setFornecedoresVinculados((prevState) => ({
          ...prevState,
          [produtoHashId]: fornecedoresAtualizados,
        }));
      } else {
        const vinculo = fornecedoresVinculados[produtoHashId]?.find(
          (v) => v.fornecedorHashId === fornecedor.hashId
        );

        if (vinculo) {
          await produtoFornecedorService.deleteProdutoFornecedor(vinculo.hashId!);

          const fornecedoresAtualizados = await produtoFornecedorService.getFornecedoresPorProduto(produtoHashId);

          setFornecedoresVinculados((prevState) => ({
            ...prevState,
            [produtoHashId]: fornecedoresAtualizados,
          }));
        }
      }
    } catch (error) {
      console.error("Erro ao atualizar vínculo do fornecedor:", error);
    }
  };

  const produtoDelete = async (hashId: string) => {
    try {
      const isSuccessful = await produtoService.deleteProduto(hashId);
      if (isSuccessful) {
        console.log("Produto excluído com sucesso!");
        setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.hashId !== hashId));
      } else {
        console.error("Falha ao excluir o produto!");
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
    }
  };

  const produtoUpdate = (hashId: string) => {
    navigate("/produtoUpdate/" + hashId);
  };

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Produtos
              </Typography>
            </Box>
            <Box>
              <Link to="/produtoCreate">
                <Button variant="contained" color="primary">
                  CRIAR
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table aria-label="Tabela de Produtos">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Código</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Preço</TableCell>
                  <TableCell align="left">Categoria</TableCell>
                  <TableCell align="left" className={classes.fornecedoresColumn}>
                    Fornecedores
                  </TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {produtos.length > 0 ? (
                  produtos.map((produto, index) => (
                    <TableRow key={produto.hashId ?? `row-${index}`}>
                      <TableCell align="left">{produto.codigo}</TableCell>
                      <TableCell align="left">{produto.nome}</TableCell>
                      <TableCell align="left">{produto.preco}</TableCell>
                      <TableCell align="left">{produto.nomeCategoria}</TableCell>
                      <TableCell align="left" className={classes.fornecedoresColumn}>
                        <FormControl fullWidth>
                          <InputLabel>Fornecedores</InputLabel>
                          <Select
                            multiple
                            value={fornecedoresVinculados[produto.hashId ?? ""]?.map((v) => v.fornecedorHashId) || []}
                            renderValue={(selected) =>
                              fornecedores
                                .filter((f) => selected.includes(f.hashId || ""))
                                .map((f) => f.nome)
                                .join(", ")
                            }
                          >
                            {fornecedores.map((fornecedor) => (
                              <MenuItem key={fornecedor.hashId} value={fornecedor.hashId}>
                                <Checkbox
                                  checked={
                                    fornecedoresVinculados[produto.hashId ?? ""]?.some(
                                      (v) => v.fornecedorHashId === fornecedor.hashId
                                    ) || false
                                  }
                                  onChange={(e) =>
                                    handleToggleFornecedor(produto.hashId ?? "", fornecedor, e.target.checked)
                                  }
                                />
                                <ListItemText primary={fornecedor.nome} />
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell align="right">
                        <ButtonGroup color="primary" aria-label="Botões de ação">
                          <Button onClick={() => produtoUpdate(produto.hashId ?? "")}>Editar</Button>
                          <Button onClick={() => produtoDelete(produto.hashId ?? "")}>Excluir</Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography>Nenhum produto disponível</Typography>
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
