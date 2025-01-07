import React, { useState, useEffect } from "react";
import api from "../services/api";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome_produto: "",
    codigo_barras: "",
    descricao: "",
    quantidade: "",
    categoria: "",
  });

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = () => {
    api
      .get("/produtos")
      .then((response) => setProdutos(response.data))
      .catch((error) => console.error("Erro ao carregar produtos:", error));
  };

  const handleAddProduto = (e) => {
    e.preventDefault();
    api
      .post("/produtos", novoProduto)
      .then(() => {
        setNovoProduto({
          nome_produto: "",
          codigo_barras: "",
          descricao: "",
          quantidade: "",
          categoria: "",
        });
        carregarProdutos();
      })
      .catch((error) => console.error("Erro ao adicionar produto:", error));
  };

  const handleDeleteProduto = (id) => {
    api
      .delete(`/produtos/${id}`)
      .then(() => carregarProdutos())
      .catch((error) => console.error("Erro ao deletar produto:", error));
  };

  return (
    <div>
      <h1>Gestão de Produtos</h1>
      <form onSubmit={handleAddProduto}>
        <input
          type="text"
          placeholder="Nome"
          value={novoProduto.nome_produto}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, nome_produto: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Código de Barras"
          value={novoProduto.codigo_barras}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, codigo_barras: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, descricao: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={novoProduto.quantidade}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, quantidade: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={novoProduto.categoria}
          onChange={(e) =>
            setNovoProduto({ ...novoProduto, categoria: e.target.value })
          }
          required
        />
        <button type="submit">Adicionar Produto</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Código de Barras</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Categoria</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome_produto}</td>
              <td>{produto.codigo_barras}</td>
              <td>{produto.descricao}</td>
              <td>{produto.quantidade}</td>
              <td>{produto.categoria}</td>
              <td>
                <button onClick={() => handleDeleteProduto(produto.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Produtos;
