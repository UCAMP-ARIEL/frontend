const reducers = (globalState, action) => {
	switch (action.type) {
		case 'LOGIN_EXITOSO':
			localStorage.setItem('token', action.payload.token)
			return {
				...globalState,
				authStatus: true,
			}

		case 'REGISTRO_EXITOSO':
			localStorage.setItem('token', action.payload.token)
			return {
				...globalState,
				authStatus: true,
			}

		case 'OBTENER_USUARIO':
			return {
				...globalState,
				authStatus: true,
				user: action.payload,
			}

		case 'CERRAR_SESION':
			localStorage.removeItem('token')

			return {
				...globalState,
				user: null,
				authStatus: false,
				loading: true,
			}

		default:
			return globalState
	}
}

export default reducers
