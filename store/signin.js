export const state = () => ({
	fields: [
		{
			placeholder: "",
			title: "Nombre",
			name: "signin-name",
			pattern: "^([a-zA-ZáÁéÉíÍóÓúÚñÑ]+)( [a-zA-ZáÁéÉíÍóÓúÚñÑ]+)?$"
		},
		{
			placeholder: "",
			title: "Email",
			name: "signin-email",
			pattern:
				"^([a-zA-ZñÑ0-9.-_]+)@([a-zA-ZñÑ0-9-_]+).([a-z]{2,8})(.[a-z]{2,8})?$"
		},
		{
			placeholder: "",
			title: "Contraseña",
			name: "signin-pass",
			pattern: '^([a-zA-Z0-9 !#$%&() * +,/:;<=>?@^_`|~]{8,30})'
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