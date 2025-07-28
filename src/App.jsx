import './App.css'
import Register from './pages/register'
import Login from './pages/login'
import HomeAdmin from './pages/HomeAdmin';
import HomeUser from './pages/HomeUser';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      {/* Puedes dejar esto o quitarlo si no necesitas navegación */}
      <nav>
        <Link to="/register">Registrarse</Link>
        <br></br>
        <Link to="/login">Iniciar sesión</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />} />
        <Route path="/HomeUser" element={<HomeUser />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App