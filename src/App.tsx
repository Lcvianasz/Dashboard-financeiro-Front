import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './pages/Dashboard/Dashboard';
import Metas from './pages/Metas/Metas';
import Transacoes from './pages/Transacoes/Transacoes';
import { DashboardInvestimentos } from './pages/DashboardInvestimentos';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/metas" element={<Metas />} />
            <Route path="/transacoes" element={<Transacoes />} />
            <Route path="/investimentos" element={<DashboardInvestimentos />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;