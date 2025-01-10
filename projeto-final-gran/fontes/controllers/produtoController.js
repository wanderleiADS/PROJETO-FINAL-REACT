const db = require("../services/db");

// Listar produtos
exports.listarProdutos = (req, res) => {
  const sql = "SELECT * FROM produtos";
  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ mensagem: "Erro ao buscar produtos.", erro: err });
    res.status(200).json(results);
  });
};

// Cadastrar produto
exports.cadastrarProduto = (req, res) => {
  const { nome_produto, codigo_barras, descricao, quantidade, categoria } =
    req.body;

  if (
    !nome_produto ||
    !codigo_barras ||
    !descricao ||
    !quantidade ||
    !categoria
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  const verificarCodigo = "SELECT * FROM produtos WHERE codigo_barras = ?";
  db.query(verificarCodigo, [codigo_barras], (err, results) => {
    if (err)
      return res.status(500).json({ mensagem: "Erro no servidor.", erro: err });

    if (results.length > 0) {
      return res.status(400).json({
        mensagem: "Produto com este código de barras já está cadastrado!",
      });
    }

    const sql = `
      INSERT INTO produtos (nome_produto, codigo_barras, descricao, quantidade, categoria)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [nome_produto, codigo_barras, descricao, quantidade, categoria],
      (err) => {
        if (err)
          return res
            .status(500)
            .json({ mensagem: "Erro ao cadastrar produto.", erro: err });
        res.status(201).json({ mensagem: "Produto cadastrado com sucesso!" });
      }
    );
  });
};
