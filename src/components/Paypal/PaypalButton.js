import React from 'react'
import PaypalExpressBtn from 'react-paypal-express-checkout'

export default class PaypalButton extends React.Component {
	render() {
		const onSuccess = (payment) => {
			// Congratulation, it came here means everything's fine!
			console.log('The payment was succeeded!', payment)
			// You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
		}

		const onCancel = (data) => {
			// User pressed "cancel" or close Paypal's popup!
			console.log('The payment was cancelled!', data)
			// You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
		}

		const onError = (err) => {
			// The main Paypal's script cannot be loaded or somethings block the loading of that script!
			console.log('Error!', err)
			// Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
			// => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
		}

		let env = 'sandbox' // you can set here to 'production' for production
		let currency = 'USD' // or you can set this value from your props or state
		let total = this.props.total // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
		// Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

		const client = {
			sandbox: 'AUX67P2S3i88iJAXCbaUYdc_o6EQS_RYW7_KhKsZPWrxaj7uH9tYL-lNv9yllzBoVnM3a8iQyTujsB-K',
			production: 'YOUR-PRODUCTION-APP-ID',
		}

		// NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
		return <PaypalExpressBtn env={env} client={client} currency={currency} total={total} onError={onError} onSuccess={onSuccess} onCancel={onCancel} />
	}
}
