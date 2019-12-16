<template>
  <div>

		<div class="container" :class="{active}">
			<button class="close"
				@click="active = false">
				<cross :size="16" :strokeWidth="1"></cross>
			</button>

			<form @submit.prevent
				@click="active = true">
				
				
				<!-- Title -->
				<div class="task-field">
					<input type="text"
						name="title"
						v-model="task.title"
						@click="removePlaceholder('title')">
				</div>
				
				<!-- Description -->
				<div class="task-field">
					<input type="text"
						name="description"
						v-model="task.description">
				</div>
				
				<!-- List -->
				<list-field
					class="task-field"
					v-model="task.list">
				</list-field>


				<div class="priority">
					<!-- Important -->
					<button
						class="toggle"
						:class="{'btn-active': task.important}">
						Importante
					</button>

					<!-- Urgent -->
					<button
						class="toggle"
						:class="{'btn-active': task.urgent}">
						Urgente
					</button>
				</div>

				<section>
					<div class="time">
						<!-- Hours -->
						<div class="initial">
							<input type="text"
								v-model="task.time.initial.hour">
							<simple-button
								:text="['Desactivar', 'Activar']"
								:condition="task.time.initial.active"
								:fontSize=".5">
							</simple-button>
						</div>
						<span>a</span>
						<div class="final">
							<input type="text"
								v-model="task.time.final.hour">
							<simple-button
							:text="['Desactivar', 'Activar']"
							:condition="task.time.final.active"
							:fontSize=".5">
						</simple-button>
						</div>
					</div>
	
					<div class="time">
						<!-- Date -->
						<div>
							<input type="text"
								class="date"
								v-model="task.date">
							<simple-button
								text="Usar calendario"
								:fontSize=".5">
							</simple-button>
						</div>
					</div>
				</section>

				<!-- Tags -->
				<section class="tags">
					<div class="new-tag">
						<input type="text"
							v-model="newTag.tag">
						<simple-button
							text="cambiar color"
							:fontSize=".5">
						</simple-button>
						<cross rotate></cross>
					</div>
				</section>

			</form>
		</div>

  	
		<!-- <div class="active task">
			<div class="task-field">
				{{task.title}}
  	  </div>
  	  
  	  <div class="task-field">
				{{task.description}}
  	  </div>
		</div> -->
  </div>
</template>

<script>
import listField from '@/components/list-field'
import simpleBtn from '@/components/simple-button'

// Icons
import cross from '@/components/icons/cross'
import arrow from '@/components/icons/arrow'

export default {
	components: {
		'list-field': listField,
		'simple-button': simpleBtn,
		
		cross, // Icon
		arrow // Icon
	},
	data() {
		return {
			task: {
				title: 'Agregar nueva tarea o evento...',
				description: 'Detalle de la tarea',
				list: {
					title: 'Lista',
					items: [
						{
							text: 'Item 1',
						},
					]
				},
				important: false,
				urgent: false,
				time: {
					initial: {
						hour: '09:00',
						active: true
					},
					final: {
						hour: '13:00',
						active: true
					}
				},
				date: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
				tags: []
			},
			
			active: false,

			newTag: {
				tag: 'Nueva etiqueta',
				color: ''
			}
		}
	},
	methods: {
		removePlaceholder(field) {
			let placeholder = 'Agregar nueva tarea o evento...'
			if (this.task[field] === placeholder) {
				this.task[field] = ''
			}
		}
	},
}
</script>

<style lang="scss" scoped>

$btn-height: 2rem;
$fade: all .4s ease;

.container {
	min-height: 3rem;
	position: relative;
	z-index: 20;
	transition: $fade;

	& button.close {
		
		width: 3.5rem;
		height: $btn-height;
		position: absolute;
		top: -$btn-height;
		right: .5rem;
		font-family: $lato;
		background: $line;
		border-top-left-radius: .5rem;
		border-top-right-radius: .5rem;

		transition: $fade;
		transform: scaleY(0);
		transform-origin: bottom;
		opacity: 0;
		color: $primary;
		z-index: 10;

		&  * {
			width: 20%;
		}
	}
}

form ,.task {
	width: 100%;
	min-height: 3rem;
	margin: .5rem auto 1.5rem auto;
	background: $line;
	border-left: .5rem solid transparent;
	border-radius: .5rem;
	color: $primary;
	display: flex;
	align-items: center;
	flex-direction: column;
	
	padding-top: .1rem;
	height: 3rem;
	overflow-y: hidden;
	
	
	& .task-field {
		width: 90%;
		display: flex;
		justify-content: flex-start;
	}
}

input {
	width: 100%;
	height: 2rem;
	margin-bottom: .5rem;
	padding: 0 1.5rem;

	font-size: .75rem;
	font-family: $niramit;
	background: transparent;
	color: $light;
	border: none;
	border-bottom: 1px solid $line;
	
	&[name="title"] {
		height: 3rem;
		font-size: 1rem;
	}
}

// Important & Urgent
.priority {
	width: 100%;
	margin: 1.5rem 0;
	padding: 0 1rem;
	display: flex;
	justify-content: space-around;
	& button.toggle {
		flex: 0 1 8rem;
		height: 2rem;
		// margin: 0 .75rem;
		@include center;
		font-size: .75rem;
		font-family: $niramit;
		background: transparent;
		color: $line;
		border: 1px solid $line;
		border-radius: .25rem;
	}
}
// @click
button.btn-active {
	opacity: 1;
}

section {
	width: 100%;
	display: flex;
	justify-content: space-around;
}

// Time
.time {
	// width: 50%;
	display: flex;
	align-items: center;
	text-align: center;

	& div {
		margin: 0 .5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		& input {
			width: 3em;
			padding: 0 .2rem;
			font-size: 1rem;
			font-family: $lato;

			&.date {
				width: 6em;
			}
		}
	}
	& span {
		margin-bottom: 1.8rem;
	}
}

.tags {
	width: 100%;
	padding: 0 1.5rem;
	margin: 1.5rem 0;
	& .new-tag {
		width: 100%;
		height: 2rem;
		display: grid;
		grid-template-columns: 1fr max-content 1rem;
		grid-gap: 1.5rem;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid $line;

		& input {
			width: auto;
			padding: 0;
			border: none;
		}

		& svg {
			width: 100%;
		}
	}
}




.active {
	& form {
		height: auto;
		border-left-color: $line;
	}
	& button.close {
		transform: scaleY(1);
		opacity: 1;
	}
}

</style>