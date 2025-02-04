-- Verificar se o banco já existe antes de criar
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'GestaoProdutos')
BEGIN
    CREATE DATABASE GestaoProdutos;
END
GO

-- Usar o banco de dados
USE GestaoProdutos;
GO

-- Criar tabela de Usuarios se não existir
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Usuarios')
BEGIN
    CREATE TABLE Usuarios (
        HashId uniqueidentifier  PRIMARY KEY DEFAULT NEWID(),
        Codigo INT NOT NULL,
        Nome VARCHAR(255) NOT NULL,
        Login VARCHAR(36) NOT NULL,
        Senha VARCHAR(36) NOT NULL, -- Senha será armazenada com hash
        Cpf VARCHAR(14) NOT NULL UNIQUE,
        DataUltimoToken DATETIME NULL,
        IsAtivo BIT NOT NULL,
        CriadoPor uniqueidentifier  NULL,
        CriadoEm DATETIME NOT NULL,
        AlteradoPor uniqueidentifier  NULL,
        AlteradoEm DATETIME NULL,
        FOREIGN KEY (CriadoPor) REFERENCES Usuarios(HashId),
        FOREIGN KEY (AlteradoPor) REFERENCES Usuarios(HashId)
    );

    -- Inserir um usuário inicial para testes
    INSERT INTO Usuarios (Codigo, Nome, Login, Senha, Cpf, CriadoEm, IsAtivo)
    VALUES (1, 'Admin', 'admin', '12345', '000.000.000-00', GETDATE(),1); -- A senha aqui será alterada para um hash posteriormente
END
GO

-- Criar tabela de Categorias com colunas adicionais
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Categorias')
BEGIN
    CREATE TABLE Categorias (
        HashId uniqueidentifier  PRIMARY KEY DEFAULT NEWID(),
        Codigo INT NOT NULL,
        Nome VARCHAR(255) NOT NULL,
        Descricao VARCHAR(255) NOT NULL,
        CriadoPor uniqueidentifier  NOT NULL,
        CriadoEm DATETIME NOT NULL,
        AlteradoPor uniqueidentifier  NULL,
        AlteradoEm DATETIME NULL,
        FOREIGN KEY (CriadoPor) REFERENCES Usuarios(HashId),
        FOREIGN KEY (AlteradoPor) REFERENCES Usuarios(HashId)
    );

    -- Inserir categorias pré-definidas
    INSERT INTO Categorias (Codigo, Nome, Descricao, CriadoPor, CriadoEm)
    VALUES 
        (101, 'Eletrônicos', 'Produtos eletrônicos e acessórios', (SELECT HashId FROM Usuarios WHERE Login = 'admin'), GETDATE()),
        (102, 'Móveis', 'Móveis para casa e escritório', (SELECT HashId FROM Usuarios WHERE Login = 'admin'), GETDATE()),
        (103, 'Alimentos', 'Produtos alimentícios e bebidas', (SELECT HashId FROM Usuarios WHERE Login = 'admin'), GETDATE());
END
GO

-- Criar tabela de Fornecedores com colunas adicionais
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Fornecedores')
BEGIN
    CREATE TABLE Fornecedores (
        HashId uniqueidentifier  PRIMARY KEY DEFAULT NEWID(),
        Codigo INT NOT NULL,
        Nome VARCHAR(255) NOT NULL,
        Cnpj VARCHAR(18) NOT NULL,
        Telefone VARCHAR(36) NOT NULL,
        Endereco VARCHAR(255) NOT NULL,
        CriadoPor uniqueidentifier  NOT NULL,
        CriadoEm DATETIME NOT NULL,
        AlteradoPor uniqueidentifier  NULL,
        AlteradoEm DATETIME NULL,
        FOREIGN KEY (CriadoPor) REFERENCES Usuarios(HashId),
        FOREIGN KEY (AlteradoPor) REFERENCES Usuarios(HashId)
    );

    -- Inserir fornecedores fictícios
    INSERT INTO Fornecedores (Codigo, Nome, Cnpj, Telefone, Endereco, CriadoPor, CriadoEm)
    VALUES 
        (201, 'TechSupply', '12.345.678/0001-99', '(11) 99999-9999', 'Rua das Techs, 100 - São Paulo, SP', (SELECT HashId FROM Usuarios WHERE Login = 'admin'), GETDATE()),
        (202, 'MoveisExcelentes', '98.765.432/0001-55', '(21) 88888-8888', 'Avenida dos Móveis, 500 - Rio de Janeiro, RJ', (SELECT HashId FROM Usuarios WHERE Login = 'admin'), GETDATE()),
        (203, 'FoodMaster', '11.223.344/0001-77', '(31) 77777-7777', 'Rua da Comida, 20 - Belo Horizonte, MG', (SELECT HashId FROM Usuarios WHERE Login = 'admin'), GETDATE());
END
GO

-- Criar tabela de Produtos com colunas adicionais
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Produtos')
BEGIN
    CREATE TABLE Produtos (
        HashId uniqueidentifier PRIMARY KEY DEFAULT NEWID(),
        Codigo INT NOT NULL,
        Nome VARCHAR(255) NOT NULL,
        Descricao VARCHAR(255) NOT NULL,
        Preco DECIMAL(10,2) NOT NULL,
        CategoriaId uniqueidentifier NOT NULL,
        IsDeleted BIT NOT NULL,
        CriadoPor uniqueidentifier  NOT NULL,
        CriadoEm DATETIME NOT NULL,
        AlteradoPor uniqueidentifier  NULL,
        AlteradoEm DATETIME NULL,
        FOREIGN KEY (CategoriaId) REFERENCES Categorias(HashId),
        FOREIGN KEY (CriadoPor) REFERENCES Usuarios(HashId),
        FOREIGN KEY (AlteradoPor) REFERENCES Usuarios(HashId)
    );
END
GO

-- Criar tabela de relacionamento Produto_Fornecedor com colunas adicionais
IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Produto_Fornecedor')
BEGIN
    CREATE TABLE Produto_Fornecedor (
        HashId uniqueidentifier PRIMARY KEY DEFAULT NEWID(), -- Chave primária única para cada relação
        ProdutoId uniqueidentifier NOT NULL,
        FornecedorId uniqueidentifier NOT NULL,
        CriadoPor uniqueidentifier  NOT NULL,
        CriadoEm DATETIME NOT NULL,
        AlteradoPor uniqueidentifier NULL,
        AlteradoEm DATETIME NULL,
        FOREIGN KEY (ProdutoId) REFERENCES Produtos(HashId),
        FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(HashId),
        FOREIGN KEY (CriadoPor) REFERENCES Usuarios(HashId),
        FOREIGN KEY (AlteradoPor) REFERENCES Usuarios(HashId)
    );
END
GO

GO



