import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherData from './component/WeatherData';
import Search from './component/Search';

export default function App() {
  return (
    <Router>

      <div className="min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 flex items-center justify-center">
        <div className="w-full max-w-7xl p-4">
          <Routes>
            <Route path="/" element={
              <>
                <Search />
                <WeatherData initialLocation="Jhapa" />
              </>
            } />
            <Route path="/weather/:location" element={
              <>
                <Search />
                <WeatherData />
              </>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
