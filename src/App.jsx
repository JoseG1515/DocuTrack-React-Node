import './App.css'
import Register from './pages/register'
import Login from './pages/login'
import HomeAdmin from './pages/HomeAdmin';
import HomeUser from './pages/HomeUser';
import Solicitud from './pages/solicitud';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ListaTramites from './pages/ListaTramites';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/HomeAdmin" element={<HomeAdmin />}/>
        <Route path="/HomeUser" element={<HomeUser />} />
        <Route path="/solicitud" element={<Solicitud />}/>
        <Route path="/ListaTramites" element={<ListaTramites />}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App