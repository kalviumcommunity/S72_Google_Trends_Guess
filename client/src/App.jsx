import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            {/* Add more routes as they are implemented */}
            <Route path="*" element={
              <div className="container py-24 text-center">
                <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
                <p className="mt-4 text-gray-600">The page you're looking for doesn't exist.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
