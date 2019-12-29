export const state = () => ({
	fields: [
		{
			placeholder: "Email",
			// title: "Email",
			name: "login-email",
			pattern:
				"^([a-zA-ZñÑ0-9.-_]+)@([a-zA-ZñÑ0-9-_]{4,}).([a-z]{2,8})(.[a-z]{2,8})?$"
		},
		{
			placeholder: "Contraseña",
			// title: "Contraseña",
			name: "login-pass",
			pattern: '^([a-zA-Z0-9 !#$%&() * +,/:;<=>?@^_`|~]{8,30})'
		}
	],

	validFields: []
})

export const mutations = {
	addValidField(state, field) {
		let index = state.validFields.indexOf(field)
		if(index === -1) {
			state.validFields.push(field)
		}
	},
	removeInvalidField(state, field) {
		let index = state.validFields.indexOf(field)
		if (index !== -1) {
			state.validFields.splice(index, 1)
		}
	}
}

export const getters = {
	fields(state) {
		return state.fields
	},
	validFields(state) {
		return state.validFields
	},
}