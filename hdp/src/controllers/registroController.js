var registroModel = require("../models/registroModel");

function qtdSalasFora(req, res) {

    var fkEmpresa = req.params.fkEmpresa;

    registroModel.qtdSalasFora(fkEmpresa)
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

    var fkEmpresa = req.params.fkEmpresa;
    var idSensor = req.params.idSensor;

    registroModel.grafico2(fkEmpresa, idSensor)
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

function grafico2TempoReal(req, res) {

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
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    qtdSalasFora,
    grafico1,
    grafico1TempoReal,
    grafico2,
    grafico2TempoReal,
    graficoPizza
}