import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [novoFornecedor, setNovoFornecedor] = useState({ nome_empresa: '', cnpj: '', endereco: '', telefone: '', email: '', contato_principal: '' });

  // Carregar fornecedores
  useEffect(() => {
    carregarFornecedores();
  }, []);

  const carregarFornecedores = () => {
    api.get('/fornecedores')
      .then((response) => setFornecedores(response.data))
      .catch((error) => console.error('Erro ao carregar fornecedores:', error));
  };

  // Adicionar fornecedor
  const handleAddFornecedor = (e) => {
    e.preventDefault();
    api.post('/fornecedores', novoFornecedor)
      .then(() => {
        setNovoFornecedor({ nome_empresa: '', cnpj: '', endereco: '', telefone: '', email: '', contato_principal: '' });
        carregarFornecedores();
      })
      .catch((error) => console.error('Erro ao adicionar fornecedor:', error));
  };

  return (
    <div>
      <h1>Gestão de Fornecedores</h1>
      <form onSubmit={handleAddFornecedor}>
        <input type="text" placeholder="Nome da Empresa" value={novoFornecedor.nome_empresa} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, nome_empresa: e.target.value })} required />
        <input type="text" placeholder="CNPJ" value={novoFornecedor.cnpj} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, cnpj: e.target.value })} required />
        <input type="text" placeholder="Endereço" value={novoFornecedor.endereco} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, endereco: e.target.value })} required />
        <input type="text" placeholder="Telefone" value={novoFornecedor.telefone} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, telefone: e.target.value })} required />
        <input type="email" placeholder="Email" value={novoFornecedor.email} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, email: e.target.value })} required />
        <input type="text" placeholder="Contato Principal" value={novoFornecedor.contato_principal} onChange={(e) => setNovoFornecedor({ ...novoFornecedor, contato_principal: e.target.value })} required />
        <button type="submit">Adicionar Fornecedor</button>
      </form>

      <ul>
        {fornecedores.map((fornecedor) => (
          <li key={fornecedor.id}>{fornecedor.nome_empresa}</li>
        ))}
      </ul>
    </div>
  );
};

export default Fornecedores;