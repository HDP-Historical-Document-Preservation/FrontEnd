var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.get("/:fkEmpresa", function (req, res) {
  sensorController.buscarSensoresPorEmpresa(req, res);
});

module.exports = router;