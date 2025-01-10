const db = require("../services/db");

const Associacao = {
  associar: (produtoId, fornecedorId, callback) => {
    const sql = `
      INSERT INTO produto_fornecedor (produto_id, fornecedor_id)
      VALUES (?, ?)
    `;
    db.query(sql, [produtoId, fornecedorId], callback);
  },

  desassociar: (produtoId, fornecedorId, callback) => {
    const sql = `
      DELETE FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?
    `;
    db.query(sql, [produtoId, fornecedorId], callback);
  },

  listarFornecedoresDoProduto: (produtoId, callback) => {
    const sql = `
      SELECT f.* FROM fornecedores f
      JOIN produto_fornecedor pf ON f.id = pf.fornecedor_id
      WHERE pf.produto_id = ?
    `;
    db.query(sql, [produtoId], callback);
  },
};

module.exports = Associacao;
