import React, { useContext } from 'react'

import UserContext from '../../context/users/UserContext'
import FormInput from '../FormInput'

export default function Register() {
	const userCtx = useContext(UserContext)

	const { registerUser, data } = userCtx

	const sendData = (event) => {
		event.preventDefault()
		registerUser(data)
	}

	return (
		<>
			<div>
				<h2>Crear cuenta</h2>

				<form
					onSubmit={(e) => {
						sendData(e)
					}}
				>
					<FormInput tipo='username' />
					<FormInput tipo='email' />
					<FormInput tipo='password' />

					<button type='submit'>Registrarme</button>
				</form>
			</div>
		</>
	)
}
