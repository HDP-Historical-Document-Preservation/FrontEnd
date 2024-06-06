var database = require("../database/config");


function contarSalasTotais(fkEmpresa) {
  var instrucaoSql = `
    SELECT COUNT(s.idSala) AS salas FROM sala AS s JOIN Empresa ON empresa.idEmpresa = s.fkEmpresa WHERE s.fkEmpresa = ${fkEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function qtdSalasFora(fkEmpresa) {
  var instrucaoSql = `
    SELECT COUNT(DISTINCT sa.idSala) AS 'qtdSalasFora'
FROM sala AS sa
JOIN sensor AS s ON sa.idSala = s.fkSala
JOIN (
  SELECT r.fkSensor, r.umidade, r.temperatura, r.diaHora, r.idRegistro
  FROM registro AS r
  JOIN (
    SELECT fkSensor, MAX(diaHora) AS max_diaHora
    FROM registro
    GROUP BY fkSensor ORDER BY max_diaHora DESC
  ) AS lr ON r.fkSensor = lr.fkSensor AND r.diaHora = lr.max_diaHora
) AS r ON s.idSensor = r.fkSensor
JOIN empresa AS e ON e.idEmpresa = sa.fkEmpresa
WHERE e.idEmpresa = ${fkEmpresa}
  AND (ROUND(r.umidade * s.fator) >= 65 
       OR ROUND(r.umidade * s.fator) <= 55 
       OR ROUND(r.temperatura * s.fator) >= 25 
       OR ROUND(r.temperatura * s.fator) <= 15);
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function qtdSalasDentro(fkEmpresa) {
  var instrucaoSql = `
    SELECT COUNT(DISTINCT sa.idSala) AS 'qtdSalasDentro'
FROM sala AS sa
JOIN sensor AS s ON sa.idSala = s.fkSala
JOIN (
  SELECT r.fkSensor, r.umidade, r.temperatura, r.diaHora, r.idRegistro
  FROM registro AS r
  JOIN (
    SELECT fkSensor, MAX(diaHora) AS max_diaHora
    FROM registro
    GROUP BY fkSensor ORDER BY max_diaHora DESC
  ) AS lr ON r.fkSensor = lr.fkSensor AND r.diaHora = lr.max_diaHora
) AS r ON s.idSensor = r.fkSensor
JOIN empresa AS e ON e.idEmpresa = sa.fkEmpresa
WHERE e.idEmpresa = ${fkEmpresa}
  AND (ROUND(r.umidade * s.fator) <= 65 
       AND ROUND(r.umidade * s.fator) >= 55 
       AND ROUND(r.temperatura * s.fator) <= 25 
       AND ROUND(r.temperatura * s.fator) >= 15);
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function graficoPizza(fkEmpresa) {
  var instrucaoSql = `
    SELECT 
  COUNT(DISTINCT CASE 
                   WHEN ROUND(r.umidade * s.fator) > 65 
                     OR ROUND(r.umidade * s.fator) < 55 
                     OR ROUND(r.temperatura * s.fator) > 25 
                     OR ROUND(r.temperatura * s.fator) < 15 
                   THEN sa.idSala 
                 END) AS 'qtdSalasFora',
  COUNT(DISTINCT CASE 
                   WHEN ROUND(r.umidade * s.fator) <= 65 
                     AND ROUND(r.umidade * s.fator) >= 55 
                     AND ROUND(r.temperatura * s.fator) <= 25 
                     AND ROUND(r.temperatura * s.fator) >= 15 
                   THEN sa.idSala 
                 END) AS 'qtdSalasDentro'
FROM sala AS sa
JOIN sensor AS s ON sa.idSala = s.fkSala
JOIN (
  SELECT r.fkSensor, r.umidade, r.temperatura, r.diaHora, r.idRegistro
  FROM registro AS r
  JOIN (
    SELECT fkSensor, MAX(diaHora) AS max_diaHora
    FROM registro
    GROUP BY fkSensor
  ) AS lr ON r.fkSensor = lr.fkSensor AND r.diaHora = lr.max_diaHora
) AS r ON s.idSensor = r.fkSensor
JOIN empresa AS e ON e.idEmpresa = sa.fkEmpresa
WHERE e.idEmpresa = ${fkEmpresa};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function grafico1(fkEmpresa, idSensor) {
  var instrucaoSql = `
    SELECT 
  s.idSensor,
  sa.nome AS nome_sala,
  ROUND(r.umidade * s.fator) AS umidade_ajustada,
  ROUND(r.temperatura * s.fator) AS temperatura_ajustada,
  r.diaHora AS hora_insercao
FROM sala AS sa
JOIN sensor AS s ON sa.idSala = s.fkSala
JOIN registro AS r ON r.fkSensor = s.idSensor
JOIN empresa AS e ON e.idEmpresa = sa.fkEmpresa
WHERE e.idEmpresa = ${fkEmpresa}
  AND s.idSensor = ${idSensor}
 ORDER BY hora_insercao DESC LIMIT 7;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function grafico1TempoReal(fkEmpresa, idSensor) {
  var instrucaoSql = `
  SELECT 
s.idSensor,
sa.nome AS nome_sala,
ROUND(r.umidade * s.fator) AS umidade_ajustada,
ROUND(r.temperatura * s.fator) AS temperatura_ajustada,
r.diaHora AS hora_insercao
FROM sala AS sa
JOIN sensor AS s ON sa.idSala = s.fkSala
JOIN registro AS r ON r.fkSensor = s.idSensor
JOIN empresa AS e ON e.idEmpresa = sa.fkEmpresa
WHERE e.idEmpresa = ${fkEmpresa}
AND s.idSensor = ${idSensor}
ORDER BY hora_insercao DESC LIMIT 7;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function grafico2(fkEmpresa, idSensor) {
  var instrucaoSql = `
    SELECT 
  s.idSensor,
  sa.nome AS nome_sala,
  ROUND(r.umidade * s.fator) AS umidade_ajustada,
  ROUND(r.temperatura * s.fator) AS temperatura_ajustada,
  r.diaHora AS hora_insercao
FROM sala AS sa
JOIN sensor AS s ON sa.idSala = s.fkSala
JOIN registro AS r ON r.fkSensor = s.idSensor
JOIN empresa AS e ON e.idEmpresa = sa.fkEmpresa
WHERE e.idEmpresa = ${fkEmpresa}
  AND s.idSensor = ${idSensor}
 ORDER BY hora_insercao DESC LIMIT 24;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function grafico2TempoReal(fkEmpresa, idSensor) {
  var instrucaoSql = `
  SELECT 
s.idSensor,
sa.nome AS nome_sala,
ROUND(r.umidade * s.fator) AS umidade_ajustada,
ROUND(r.temperatura * s.fator) AS temperatura_ajustada,
r.diaHora AS hora_insercao
FROM sala AS sa
JOIN sensor AS s ON sa.idSala = s.fkSala
JOIN registro AS r ON r.fkSensor = s.idSensor
JOIN empresa AS e ON e.idEmpresa = sa.fkEmpresa
WHERE e.idEmpresa = ${fkEmpresa}
AND s.idSensor = ${idSensor}
ORDER BY hora_insercao DESC LIMIT 24;
  `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
} F

module.exports = {
  contarSalasTotais,
  qtdSalasFora,
  qtdSalasDentro,
  graficoPizza,
  grafico1,
  grafico1TempoReal,
  grafico2,
  grafico2TempoReal
}