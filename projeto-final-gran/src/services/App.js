import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Produtos from './pages/Produtos';
import Fornecedores from './pages/Fornecedores';
import Associacoes from './pages/Associacoes';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <a href="/produtos">Produtos</a>
          <a href="/fornecedores">Fornecedores</a>
          <a href="/associacoes">Associações</a>
        </nav>
        <Routes>
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/associacoes" element={<Associacoes />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;