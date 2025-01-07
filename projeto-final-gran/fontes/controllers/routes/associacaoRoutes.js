const express = require("express");
const router = express.Router();
const associacaoController = require("../controllers/associacaoController");

router.post("/associar", associacaoController.associarFornecedor);
router.get(
  "/:produtoId/fornecedores",
  associacaoController.listarFornecedoresAssociados
);
router.delete("/desassociar", associacaoController.desassociarFornecedor);

module.exports = router;
