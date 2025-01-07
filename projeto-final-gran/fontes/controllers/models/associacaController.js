onst db = require('../services/db');

exports.associarFornecedor = (req, res) => {
  const { produtoId, fornecedorId } = req.body;

  const verificarAssociacao = 'SELECT * FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?';
  db.query(verificarAssociacao, [produtoId, fornecedorId], (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro no servidor.', erro: err });

    if (results.length > 0) {
      return res.status(400).json({ mensagem: 'Fornecedor já está associado a este produto!' });
    }

    const sql = 'INSERT INTO produto_fornecedor (produto_id, fornecedor_id) VALUES (?, ?)';
    db.query(sql, [produtoId, fornecedorId], (err) => {
      if (err) return res.status(500).json({ mensagem: 'Erro ao associar fornecedor.', erro: err });
      res.status(201).json({ mensagem: 'Fornecedor associado com sucesso!' });
    });
  });
};

exports.listarFornecedoresAssociados = (req, res) => {
  const { produtoId } = req.params;

  const sql = `
    SELECT f.* FROM fornecedores f
    INNER JOIN produto_fornecedor pf ON f.id = pf.fornecedor_id
    WHERE pf.produto_id = ?
  `;
  db.query(sql, [produtoId], (err, results) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao listar fornecedores associados.', erro: err });
    res.status(200).json(results);
  });
};

exports.desassociarFornecedor = (req, res) => {
  const { produtoId, fornecedorId } = req.body;

  const sql = 'DELETE FROM produto_fornecedor WHERE produto_id = ? AND fornecedor_id = ?';
  db.query(sql, [produtoId, fornecedorId], (err) => {
    if (err) return res.status(500).json({ mensagem: 'Erro ao desassociar fornecedor.', erro: err });
    res.status(200).json({ mensagem: 'Fornecedor desassociado com sucesso!' });
  });
};