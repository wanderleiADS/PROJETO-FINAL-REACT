const express = require("express");
const router = express.Router();
const fornecedorController = require("../controllers/fornecedorController");

router.get("/", fornecedorController.listarFornecedores);
router.post("/", fornecedorController.cadastrarFornecedor);

module.exports = router;
