var express = require("express");
var router = express.Router();

var registroController = require("../controllers/registroController");

router.get("/contarSalasTotais/:fkEmpresa", function (req, res) {
    registroController.contarSalasTotais(req, res);
});

router.get("/qtdSalasFora", function (req, res) {
    registroController.qtdSalasFora(req, res);
});

router.get("/qtdSalasDentro", function (req, res) {
    registroController.qtdSalasDentro(req, res);
});

router.get("/graficoPizza", function (req, res) {
    registroController.graficoPizza(req, res);
});

router.get("/grafico1/:fkEmpresa/:idSensor", function (req, res) {
    registroController.grafico1(req, res);
});

router.get("/grafico2/:fkEmpresa/:idSensor", function (req, res) {
    registroController.grafico2(req, res);
});

module.exports = router;