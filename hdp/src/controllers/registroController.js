var registroModel = require("../models/registroModel");

function contarSalasTotais(req, res) {

    var fkEmpresa = req.params.fkEmpresa;

    registroModel.contarSalasTotais(fkEmpresa)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function qtdSalasFora(req, res) {
    registroModel.qtdSalasFora()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function qtdSalasDentro(req, res) {
    registroModel.qtdSalasDentro()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function graficoPizza(req, res) {
    registroModel.graficoPizza()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a contagem de kpis! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function grafico1(req, res) {

    var fkEmpresa = req.params.fkEmpresa;
    var idSensor = req.params.idSensor;

    registroModel.grafico1(fkEmpresa, idSensor)
        .then(function (resultado) {
            console.log('FKSENSOR', idSensor)
            console.log(resultado)

            res.status(200).json(resultado);

        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function grafico1TempoReal(req, res) {

    var fkEmpresa = req.params.fkEmpresa;
    var idSensor = req.params.idSensor;

    registroModel.grafico1TempoReal(fkEmpresa, idSensor)
        .then(function (resultado) {

            res.status(200).json(resultado);

        }).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

function grafico2(req, res) {


    registroModel.grafico2()
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    contarSalasTotais,
    qtdSalasFora,
    qtdSalasDentro,
    graficoPizza,
    grafico1,
    grafico1TempoReal,
    grafico2
}