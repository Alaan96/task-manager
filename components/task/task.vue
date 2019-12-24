<template>
  <div>
		<task-form v-if="form"
			v-model="task">
		</task-form>

		<article v-else
			class="task"
			:class="{'urgent': task.urgent}">

			<!-- Title -->
			<div 
				class="title">
				{{task.title}}
			</div>
			
			<!-- Description -->
			<div v-if="task.description" 
				class="description">
				{{task.description}}
			</div>

			<!-- List -->
			<div v-if="task.list"
				class="list">
				<span v-if="task.list.title.length > 0">{{task.list.title}}</span>
				<ul>
					<li v-for="(item, index) in task.list.items"
						:key="`${index}-${item.text}`"
						:class="{complete: item.complete}">
						<input type="checkbox" 
							:id="`${index}-${item.text}`"
							v-model="item.complete">
						<label :for="`${index}-${item.text}`">{{item.text}}</label>
					</li>
				</ul>
			</div>

			<!-- Important -->
			<div class="important">
				!
			</div>

			<!-- Time -->
			<div v-if="task.time.initial.active || task.time.final.active"
				class="time">
				<span>Horario: {{task.time.initial.hour}}hs - {{task.time.final.hour}}hs.</span>
			</div>

			<!-- Date -->
			<div v-if="task.date.active"
				class="date">
				{{task.date.string}}	
			</div>

		</article>
  </div>
</template>

<script>
import taskForm from './task-form'

import simpleBtn from '@/components/simple-button'
import tags from '@/components/tags'

// Icons
import cross from '@/components/icons/cross'
import arrow from '@/components/icons/arrow'

export default {
	components: {
		'task-form': taskForm,

		'simple-button': simpleBtn,
		tags,
		
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
							complete: false
						},
						{
							text: 'Item 2',
							complete: false
						},
						{
							text: 'Item 3',
							complete: false
						},
					],

				},
				important: false,
				urgent: true,
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
				date: {
					string: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
					active: true
				},
				tags: []
			},
			
			// active: false,

			// newTag: {
			// 	tag: 'Nueva etiqueta',
			// 	color: ''
			// }
		}
	},
	props: {
		form: {
			type: Boolean
		}
	}
}
</script>

<style lang="scss" scoped>
.task {
	width: 100%;
	min-height: 3rem;
	margin: .5rem auto;
	padding-left: 1.5rem;
	padding-right: 1rem;
	background: $line;
	border-left: .5rem solid $secondary;
	color: $primary;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	border-radius: .5rem;
	position: relative;

	& > * {
		margin-bottom: .5rem;
	}
	
	& .title {
		width: 100%;
		min-height: 3rem;
		margin: 0;
		display: flex;
		align-items: center;
		font-weight: 700;
	}

	& .description {
		font-size: .75rem;
	}

	& .list {
		width: 100%;
		margin-top: .5rem;
		& span {
			font-weight: 700;
		}
		& ul {
			width: 100%;
			display: flex;
			flex-direction: column;
			& li {
				flex: 0 1 2.5rem;
				padding: 0 1rem;
				margin-bottom: .25rem;
				border-radius: .25rem;
				display: flex;
				align-items: center;
				background: $line;
				font-size: .75rem;
				& input {
					display: none;
				}
				& label {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.important {
		width: 1.3rem;
		height: 1.3rem;
		margin: 0;
		@include center;
		position: absolute;
		top: 0;
		right: 0;
		background: $secondary;
		border-radius: 0 .5rem 0 .5rem;
	}

	.time {
		font-size: .75rem;
	}


}

.complete {
	text-decoration: line-through;
	opacity: .4;
}

.urgent {
	box-shadow: 0 0 .75rem transparentize($cancel, .6);
}
</style>