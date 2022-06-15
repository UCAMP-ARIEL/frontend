import React, { useState, useReducer } from 'react'
import UserContext from './UserContext'
import UserReducer from './UserReducer'

import axiosClient from '../../config/axios'

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

	const handleChange = (event) => {
		event.preventDefault()

		setData({
			...data,
			[event.target.name]: event.target.value,
		})
	}

	const registerUser = async (dataForm) => {
		try {
			const res = await axiosClient.post('/usuario/crear', dataForm)
			dispatch({
				type: 'REGISTRO_EXITOSO',
				payload: res.data,
			})
		} catch (error) {}
	}

	return (
		<UserContext.Provider
			value={{
				user: globalState.user,
				authStatus: globalState.authStatus,
				loading: globalState.loading,
				registerUser,
				handleChange,
				data,
			}}
		>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserState
