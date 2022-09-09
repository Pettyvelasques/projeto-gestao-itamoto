import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home';
import Pieces from './components/pages/Pieces'
import NewBuy from './components/pages/NewBuy'
import Clients from './components/pages/Clients'
import NewClient from './components/pages/NewClient'
import Sales from './components/pages/Sales'
import NewSale from './components/pages/NewSale'
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
          <Route path="/newbuy" element={<NewBuy />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/newclient" element={<NewClient />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/newsale" element={<NewSale />} />
          <Route path="/finance" element={<Finance />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App;
