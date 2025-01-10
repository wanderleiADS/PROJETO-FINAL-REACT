const db = require("../services/db");

const Produto = {
  create: (produto, callback) => {
    const sql = `
      INSERT INTO produtos (nome_produto, codigo_barras, descricao, quantidade, categoria, data_validade)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
      produto.nome_produto,
      produto.codigo_barras,
      produto.descricao,
      produto.quantidade,
      produto.categoria,
      produto.data_validade,
    ];
    db.query(sql, params, callback);
  },

  findByCodigoBarras: (codigo_barras, callback) => {
    const sql = "SELECT * FROM produtos WHERE codigo_barras = ?";
    db.query(sql, [codigo_barras], callback);
  },

  findAll: (callback) => {
    const sql = "SELECT * FROM produtos";
    db.query(sql, [], callback);
  },
};

module.exports = Produto;
