import './App.css'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

import Home from './components/Home/Home'
import Header from './components/Layout/Header'

import Profile from './components/Profile/Profile'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

import GuitarState from './context/guitars/GuitarState'
import UserState from './context/users/UserState'

function App() {
	return (
		<>
			<UserState>
				<GuitarState>
					<Router>
						<Header />

						<Routes>
							{/* RUTAS PRIVADAS */}
							<Route path='/perfil' element={<Profile />} />

							{/* RUTAS DE AUTENTICACIÓN */}
							<Route path='/registro' element={<Register />} />
							<Route path='/iniciar-sesion' element={<Login />} />

							{/* RUTAS PÚBLICAS */}
							<Route path='/' element={<Home />} />
						</Routes>
					</Router>
				</GuitarState>
			</UserState>
		</>
	)
}

export default App
