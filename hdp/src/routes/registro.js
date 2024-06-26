var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

router.get("/qtdSalasFora/:fkEmpresa", function (req, res) {
    registroController.qtdSalasFora(req, res);
});

router.get("/grafico1/:fkEmpresa/:idSensor", function (req, res) {
    registroController.grafico1(req, res);
});

router.get("/grafico1TempoReal/:fkEmpresa/:idSensor", function (req, res) {
    registroController.grafico1(req, res);
});

router.get("/grafico2/:fkEmpresa/:idSensor", function (req, res) {
    registroController.grafico2(req, res);
});

router.get("/grafico2TempoReal/:fkEmpresa/:idSensor", function (req, res) {
    registroController.grafico1(req, res);
});

router.get("/graficoPizza", function (req, res) {
    registroController.graficoPizza(req, res);
});

module.exports = router;