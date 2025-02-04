import { AppBar, Button, Toolbar, Typography } from '@mui/material'; 
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
              flexGrow: 1, 
            }}
          >
            <Typography variant="h4"> {/* Tornando o texto de Leonora um pouco maior */}
              Leonora 
            </Typography>
          </Link>
          <div style={{ marginLeft: 'auto', marginTop: '30px' }}> {/* Ajustando os botões para ficarem um pouco mais abaixo */}
            <Button color="inherit" component={Link} to="/UsuarioTable" style={{ fontSize: '0.6rem' }}> {/* Mantendo os botões pequenos */}
              Usuários
            </Button>
            <Button color="inherit" component={Link} to="/ProdutoTable" style={{ fontSize: '0.6rem' }}>
              Produtos
            </Button>
            <Button color="inherit" component={Link} to="/CategoriaTable" style={{ fontSize: '0.6rem' }}>
              Categorias
            </Button>
            <Button color="inherit" component={Link} to="/FornecedorTable" style={{ fontSize: '0.6rem' }}>
              Fornecedores
            </Button>
            <Button color="inherit" component={Link} to="/ProdutoFornecedorTable" style={{ fontSize: '0.6rem' }}>
              Produto-Fornecedores
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
