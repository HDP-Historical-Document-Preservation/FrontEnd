-- HDP (Historical Document Preservation)
-- Grupo 1

-- Integrantes do Grupo
-- Bruna Santana Reginato RA: 04241007
-- Beatriz Guimarães Pinto Fernades RA:04241048 
-- Gabriel Cerejo Bellintani RA:04241045 
-- Felipe Ribeiro Patroni RA:04241051 
-- Vinícius Miralha Augusto Gomes RA:04241021 
-- Kamilly Rebeca Poggi Silva RA:04241028 

-- ----------------------------------------------------------------------------------------------------------------------------

CREATE DATABASE hdp;
USE hdp;

-- Tabela Empresa ---------------------------------------------------------------------------------------------------------

CREATE TABLE empresa(
idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14) NOT NULL UNIQUE,
nome VARCHAR(70) NOT NULL,
responsavel VARCHAR(50) NOT NULL,
cep CHAR(8) NOT NULL,
numero VARCHAR(4) NOT NULL
);

INSERT INTO empresa VALUES
(DEFAULT,'63925980050204', 'Museu Ipiranga', 'Eduardo', '04809237', '100'),
(DEFAULT,'10132226000238','Museu da Língua Portuguesa','Fátima','00180050','1130'),
(DEFAULT,'13668656002917','Museu Nacional','Leandro','27919840','269');

SELECT * FROM empresa;

-- Tabela Funcionario ---------------------------------------------------------------------------------------------------------

CREATE TABLE funcionario (
idFuncionario INT AUTO_INCREMENT,
fkEmpresa INT,
CONSTRAINT pkFuncionarioEmpresa PRIMARY KEY (idFuncionario, fkEmpresa),
nome VARCHAR(80) NOT NULL,
cpf CHAR(11) NOT NULL UNIQUE,
telefone CHAR(11) NOT NULL UNIQUE,
email VARCHAR(60) NOT NULL UNIQUE,
senha VARCHAR(15) NOT NULL UNIQUE,
CONSTRAINT fkFuncionarioEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa)
);

INSERT INTO funcionario VALUES
(DEFAULT, 1, 'Eduardo da Silva Lima', '41381092268', '11935685087', 'edu.Silva@gmail.com', '042$16756'),
(DEFAULT, 1, 'Fabíola Santos Monteiro', '14835098714', '11948286002', 'fabiola2456@hotmail.com', '04241829&'),
(DEFAULT, 2, 'Carlos Roberto Figueiredo', '03220101254', '11972785070', 'carlosfigueiredo@yahoo.com', '0424@9094'),
(DEFAULT, 2, 'Alexandre Alves Reis', '24833018154', '11928282202', 'alexandre@hotmail.com', '022#18292'),
(DEFAULT, 3, 'Danilo Lopez Faria', '00260104251', '11942445040', 'danilo@yahoo.com', '0323&9394'),
(DEFAULT, 3, 'Ana Bela Costa', '19311694234', '11963732481', 'ana.bela@outlook.com', '04241&678');

SELECT * FROM funcionario;
SELECT nome AS 'Nome do Funcionário', senha AS 'Senha do Funcionário' FROM funcionario;

-- Tabela Métrica ---------------------------------------------------------------------------------------------------------

CREATE TABLE metrica(
idMetrica INT PRIMARY KEY AUTO_INCREMENT,
temperaturaMax FLOAT NOT NULL,
temperaturaMin FLOAT NOT NULL,
umidadeMax FLOAT NOT NULL,
umidadeMin FLOAT NOT NULL
);

INSERT INTO metrica VALUES
(DEFAULT,25,15,65,55);

SELECT * FROM metrica;

-- Tabela Sala ----------------------------------------------------------------------------------------------------------------------

CREATE TABLE sala (
idSala INT AUTO_INCREMENT,
fkEmpresa INT,
fkMetrica INT,
CONSTRAINT pkSalaEmpresaMetrica PRIMARY KEY (idSala, fkEmpresa, fkMetrica),
nome VARCHAR(80) NOT NULL,
descricao VARCHAR(200) NOT NULL,
CONSTRAINT fkSalaEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
CONSTRAINT fkSalaMetrica FOREIGN KEY (fkMetrica) REFERENCES metrica(idMetrica)
);

INSERT INTO sala VALUES 
(DEFAULT, 1,1, 'Leis Brasileiras', 'Sala onde se armazena documentos de leis brasileiras'),
(DEFAULT, 1,1, 'Poemas Brasileiros','Sala onde se armazena importantes poemas brasileiros'),
(DEFAULT, 2,1, 'Estados Unidos', 'Sala onde se armazena documentos de acontecimentos, pessoas ou histórias ficticías dos Estados Unidos'),
(DEFAULT, 2,1, 'Poemas internacionais','Sala onde se armazena importantes poemas internacionais'),
(DEFAULT, 3,1, 'Acontecimentos Brasileiros','Sala onde se armazena documentos narrando importantes acontecimentos do Brasil'),
(DEFAULT, 3,1, 'Inglaterra','Sala onde se armazena documentos de acontecimentos, pessoas ou histórias ficticías da Inglaterra');

SELECT * FROM sala;

-- Tabela Livro ---------------------------------------------------------------------------------------------------------

CREATE TABLE livro (
idLivro INT AUTO_INCREMENT,
fkSala INT,
CONSTRAINT pkLivroSala PRIMARY KEY (idLivro, fkSala),
nome VARCHAR(70) NOT NULL,
categoria VARCHAR(70) NOT NULL,
dataPublicacao DATE,
integridade VARCHAR(5) NOT NULL,
CONSTRAINT fkLivroSala FOREIGN KEY (fkSala) REFERENCES sala(idSala)
);

INSERT INTO livro VALUES 
(DEFAULT, 1, 'Carta de Pero Vaz de Caminha', 'Manuscrito','1500-05-01', 'Boa'),
(DEFAULT, 2, 'Os Lusíadas','Poesia','1572-03-12','Média'),
(DEFAULT, 3, 'Constituição Imperial Brasileira ','Legislação','1824-03-25','Ruim'),
(DEFAULT, 4, 'Lei Áurea','Legislação','1888-05-13','Boa'),
(DEFAULT, 5, 'Livro de Kells', 'Manuscrito','1615-10-13', 'Média'),
(DEFAULT, 6, 'Magna Carta','Manuscrito','1450-07-01','Ruim'),
(DEFAULT, 1, 'Diário de Anne Frank ','Manuscrito','1770-02-14','Boa'),
(DEFAULT, 2, 'Poemas de Safo','Poesia','1102-09-21','Média'),
(DEFAULT, 3, 'Manuscritos da Guerra de Canudos', 'Manuscrito','1289-03-19', 'Ruim'),
(DEFAULT, 4, 'Manifesto da Comuna de Canudos','Manuscrito','1347-11-24','Boa'),
(DEFAULT, 5, 'A Moreninha ','Manuscrito','1899-03-30','Média'),
(DEFAULT, 6, 'Os Sertões ','Manuscrito','1205-03-09','Ruim'),
(DEFAULT, 1, 'Diário de Anchieta', 'Manuscrito','1752-05-20', 'Boa'),
(DEFAULT, 2, 'Proclamação da República','Legislação','1481-12-12','Média'),
(DEFAULT, 3, 'Diário de Hans Staden','Manuscrito','1799-02-25','Ruim'),
(DEFAULT, 4, 'Auto da Pregação do Frade Bartolomeu de Gusmão','Poesia','1544-10-23','Boa'),
(DEFAULT, 5, 'Inuíto','Poesia','1745-07-11','Média'),
(DEFAULT, 6, 'Declaração da Independência dos Estados Unidos','Legislação','1890-08-07','Ruim');

SELECT * FROM livro;

ALTER TABLE livro ADD CONSTRAINT chkIntegridade CHECK(integridade IN('Ruim', 'Média', 'Boa'));

SELECT idLivro AS 'ID do Documento', nome AS 'Nome do Documento', integridade AS 'Condição do Documento' FROM livro ORDER BY integridade;
SELECT idLivro AS 'ID do Documento', nome AS 'Nome do Documento' FROM livro WHERE integridade='Boa';
SELECT idLivro AS 'ID do Documento', nome AS 'Nome do Documento' FROM livro WHERE integridade='Média';
SELECT idLivro AS 'ID do Documento', nome AS 'Nome do Documento' FROM livro WHERE integridade='Ruim';

-- Tabela Sensor -----------------------------------------------------------------------------------------------------------------

CREATE TABLE sensor (
idSensor INT AUTO_INCREMENT,
fkSala INT,
CONSTRAINT pkSensorSala PRIMARY KEY (idSensor, fkSala),
nome VARCHAR(25) NOT NULL,
fator FLOAT NOT NULL,
CONSTRAINT fkSensorSala FOREIGN KEY (fkSala) REFERENCES sala(idSala)
);

INSERT INTO sensor VALUES
(DEFAULT, 1,'Sensor1', 0.5),
(DEFAULT, 1,'Sensor2', 1),
(DEFAULT, 2,'Sensor3', 0.6),
(DEFAULT, 2,'Sensor4', 0.7),
(DEFAULT, 3,'Sensor5', 0.4),
(DEFAULT, 3,'Sensor6', 0.6),
(DEFAULT, 4,'Sensor7', 0.8),
(DEFAULT, 4,'Sensor8', 1),
(DEFAULT, 5,'Sensor9', 0.9),
(DEFAULT, 5,'Sensor10', 1.2),
(DEFAULT, 6,'Sensor11', 1),
(DEFAULT, 6,'Sensor12', 0.7);

SELECT * FROM sensor;

SELECT (r.umidade * s.fator) AS Umidade, (r.temperatura * s.fator) AS Temperatura, s.nome FROM registro AS r , sensor AS s;
 
SELECT (r.umidade * s.fator) AS Umidade, (r.temperatura * s.fator) AS Temperatura, s.nome 
FROM registro AS r , sensor AS s WHERE fkSala = 1; 

-- Tabela Registro ---------------------------------------------------------------------------------------------------------

CREATE TABLE registro (
idRegistro INT PRIMARY KEY AUTO_INCREMENT,
umidade FLOAT,
temperatura FLOAT,
diaHora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO registro (umidade, temperatura) VALUES
(60,20),
(86,15),
(70,22);

SELECT * FROM registro;