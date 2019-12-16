<template>
	<!-- File -->
	<div class="field-container" v-if="type === 'file'">
		<div class="label-section">
			<label :for="name" class="light-text">{{title}}</label>
			<span
				v-if="imageExist(value[name])"
				class="small-text"
				@click="previewActive = !previewActive">
				Vista previa
			</span>
		</div>
		<div v-if="previewActive" class="preview" ref="prev">
			<img :src="value[name]">
		</div>
		<div class="field" :class="{'focus': focus}" :data-type="type">
			<input 
				type="text"
				:name="name + '-text'"
				:placeholder="placeholder"
				v-model.trim="value[name]"
				:ref="name"
				@focus="focus = true"
				@blur="focus = false"
				@keyup="validate(value[name], pattern)">		
				
			<div>
				<label :for="name" class="light-text">Cambiar</label>
				<input
					:type="type"
					:id="name"
					:name="name"
					ref="image"
					@change="fileChange()">
			</div>
		</div>
	</div>
	
	<!-- Select -->
	<!-- <div class="field-container" v-else-if="element === 'select'">
		<label :for="name" class="light-text">{{title}}</label>
		<div class="field" :class="{'focus': focus}">
			<select
				:name="name"
				:placeholder="placeholder">
					<option
						v-for="option in selectOptions"
						:keys="option.name"
						:value="option.value">
						{{option.name}}
					</option>
			</select>
		</div>
	</div> -->

	<!-- Textarea -->
	<div class="field-container" v-else-if="element === 'textarea'">
		<label :for="name" class="light-text">{{title}}</label>
		<div class="field" :class="{'focus': focus}">
			<textarea 
				:name="name"
				:placeholder="placeholder"
				@focus="focus = true"
				@blur="focus = false"
				v-model.trim="value[name]"
				@keyup="validate(value[name], pattern)">
			</textarea>
		</div>
	</div>
	
	<!-- Input -->
	<div class="field-container" v-else>
		<label :for="name" class="light-text">{{title}}</label>
		<div class="field" :class="{'focus': focus}">
				<input
				:type="type"
				:name="name"
				:placeholder="placeholder"
				:readonly="readonly"
				@focus="focus = true"
				@blur="focus = false"
				v-model.trim="value[name]"
				@keyup="validate(value[name], pattern)">	
			<div>
				<i v-if="onWarning">!</i>
			</div>
		</div>
	</div>
</template>


<script>
	// import gallery from '@/components/gallery'
	
	export default {
		data() {
			return {
				valid: false,
				warning: false,
				focus: false,
				
				imagePreview: '',
				previewActive: false
			}
		},
		methods: {
			validate(value, pattern, flag = 'g') {
				if (value && pattern) {
					let regex = RegExp(pattern, flag)
					if(regex.test(value)) {
						console.log('Valid')
						this.warning = false
						this.valid = true
						this.$store.commit('form/addValidField', this.name)
					} else {
						console.log('Invalid')
						this.warning = true
						this.valid = false
						this.$store.commit('form/removeInvalidField', this.name)
					}
				}
			},
			// Conditional to show preview-image
			imageExist(url) {
				if (typeof url === 'string' && url.length >= 2) {
					return true
				} else {
					console.log('No se ha podido cargar la imagen')
					return false
				}
			},
			
			// Emit a custom event to change "this.values" in parent form
			fileChange() {
				// Reference of the file
				let file = this.$refs.image.files[0]
				console.log(this.$refs)
				
				// Instance of FileReader
				let reader = new FileReader()
				
				// Read the file
				reader.readAsDataURL(file)
				
				reader.onload = () => {
				
				// Assign the image to the property when the reader is loaded
					this.value[this.name] = reader.result
				}
				reader.onerror = error => console.log(error)
				
				
				this.$emit('imageChanged', {field: this.name, image: file.name})
				this.$refs[this.name].focus()
			},
			
//			openGallery() {
//				
//			}
		},
		computed: {
			onWarning() {
				// Campo inválido con foco
				if (this.warning === true && this.focus === true && this.value[this.name].length >= 1) {
					return true
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
			selectOptions() {
				if (typeof this.options === 'string') {
					return this.$store.getters[this.options]
				} else if (typeof this.options === 'object') {
					return this.options
				} else {
					console.log('No se han podido cargar los valores del select')
				}
			}
		},
		created() {
			if (typeof this.pattern === 'undefined') {
					this.$store.commit('form/addValidField', this.name)
			}
		},
		props: {
			placeholder: {
				type: String,
				required: true,
				default: ''
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
			type: {
				type: String,
				required: false,
				default: 'text'
			},
			element: {
				type: String,
				default: 'input'
			},
			// Regular expression to validate the field
			pattern: {
				type: String
			},
			options: {
				type: [Array, String],
				required: false
			},
			readonly: {
				type: Boolean,
				requred: false,
				default: false
			},
			// V-model object must be declare in parent data()
			value: {
				type: Object
			},
		},
		components: {
			// gallery
		}
	}
</script>


<style lang="scss" scoped>
	.field-container {
		max-width: 100%;
		
		& .label-section {
			width: 100%;
			padding-right: 1rem;
			display: flex;
			justify-content: space-between;
			
			& span {
				cursor: pointer;
			}
		}
	}
	.field {
		min-height: 2rem;
		margin-bottom: .5rem;
		display: grid;
		grid-template-columns: 1fr 2rem;
		align-items: center;
		// background: $secondary;
		// color: $tertiary;
		// border: 1px solid $line;
		border-radius: .25rem;
		opacity: .7;
		
		&:last-child {
			margin: 0;
		}
		
		& input, textarea, select {
			width: 100%;
			height: 100%;
			font-size: 1rem;
			// font-family: $niramit;
			background: transparent;
			border: none;
			
			&:focus {
				outline: none;
			}
		}
		
		& input {
			padding-left: 1rem;
			
			&[name="products"] {
/*				grid-column: span 2;*/
			}
		}
		
		& textarea {
			height: 8rem;
			padding: .5rem 1rem;
			grid-column: span 2;
		}
		
		& select {
			grid-column: span 2;
		}
		
		& i {
			width: 1.4em;
			height: 1.4em;
			font-style: normal;
			display: flex;
			justify-content: center;
			align-items: center;
			// color: $cancel;
			// border: 1px solid transparentize($cancel, .5);
			border-radius: 1rem;
		}
		
		& .gallery-btn {
			width: 1.4em;
			height: 1.4em;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 1.1rem;
			// color: $accent;
			// background: $primary;
/*			border: 1px solid transparentize($cancel, .5);*/
			border-radius: 1rem;
		}
		
		// If input[type=file]
		&[data-type="file"] {
			grid-template-columns: 1fr 4rem;
			grid-gap: 1rem;
			
			& input[type="file"] {
				display: none;
			}
		}
	}
	
	.preview {
		width: 100%;
		height: 8rem;
		margin-bottom: .5rem;
		// border: 1px solid $line;
		border-radius: .25rem;
		
		& canvas {
			width: 100%;
			height: 100%;
		}
		
		& img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	
	.focus {
		// border: 1px solid $accent;
		// box-shadow: 0 .2rem .5rem transparentize($accent, .7);
		opacity: 1;
	}
</style>