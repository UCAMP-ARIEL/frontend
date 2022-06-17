import React, { useEffect, useContext } from 'react'
import UserContext from './../../context/users/UserContext'
import { useNavigate } from 'react-router-dom'
import FormInput from '../FormInput'

export default function Login() {
	const userCtx = useContext(UserContext)
	const { loginUser, authStatus, verifyingToken, data } = userCtx

	const navigate = useNavigate()

	useEffect(() => {
		verifyingToken()

		if (authStatus) {
			navigate('/perfil')
		}
	}, [authStatus])

	if (authStatus) return null

	const sendData = (event) => {
		event.preventDefault()
		loginUser(data)
	}

	return (
		<>
			<h2>Iniciar sesión</h2>

			<form onSubmit={(e) => sendData(e)}>
				<FormInput tipo='email' />
				<FormInput tipo='password' />
				<button type='submit'>Comenzar</button>
			</form>
		</>
	)
}
