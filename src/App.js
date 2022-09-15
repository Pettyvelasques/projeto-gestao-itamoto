import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from './components/pages/Login/LoginMain';
import Home from './components/pages/Home/HomeMain';
import Pieces from './components/pages/Pieces/PiecesMain'
import NewPiece from './components/pages/Pieces/NewPiece'
import Piece from './components/pages/Pieces/Piece';
import Clients from './components/pages/Clients/ClientsMain'
import NewClient from './components/pages/Clients/NewClient'
import Client from './components/pages/Clients/Client';
import Sales from './components/pages/Sales/SalesMain'
import NewSale from './components/pages/Sales/NewSale'
import Finance from './components/pages/Finance'

import Navbar from './components/layout/Navbar/index';
import Container from './components/layout/Container/index';
import Footer from './components/layout/Footer/index';

function App() {

  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pieces" element={<Pieces />} />
          <Route path="/newpiece" element={<NewPiece />} />
          <Route path="/pieces/pecas/:id" element={<Piece />}  />
          <Route path="/clients" element={<Clients />} />
          <Route path="/newclient" element={<NewClient />} />
          <Route path="/clients/clientes/:id" element={<Client />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/newsale" element={<NewSale />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;
