import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import ComingSoon from './pages/ComingSoon';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/play" element={<ComingSoon />} />
            <Route path="/leaderboard" element={<ComingSoon />} />
            <Route path="/about" element={<ComingSoon />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
