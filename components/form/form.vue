<template>
	<div class="form-container">
		<h3 class="light-text" v-if="title">{{title}}</h3>
		<form @submit.prevent="submit"
			:class="{container}">
			<field
				v-for="(field, index) in formFields"
				:key="field.name"
				:name="field.name"
				:placeholder="field.placeholder"
				:title="field.title"
				:type="field.type"
				:pattern="field.pattern"
				:element="field.element"
				:options="field.options"
				:readonly="field.readonly"
				v-model="values"
				@imagedChange="fileChange($event)">
			</field>
			<simple-button
				text="Enviar"
				fullWidth
				cta>
			</simple-button>
		</form>
	</div>
</template>


<script>
	import field from '@/components/form/field'
	// import simpleButton from '@/components/buttons/simple-button'
	
	// import url from '@/assets/url'
	
	export default {
		data() {
			return {				
				values: {}
			}
		},
		methods: {
			submit() {
				if (this.validate) {
					// Validar campos
					let fields = Object.keys(this.values).length
					let validFields = this.$store.getters[this.validateFrom].length
					
					const validated = this.validateFields(fields, validFields)
					if (validated) {
						this.sendForm()
					}
				} else {
					// Enviar formulario
					this.sendForm()
				}
			},
			
			validateFields(fields, validFields) {
				if (fields === validFields) {
					console.log('Validación correcta.')
					return true
				} else {
					// Alert
					console.log('Hay campos inválidos en el formulario.')
					return false
				}
			},
			
			sendForm() {
				// Enviar formulario
				console.log('Enviando el formulario')
				if (this.method) {
					console.log('Store method')
					this.$store.commit(this.method, this.values)
				} else {
					console.log('Axios method')
					this.$axios.$post('http://localhost:3000/send', this.values)
						.then(res => console.log(res))
						.catch(error => console.log(error))
				}
				this.refillForm()
			},
			
			fileChange(param) {
				this.$store.commit(`${this.storeModule}/changeSingleProperty`, 													 {prop: param.field, content: param.image})
				this.refillForm()
			},
			
			refillForm() {
				let content = this.$store.getters[this.completeFrom]
				if (content) {
					Object.assign(this.values, content)
				} else {
					console.log('No se ha podido encontrar la fuente para rellenar el formulario.')
				}
			}
		},
		computed: {
			formFields() {
				if (typeof this.fields === 'object') {
					return this.fields
				} else if (typeof this.fields === 'string') {
					return this.$store.getters[this.fields]
				} else {
					console.log('No se han podido encontrar los campos')
				}
			}
		},
		created() {
			let fields = this.formFields
			fields.forEach( field => {
				Object.defineProperty(this.values, field.name, {
					enumerable: true,
					writable: true,
					value: ''
				})
			})
			
			if (this.getExternalValue) {
				this.values[this.getExternalValue[0]] = this.$store.getters[this.getExternalValue[1]]
			}
			
			this.refillForm()
		},
		props: {
			title: {
				type: String,
				required: false
			},
			// Form fields [ Array for binding prop, String for store ]
			fields: {
				type: [Array, String],
				required: true
			},
			validate: {
				type: Boolean,
				required: false,
				default: true
			},
			validateFrom: {
				type: String,
				required: false
			},
			method: {
				type: String,
				required: false
			},
			container: {
				type: Boolean
			},
			storeModule: {
				type: String,
				required: false,
				default: 'form'
			},
			completeFrom: {
				type: String,
				required: false
			},
			getExternalValue: {
				type: Array,
				required: false
			}
		},
		components: {
			field,
			// simpleButton
		}
	}
</script>


<style lang="scss" scoped>	
	.form-container {
		margin: 0 1rem;
		padding: 1rem 0;
		
		& h3 {
			margin: .2rem 1rem;
		}
		
		& form {
			width: 100%;
			padding: 1rem 2rem 1.5rem 2rem;
			display: grid;
			grid-auto-rows: min-content;
			grid-gap: 1rem;
			
			& button {
				max-width: 20rem;
				opacity: .8;
			}
		}
	}
	
	.ready {
		opacity: 1;
	}
	
	.container {
		padding: 1rem;
		// background: $secondary;
		border-radius: 1rem;
	}
</style>