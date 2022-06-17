import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../../context/users/UserContext'

export default function Header() {
	const ctx = useContext(UserContext)

	const { logout, authStatus } = ctx

	return (
		<div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
			<Link to='/'>Inicio</Link>

			{/* <Link to='/perfil'>perfillllll</Link> //para prubar la ruta perfin sin estar logeado */}

			{authStatus ? (
				<>
					<Link to='/perfil'>Perfil</Link>

					<Link to='/' onClick={logout}>
						Cerrar sesión
					</Link>
				</>
			) : (
				<>
					<Link to='/registro'>Registro</Link>

					<Link to='/iniciar-sesion'>Iniciar sesión</Link>
				</>
			)}
		</div>
	)
}
