const db = require("../services/db");

// Listar fornecedores
exports.listarFornecedores = (req, res) => {
  const sql = "SELECT * FROM fornecedores";
  db.query(sql, (err, results) => {
    if (err)
      return res
        .status(500)
        .json({ mensagem: "Erro ao buscar fornecedores.", erro: err });
    res.status(200).json(results);
  });
};

// Cadastrar fornecedor
exports.cadastrarFornecedor = (req, res) => {
  const { nome_empresa, cnpj, endereco, telefone, email, contato_principal } =
    req.body;

  if (
    !nome_empresa ||
    !cnpj ||
    !endereco ||
    !telefone ||
    !email ||
    !contato_principal
  ) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios!" });
  }

  const verificarCNPJ = "SELECT * FROM fornecedores WHERE cnpj = ?";
  db.query(verificarCNPJ, [cnpj], (err, results) => {
    if (err)
      return res.status(500).json({ mensagem: "Erro no servidor.", erro: err });

    if (results.length > 0) {
      return res
        .status(400)
        .json({ mensagem: "Fornecedor com esse CNPJ já está cadastrado!" });
    }

    const sql = `
      INSERT INTO fornecedores (nome_empresa, cnpj, endereco, telefone, email, contato_principal)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [nome_empresa, cnpj, endereco, telefone, email, contato_principal],
      (err) => {
        if (err)
          return res
            .status(500)
            .json({ mensagem: "Erro ao cadastrar fornecedor.", erro: err });
        res
          .status(201)
          .json({ mensagem: "Fornecedor cadastrado com sucesso!" });
      }
    );
  });
};