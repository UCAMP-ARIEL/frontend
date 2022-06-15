const reducers = (globalState, action) => {
	switch (action.type) {
		case 'REGISTRO_EXITOSO':
			localStorage.setItem('token', action.payload.token)

			return {
				...globalState,
				authStatus: true,
			}

		default:
			return globalState
	}
}

export default reducers
