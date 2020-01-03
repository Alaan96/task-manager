<template>
	<div class="credentials">
		<input 
			:type="type"
			:name="name"
			:pattern="pattern"
			:placeholder="placeholder"
			autocomplete="off"
			@keyup="validate(value[name], pattern)"
			v-model.trim="value[name]"/>
	</div>
</template>

<script>
	export default {
		methods: {
			// Validate with regexp
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
		},
		props: {
			placeholder: {
				type: String,
				required: false
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
			type: {
				type: String,
				required: true
			},
			// V-model object must be declare in parent data()
			value: {
				type: Object
			},
			storeModule: {
				type: String,
				required: false
			}
		}
	}
</script>

<style lang="scss" scoped>
.credentials {
	margin-bottom: 1.5rem;
	position: relative;
	// opacity: .6;

	& input {
		width: 100%;
		height: 2rem;
		padding: 0 1rem;
		background: transparent;
		color: $light;
		border: 1px solid $line;
		border-radius: 1rem;

		&:focus {
    	color: $primary;
		}
		&:invalid {
			border-color: $cancel;
		}
	}
}

::-webkit-input-placeholder {
  color: $light;
}
// :-moz-placeholder {
//    color: $light;
//    opacity: 1 /* esto es porque Firefox le reduce la opacidad por defecto */;
// }
// ::-moz-placeholder {
//    color: $light;
//    opacity:  1;
// }
// :-ms-input-placeholder {
//    color: $light;
// }
</style>