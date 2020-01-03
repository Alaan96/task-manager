export const state = () => ({
	fields: [
		{
			placeholder: "Nombre",
			name: "name",
			pattern: "^([a-zA-ZáÁéÉíÍóÓúÚñÑ]+)( [a-zA-ZáÁéÉíÍóÓúÚñÑ]+)?$",
			type: 'text'
		},
		{
			placeholder: "Email",
			name: "email",
			pattern:
				"^([a-zA-ZñÑ0-9-\S._]+)@([a-zA-ZñÑ0-9-\S_]+).([a-z]{2,8})(.[a-z]{2,8})?$",
				type: 'email'
		},
		{
			placeholder: "Contraseña",
			name: "password",
			pattern: '^([a-zA-Z0-9-\S!#$%&() * +,/:;<=>?@^_`|~]{8,30})',
			type: 'password'
		}
	],

	validFields: []
})

export const mutations = {
	addValidField(state, field) {
		let index = state.validFields.indexOf(field)
		if (index === -1) {
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