<template>
	<div 
		@click="onFocus"
		:class="[{'focus': focus}, {'warning': onWarning}]"
		class="credentials">
		<label :for="name" v-if="label === true">{{title}}</label>
		<input 
			type="text"
			:id="name"
			:name="name" 
			:ref="name"
			@focus="onFocus"
			@blur="blur"
			@keyup="validate(value[name], pattern)"
			v-model.trim="value[name]"/>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				label: true,
				valid: false,
				warning: false,
				focus: false,
			}
		},
		methods: {
			validate(value, pattern, flag = 'g') {
				if (value && pattern) {
					let regex = new RegExp(pattern, flag)
					if(regex.test(value)) {
						console.log('Valid')
						this.warning = false
						this.valid = true
						this.$store.commit(`${this.storeModule}/addValidField`, this.name)
					} else {
						console.log('Invalid')
						this.warning = true
						this.valid = false
						this.$store.commit(`${this.storeModule}/removeInvalidField`, this.name)
					}
				}
			},
			onFocus() {
				this.focus = true
				if (this.focus = true) {
					this.label = false
				}
				this.$refs[this.name].focus()
			},
			blur() {
				this.focus = false
				if (this.value[this.name] === '') {
					this.label = true
				}
			}
		},
		computed: {
			onWarning() {
				// Campo inválido con foco
				if (this.warning === true && this.focus === true && this.value[this.name].length >= 1) {
					// return true
					return false
				} else 
				// Campo vacío con foco
				if (this.value[this.name].length === 0 && this.focus === true) {
					return false
				}	else
				// Campo inválido sin foco
				if (this.warning === true && this.focus === false) {
					return true
				}
			},
			// selectOptions() {
			// 	if (typeof this.options === 'string') {
			// 		return this.$store.getters[this.options]
			// 	} else if (typeof this.options === 'object') {
			// 		return this.options
			// 	} else {
			// 		console.log('No se han podido cargar los valores del select')
			// 	}
			// }
		// },
		// created() {
		// 	if (typeof this.pattern === 'undefined') {
		// 			this.$store.commit('form/addValidField', this.name)
		// 	}
		},
		props: {
			placeholder: {
				type: String,
				required: false
			},
			title: {
				type: String,
				required: true
			},
			name: {
				type: String,
				required: true,
				default: 'Campo'
			},
			pattern: {
				type: String,
				required: false
			},
			// type: {
			// 	type: String,
			// 	required: false,
			// 	default: 'text'
			// },
			// element: {
			// 	type: String,
			// 	default: 'input'
			// },
			// options: {
			// 	type: [Array, String],
			// 	required: false
			// },
			// readonly: {
			// 	type: Boolean,
			// 	requred: false,
			// 	default: false
			// },
			// V-model object must be declare in parent data()
			value: {
				type: Object
			},
			storeModule: {
				type: String,
				required: false
			}
		},
		components: {

		}
	}
</script>

<style lang="scss" scoped>
.credentials {
	margin-bottom: 1.5rem;
	position: relative;
	opacity: .6;

	& label {
		position: absolute;
		top: .1rem;
		left: 1rem;
	}

	& input {
		width: 100%;
		height: 2rem;
		padding: 0 1rem;
		background: transparent;
		color: $primary;
		border: 1px solid $primary;
		border-radius: 1rem;
	}
}

.focus {
	opacity: 1;
}

.warning {
	& input {
		color: $cancel;
		border: 1px solid $cancel;
	}
}
</style>