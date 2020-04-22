<template>
	<form @submit.prevent="send()">
    <span v-if="title">{{title}}</span>
    <text-field
      v-for="field in fields"
      :key="field.name"
      :name="field.name"
      :placeholder="field.placeholder"
      :pattern="field.pattern"
      :type="field.type"
      v-model="values[field.name]"
      @keyup.native="validateInputs(field.name, values[field.name], field.pattern)">
    </text-field>

		<slot name="options"></slot>

    <div class="buttons">
      <btn :text="button"></btn>
			<slot></slot>

			<btn text="Acceder como invitado" simple color="#D8D8D8"
				class="guest-access"
				@click.native="guestAccess()" />
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import textField from '@/components/inputs/text-field.vue'
import btn from '@/components/buttons/button.vue'

export default Vue.extend({
	components: {
		'text-field': textField,
		btn
	},
	props: {
		title: {
			type: String,
			required: false
		},
		fields: {
			type: Array,
			required: true
		},
		button: {
			type: String,
			required: true
		},
		endpoint: {
			type: String,
			required: true
		},
		params: {
			type: String,
			required: false,
			default: ''
		}
	},
	created() {
		this.setFormFields(this.fields, this.values, this.validated)
	},
	data() {
		return {
			values: {} as object,
			validated: {} as any
		}
	},
	// mixins: [helpers],
	methods: {
		setFormFields(fields: any[], form: object, validated: object): void {
			if (form && fields) {
				fields.forEach( field => {
					Object.defineProperty(form, field.name, {
						enumerable: true,
						writable: true,
						value: ''
					})
					Object.defineProperty(validated, field.name, {
						enumerable: true,
						writable: true,
						value: false
					})
				})
			}
		},
		validateInputs(name: string, value: string, pattern: string, flag: string = 'g'): void {
      if (value.length > 3) {
        const regex: RegExp = new RegExp(pattern, flag)
        if(regex.test(value)) {
          this.validated[name] = true
        } else {
          this.validated[name] = false
        }
      }
		},
		validateData(data: any): boolean {
      const inputs: boolean[] = Object.values(data)
      const validated: boolean = inputs.every( (input) => input === true )
      if (validated) {
        return true
      } else {
        return false
      }
    },
	  send(): any {
      const validation: boolean = this.validateData(this.validated)
      if (validation) {
        console.log('Sending...')
        this.$axios.$post(`${location.origin}/${this.endpoint}`, this.values)
          .then( res => this.$emit('send', res))
          .catch( err => this.error(err))
      }
		},
		error(err: any): void {
			if (err) {
				if (err.response.data) {
					console.log(err.response.data)
				} else {
					console.log(err)
				}
			}
		},
		guestAccess(): void {
			console.log('Proximamente accederás como invitado.');
		}
		// 'password-reset'(res) {
		// 	console.log(res)
		// 	localStorage.setItem('pass-token', res.passToken)
		// },
		// 'new-password'(res) {
		// 	console.log(res)
		// 	localStorage.removeItem('pass-token')
		// 	console.log('New password set.')
		// 	this.$router.push('/login')
		// },
		// 'set-birthday'(res) {
		// 	console.log(res)
		// },
	},
})
</script>

<style lang="scss" scoped>
	form {
    width: 100%;
    max-width: 16rem;
    margin: 0 auto;
  }

	input[type="text"], input[type="email"], input[type="password"] {
		margin-bottom: 1rem;
	}

  span {
    margin-bottom: .5rem;
    display: block;
    font-size: .75rem;
    font-weight: 600;
  }

  div.buttons {
    margin-bottom: 2rem;
    display: flex;
    flex-direction: column;
		align-items: center;
		& * {
			margin-bottom: 1.5rem;
		}
		& .guest-access {
			margin-top: 1rem;
		}
  }
</style>