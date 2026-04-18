import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Metas from './pages/Metas/Metas';
import Transacoes from './pages/Transacoes/Transacoes';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/metas" element={<Metas />} />
        <Route path="/transacoes" element={<Transacoes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;