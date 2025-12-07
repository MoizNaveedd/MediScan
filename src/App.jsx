import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ScanPage from './pages/ScanPage';
import GeneratePage from './pages/GeneratePage';
import DrugInfoPage from './pages/DrugInfoPage';

function App() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/scan" element={<ScanPage />} />
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/drug/:id" element={<DrugInfoPage />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
