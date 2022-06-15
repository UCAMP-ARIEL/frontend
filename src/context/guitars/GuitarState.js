import React, { useReducer } from 'react'
import GuitarContext from './GuitarContext'
import guitarReducer from './GuitarReducer'
import clienteAxios from '../../config/axios'

const GuitarState = (props) => {
	// 1. ESTADO INICIAL
	const initialState = {
		guitars: [],
	}

	// 2. DISPATCHING Y REDUCERS
	const [globalState, dispatch] = useReducer(guitarReducer, initialState)

	// 3. FUNCIONES
	// NOS VAN A AYUDAR A CAPTURAR LOS EVENTOS DE LOS COMPONENTES

	// A. CREAR GUITARRA
	// CAPTURAREMOS A TRAVÉS DE ESTA FUNCIÓN LOS DATOS DE UN FORMULARIO
	//QUE NOS PERMITIRÁN CREAR UNA GUITARRA
	const createGuitar = async (dataForm) => {
		const form = {
			nombre: dataForm.nombre,
			precio: dataForm.precio,
		}

		try {
			await clienteAxios.post(`/crear-guitarra`, form)
			getGuitars()
		} catch (error) {
			console.log(error)
		}
	}

	// B. LEER GUITARRAS
	// AL EJECUTAR ESTA FUNCIÓN, NOS PERMITE ACTUALIZAR NUESTRO ESTADO GLOBAL, A PARTIR DE UNA LLAMADA ASÍNCRONA "GET" HACIA EL SERVIDOR
	const getGuitars = async () => {
		try {
			const res = await clienteAxios.get(`/obtener-guitarras`)
			console.log('res :', res)

			dispatch({
				type: 'OBTENER_GUITARRAS',
				payload: res.data.guitarras,
			})
		} catch (error) {
			console.log(error)
		}
	}

	// C. ACTUALIZAR GUITARRA
	// ACTUALIZA EL DATO DE UNA GUITARRA A PARTIR DE UN FORMULARIO HACIA NUESTRA BASE DE DATOS.
	const updateGuitar = async (id, dataForm) => {
		const form = {
			id,
			nombre: dataForm.nombre,
			precio: dataForm.precio,
		}

		try {
			await clienteAxios.put(`/actualizar-guitarra`, form)
			getGuitars()
		} catch (error) {
			console.log(error)
		}
	}

	// D. BORRAR GUITARRA
	// BORRA UNA GUITARRA HACIA LA BASE DE DATOS, A TRAVÉS DE UNA RUTA CON EL MÉTODO DELETE
	const deleteGuitar = async (id) => {
		const data = { id }

		try {
			await clienteAxios.delete(`/borrar-guitarra`, { data })
			getGuitars()
		} catch (error) {
			console.log(error)
		}
	}

	// 4. RETORNO DE ESTADO GLOBAL
	return (
		<GuitarContext.Provider
			value={{
				guitars: globalState.guitars,
				createGuitar,
				getGuitars,
				updateGuitar,
				deleteGuitar,
			}}
		>
			{props.children}
		</GuitarContext.Provider>
	)
}

export default GuitarState
