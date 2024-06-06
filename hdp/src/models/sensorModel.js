var database = require("../database/config");

function buscarSensoresPorEmpresa(fkEmpresa) {

  var instrucaoSql = `SELECT s.*, sala.fkEmpresa, sala.nome AS nomeSala FROM sensor AS s JOIN sala ON sala.idSala=s.fkSala JOIN empresa ON empresa.idEmpresa=sala.fkEmpresa 
  WHERE fkEmpresa = ${fkEmpresa};`;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  buscarSensoresPorEmpresa
  }