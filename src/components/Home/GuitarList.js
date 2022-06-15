import React, { useContext, useEffect, useState } from 'react'
import GuitarContext from '../../context/guitars/GuitarContext'
import PaypalButton from '../Paypal/PaypalButton'

export default function GuitarList() {
	// A. ESTADOS LOCALES
	// NUESTRO ESTADO LOCAL PRINCIPAL.
	const [guitar, setGuitar] = useState({ nombre: '', precio: '' })

	// NUESTRO MODO EDICIÓN. CUANDO EL USUARIO ESTÉ EDITANDO, ESTE LO DEBEREMOS CAMBIAR A TRUE
	const [editMode, setEditMode] = useState(false)

	// NUESTRO ID, EL CUAL LO UTILIZAREMOS EN LA EDICIÓN PARA LA GUITARRA SELECCIONADA
	const [id, setId] = useState(null)
	const [error, setError] = useState(null)

	// B. ESTADO GLOBAL
	// CONTEXTO
	const ctx = useContext(GuitarContext)

	// DATOS VÍA DESESTRUCTURACIÓN DE OBJETOS, CON EL CONTEXTO
	const { guitars, createGuitar, getGuitars, updateGuitar, deleteGuitar } = ctx

	// C. MANEJO ASÍNCRONO DE OBTENCIÓN DE DATOS
	useEffect(() => {
		getGuitars()
	}, [])

	// D. MANEJO DE CAMBIOS EN CADA CAMPO DE LOS FORMULARIOS
	const handleChange = (event) => {
		// CADA VEZ QUE EL USUARIO CAMBIE UN DATO DEL CAMPO DE TEXTO, DEBEREMOS CAMBIAR EL VALOR DEL ESTADO LOCAL.
		setGuitar({
			...guitar,
			[event.target.name]: event.target.value,
		})
	}

	// E. ENVÍO DE EVENTOS A NUESTRO ESTADO GLOBAL, LOS CUALES SE EJECUTAN CUANDO EL USUARIO PRESIONA UN BOTÓN ESPECÍFICO
	const sendDataToCreateGuitar = (event) => {
		event.preventDefault() // DETIENE LA RECARGA AUTOMÁTICA DE LA PÁGINA

		// VALIDACIÓN DE FORMULARIO. NO PUEDE QUEDAR VACÍO
		if (!guitar.nombre.trim() || !guitar.precio.trim()) {
			// SI HUBO ERROR, GENERAR UN MENSAJE AL USUARIO
			return setError('Debes llenar todos los campos de texto')
		}

		createGuitar(guitar) // CREAMOS GUITARRA HACIA EL SERVIDOR
		setError(null) // SI HUBO UN ERROR, BORRARLO NUEVAMENTE
	}

	const sendDataToUpdateGuitar = (event) => {
		event.preventDefault() // DETIENE LA RECARGA AUTOMÁTICA DE LA PÁGINA

		// VALIDACIÓN DE FORMULARIO
		if (!guitar.nombre.trim() || !guitar.precio.trim()) {
			return setError('Debes llenar todos los campos de texto')
		}

		updateGuitar(id, guitar) // ACTUALIZAMOS GUITARRA AL SERVIDOR

		setId(null) // ID A NULO
		setGuitar({ nombre: '', precio: '' }) // MANEJO DE ESTADO LOCAL A VACÍO
		setEditMode(false) // CAMBIAMOS EL MODO EDICIÓN A FALSO
		setError(null) // SI HUBO UN ERROR, BORRAR EL MENSAJE NUEVAMENTE
	}

	const sendDataToDeleteGuitar = (element) => {
		deleteGuitar(element._id) // ELIMINA GUITARRA HACIA EL SERVIDOR
	}

	const activateEditMode = (element) => {
		console.log('element :', element)
		setEditMode(true) // ACTIVAMOS MODO EDICIÓN
		setId(element._id) // ESTABLECEMOS EL ID DEL ELEMENTO SELECCIONADO

		// ESTABLECEMOS EL VALOR HACIA EL ESTADO LOCAL
		setGuitar({
			nombre: element.nombre,
			precio: element.precio,
		})
	}

	return (
		<div>
			{/* TÍTULO (DEPENDIENDO DEL MODO EN EL QUE ESTEMOS) */}
			<h1>{editMode ? 'Edita guitarra' : 'Crea una guitarra'}</h1>
			{/* NUESTRO FORMULARIO */}
			<form onSubmit={editMode ? (e) => sendDataToUpdateGuitar(e) : (e) => sendDataToCreateGuitar(e)}>
				<h2>Escribe el nombre de la guitarra</h2>
				<input name='nombre' onChange={(e) => handleChange(e)} value={guitar.nombre} />

				<h2>Escribe el precio</h2>
				<input name='precio' onChange={(e) => handleChange(e)} value={guitar.precio} type='number' />

				<button type='submit'>{editMode ? 'Editar guitarra' : 'Crear guitarra'}</button>
			</form>
			{error ? error : null}

			<h1>Lista de Guitarras</h1>
			{/* DATOS */}
			{guitars.map((elem) => {
				return (
					<div key={elem._id}>
						<h2>{elem.nombre}</h2>
						<p>Precio: ${elem.precio}</p>
						<PaypalButton total={elem.precio} />
						<button onClick={(evt) => activateEditMode(elem)}>Editar</button>
						<button onClick={(evt) => sendDataToDeleteGuitar(elem)}>Borrar</button>
					</div>
				)
			})}
		</div>
	)
}
