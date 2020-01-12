<template>
	<div class="login-form" v-if="fields">
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

import { notify } from '@/assets/mixins/notify' // Mixin

export default {
	data() {
		return {
			values: {},
			keepSession: false
		}
	},
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
			this.$axios.$post(`http://localhost:3000/${this.context}${this.params}`, this.values)
				.then( res => this[this.context](res))
				.catch( err => {
					let error = {}
					if (err.response.data) {
						error = err.response.data
						console.log(error)
						console.log(error.message)
						this.notify(error.status, error.message)
					} else {
						error = err
						console.log(error)
						console.log(error.message)
						this.notify(error.status, error.message)
					}
				})
		},
		'password-reset'(res) {
			console.log(res)
			localStorage.setItem('pass-token', res.token)
			console.log(localStorage.getItem('pass-token'))
		},
		'new-password'(res) {
			console.log(res)
			console.log('New password set.')
		},
		login(res) {
			console.log(res)
			if (res.status === 'success') {
				localStorage.setItem('token', res.token)
				localStorage.setItem('id', res.user._id)
				if (this.keepSession) {
					localStorage.setItem('keepSession', this.keepSession)
					this.$store.commit('user/login')
				}
				// this.$store.commit('user/setId', res.user._id)
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
	mixins: [notify],
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
.login-form {
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
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			& p {
				width: 100%;
				font-size: .75rem;
			}

			& button {
				width: 10rem;
				height: 2rem;
				margin: 1rem 0;
				font-size: 1rem;
				font-family: $niramit;
				background: $tertiary;
				color: $primary;
				border-radius: 1rem;
				box-shadow: $shadow;
			}
		}
	}
}

.err {
	width: 100%;
	@include center;
}
</style>