<template>
	<input
		:type="type"
		:name="name"
		:placeholder="placeholder"
		:pattern="pattern ? pattern : undefined"
		autocomplete="off"
		v-model.trim="value[name]"/>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	props: {
		name: {
			type: String,
			required: true
		},
		placeholder: {
			type: String,
			required: false
		},
		pattern: {
			type: String,
			required: false
		},
		type: {
			type: String,
			required: false,
			default: 'text'
		},
		// V-model object must be declare in parent data()
		value: {
			type: Object
		},
	},
	inheritAttrs: false
})
</script>

<style lang="scss" scoped>

// input {
// 	width: 100%;
// 	height: 2rem;
// 	padding: .5rem 1rem;
// 	margin-bottom: 1.5rem;
// 	font-size: 1rem;
// 	background: transparent;
// 	color: $primary;
// 	border-bottom: 1px solid $line;
// 	opacity: .8;
// 	transition: .2s ease;

// 	&:last-child {
// 		margin-bottom: 0;
// 	}

// 	&:focus {
// 		border-color: $primary;
// 		opacity: 1;
// 	}
// 	&:invalid {
// 		border-color: $cancel;
// 	}
// }

// ::-webkit-input-placeholder {
//   color: $primary;
// }
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

input:-webkit-autofill {
	font-family: $quicksand !important;
	background-color: $light !important;
	color: $black !important;
	border-radius: .25rem;
}
</style>