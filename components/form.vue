<template>
	<div class="form-container" v-if="fields">
		<span v-if="title" class="label">{{title}}</span>

		<form @submit.prevent>
			<field
				v-for="field in fields"
				:key="field.name"
				:placeholder="field.placeholder"
				:name="field.name"
				:pattern="field.pattern"
				:type="field.type"
				v-model="values"
				:storeModule="storeModule"
				:color="inputColor"
				:validation="validate">
			</field>
			<div class="check-input" v-if="context === 'login'">
				<input type="checkbox" id="keepSession" v-model="keepSession">
				<label for="keepSession">Mantener sessión</label>
			</div>
			<div class="actions">
				<p>{{info}}</p>
				<button @click="submit">{{btnText}}</button>
				<slot></slot>
			</div>
		</form>
	</div>

	<div class="err" v-else>
		<span>
			Prop <b>fields</b> is undefined.
		</span>
	</div>
</template>

<script>
import field from '@/components/field'

 // Mixins
import { notify } from '@/assets/mixins/notify'
import { helpers } from '@/assets/mixins/api-helpers'

export default {
	data() {
		return {
			values: {},
			keepSession: false
		}
	},
	mixins: [notify, helpers],
	methods: {
	  submit() {
	    if (this.validate) {
	      // Validar campos
	      let fields = Object.keys(this.values).length
	      let validFields = this.validFields.length
				
	      const validated = this.validateFields(fields, validFields)
	      if (validated) {
	        this.sendForm()
	      }
	    } else {
	      this.sendForm()
	    }
	  },
		
	  validateFields(fields, validFields) {
	    if (fields === validFields) {
	      console.log('Validación correcta.')
				this.notify('success', 'Validación correcta.')
	      return true
	    } else {
	      console.warn('Hay campos inválidos.')
				this.notify('error', 'Hay campos inválidos.')
	      return false
	    }
	  },
		
	  sendForm() {
	    // Enviar formulario
			console.log('Enviando el formulario')
			// console.log(`${this.url}/${this.context}${this.params}`, this.values);
			this.$axios.$post(`${this.url}/${this.context}${this.params}`, this.values)
				.then( res => this[this.context](res))
				.catch( err => {
					let error = {}
					error = err
					console.warn(error)
					console.warn(error.message)
					this.notify(error.status, error.message)
					if (err.response.data) {
						error = err.response.data
						console.warn(error)
						console.warn(error.message)
						this.notify(error.status, error.message)
					} else {
						error = err
						console.warn(error)
						console.warn(error.message)
						this.notify(error.status, error.message)
					}
				})
		},
		'password-reset'(res) {
			console.log(res)
			localStorage.setItem('pass-token', res.passToken)
		},
		'new-password'(res) {
			console.log(res)
			localStorage.removeItem('pass-token')
			console.log('New password set.')
			this.$router.push('/login')
		},
		'set-birthday'(res) {
			console.log(res)
		},
		login(res) {
			console.log(res)
			if (res.status === 'success') {
				localStorage.setItem('token', res.token)
				localStorage.setItem('id', res.user._id)
				if (this.keepSession) {
					localStorage.setItem('keepSession', this.keepSession)
				}
				this.$store.commit('user/login')
				this.$router.push('/')
			}
		},
		signin(res) {
			if (res.status === 'success') {
				this.$router.push('/login')
			}
		}
	},
	computed: {
		fields() {
			if (this.formFields) {
				return this.formFields
			} else {
				return this.$store.getters[`${this.storeModule}/fields`]
			}
		},
		validFields() {
			return this.$store.getters[`${this.storeModule}/validFields`]
		},
	},
	created() {
		this.fields.forEach( field => {
		  Object.defineProperty(this.values, field.name, {
		    enumerable: true,
		    writable: true,
		    value: ''
		  })
		})
	},
	props: {
		formFields: {
			type: [Array, String]
		},
		context: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: false
		},
		validate: {
			type: Boolean,
			required: false,
			default: true
		},
		// Store module name
		storeModule: {
			type: String,
			required: false
		},
		btnText: {
			type: String,
			required: false
		},
		info: {
			type: String,
			requried: false
		},
		inputColor: {
			type: String
		},
		params: {
			type: String,
			required: false,
			default: ''
		}
	},
	components: {
		field
	}
}
</script>

<style lang="scss" scoped>
.form-container {
	max-width: 14.5rem;
	width: 100%;
	margin: auto;
	// margin: 0 4rem;

	& span {
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	& form {
		width: 100%;

		& .actions {
			width: 100%;
			// padding: 1rem 0;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			& p {
				width: 100%;
				font-size: .875rem;
			}

			& button {
				width: 10rem;
				height: 2rem;
				margin-top: 2rem;
				margin-bottom: 1rem;
				// margin: 2rem 0;
				font-size: 1rem;
				// font-family: $niramit;
				font-weight: 600;
				background: $tertiary;
				color: $primary;
				border-radius: 1rem;
				box-shadow: $shadow;
			}
		}

		.check-input {
			padding: 0 .5rem;
			display: flex;
			align-items: center;
			& label {
				margin-left: .5rem;
				font-size: .875rem;
			}
		}
	}
}

.err {
	width: 100%;
	@include center;
}
</style>