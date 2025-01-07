import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Associacoes = () => {
  const [produtos, setProdutos] = useState([]);
  const [fornecedores, setFornecedores] = useState([]);
  const [associacoes, setAssociacoes] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState('');

  useEffect(() => {
    carregarProdutos();
    carregarFornecedores();
  }, []);

  const carregarProdutos = () => {
    api.get('/produtos')
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error('Erro ao carregar produtos:', error));
  };

  const carregarFornecedores = () => {
    api.get('/fornecedores')
      .then((response) => setFornecedores(response.data))
      .catch((error) => console.error('Erro ao carregar fornecedores:', error));
  };

  const carregarAssociacoes = (produtoId) => {
    api.get(`/associacoes/${produtoId}/fornecedores`)
      .then((response) => setAssociacoes(response.data))
      .catch((error) => console.error('Erro ao carregar associações:', error));
  };

  const handleAssociar = () => {
    if (!produtoSelecionado || !fornecedorSelecionado) {
      alert('Selecione um produto e um fornecedor!');
      return;
    }

    api.post('/associacoes/associar', {
      produtoId: produtoSelecionado,
      fornecedorId: fornecedorSelecionado,
    })
      .then(() => {
        alert('Associação realizada com sucesso!');
        carregarAssociacoes(produtoSelecionado);
      })
      .catch((error) => console.error('Erro ao associar fornecedor:', error));
  };

  const handleDesassociar = (fornecedorId) => {
    api.delete('/associacoes/desassociar', {
      data: { produtoId: produtoSelecionado, fornecedorId },
    })
      .then(() => {
        alert('Associação removida com sucesso!');
        carregarAssociacoes(produtoSelecionado);
      })
      .catch((error) => console.error('Erro ao desassociar fornecedor:', error));
  };

  const handleProdutoChange = (produtoId) => {
    setProdutoSelecionado(produtoId);
    carregarAssociacoes(produtoId);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Associação Produto/Fornecedor</h1>

      <div className="row mb-3">
        <div className="col-md-6">
          <label htmlFor="produtoSelect" className="form-label">
            Selecione um Produto:
          </label>
          <select
            id="produtoSelect"
            className="form-select"
            onChange={(e) => handleProdutoChange(e.target.value)}
            value={produtoSelecionado}
          >
            <option value="">--Selecione--</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome_produto}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label htmlFor="fornecedorSelect" className="form-label">
            Selecione um Fornecedor:
          </label>
          <select
            id="fornecedorSelect"
            className="form-select"
            onChange={(e) => setFornecedorSelecionado(e.target.value)}
            value={fornecedorSelecionado}
          >
            <option value="">--Selecione--</option>
            {fornecedores.map((fornecedor) => (
              <option key={fornecedor.id} value={fornecedor.id}>
                {fornecedor.nome_empresa}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="d-flex justify-content-center mb-4">
        <button className="btn btn-primary" onClick={handleAssociar}>
          Associar Fornecedor
        </button>
      </div>

      <h2 className="mb-3">Fornecedores Associados</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>Contato</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {associacoes.length > 0 ? (
            associacoes.map((associacao) => (
              <tr key={associacao.id}>
                <td>{associacao.nome_empresa}</td>
                <td>{associacao.contato_principal}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDesassociar(associacao.id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">
                Nenhuma associação encontrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}; 

export default Associacoes;