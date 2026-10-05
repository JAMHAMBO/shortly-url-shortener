import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import InfoPage from './pages/InfoPage';
import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path="/about" element={<InfoPage page="about" />} />
          <Route path="/privacy" element={<InfoPage page="privacy" />} />
          <Route path="/terms" element={<InfoPage page="terms" />} />
          <Route path="/contact" element={<InfoPage page="contact" />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />        
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
