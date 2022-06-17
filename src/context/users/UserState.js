import React, { useReducer, useState } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'
import clienteAxios from '../../config/axios'

const UserState = (props) => {
	const initialState = {
		user: {
			username: null,
			email: null,
		},
		authStatus: false,
		loading: true,
	}

	const [globalState, dispatch] = useReducer(UserReducer, initialState)

	const [data, setData] = useState({
		username: '',
		email: '',
		password: '',
	})
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	})
	const handleChange = (event) => {
		event.preventDefault()

		setData({
			...data,
			[event.target.name]: event.target.value,
		})
	}

	const registerUser = async (dataForm) => {
		try {
			const res = await clienteAxios.post('/usuario/crear', dataForm)
			dispatch({
				type: 'REGISTRO_EXITOSO',
				payload: res.data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const verifyingToken = async () => {
		const token = localStorage.getItem('token')

		if (token) {
			clienteAxios.defaults.headers.common['x-auth-token'] = token
		} else {
			delete clienteAxios.defaults.headers.common['x-auth-token']
		}

		try {
			const respuesta = token && (await clienteAxios.get('/usuario/verificar-usuario'))

			dispatch({
				type: 'OBTENER_USUARIO',
				payload: respuesta.data.usuario,
			})
		} catch (error) {
			console.log('Error Verificando token', error)
		}
	}

	const loginUser = async (dataForm) => {
		try {
			const respuesta = await clienteAxios.post('/usuario/login', dataForm)
			dispatch({
				type: 'LOGIN_EXITOSO',
				payload: respuesta.data,
			})
		} catch (error) {
			console.log(error)
		}
	}

	const logout = () => {
		dispatch({
			type: 'CERRAR_SESION',
		})
	}

	return (
		<UserContext.Provider
			value={{
				user: globalState.user,
				authStatus: globalState.authStatus,
				loading: globalState.loading,
				registerUser,
				loginUser,
				handleChange,
				verifyingToken,
				logout,
				data,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserState
