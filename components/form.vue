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
				:storeModule="storeModule">
			</field>
			<div class="buttons">
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
			values: {}
		};
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
			this.$axios.$post(`http://localhost:3000/${this.context}`, this.values)
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
		login(res) {
			console.log(res)
			if (res.status === 'success') {
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
			return this.$store.getters[`${this.storeModule}/fields`]
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
		}
	},
	components: {
		field
	}
}
</script>

<style lang="scss" scoped>
.login-form {
	// width: 100%;
	margin: 0 4rem;

	& span {
		display: inline-block;
		margin-bottom: 0.5rem;
	}

	& form {
		width: 100%;

		& .buttons {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;

			& button {
				width: 10rem;
				height: 2rem;
				margin: 1rem 0;
				font-size: 1rem;
				font-family: $niramit;
				background: $tertiary;
				color: $primary;
				border-radius: 1rem;
				box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
			}
		}
	}
}

.err {
	width: 100%;
	@include center;
}
</style>