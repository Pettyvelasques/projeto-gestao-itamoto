import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home';
import Pecas from './components/pages/Pecas'
import NovaCompra from './components/pages/NovaCompra'
import Clientes from './components/pages/Clientes'
import NovoCliente from './components/pages/NovoCliente'
import Vendas from './components/pages/Vendas'
import NovaVenda from './components/pages/NovaVenda'
import Financeiro from './components/pages/Financeiro'

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pecas" element={<Pecas />} />
          <Route path="/novacompra" element={<NovaCompra />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/novocliente" element={<NovoCliente />} />
          <Route path="/vendas" element={<Vendas />} />
          <Route path="/novavenda" element={<NovaVenda />} />
          <Route path="/financeiro" element={<Financeiro />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;
