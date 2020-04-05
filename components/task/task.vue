<template>
	<article
		class="task"
		:style="{'border-color': task.tag.color}"
		
		@touchstart="optionsStart"
		@touchmove.prevent="swypeOptions">

		<!-- Date -->
		<!-- <div v-if="task.date.length > 0"
			class="date"
			:style="{'backgroundColor': task.tag.color}">
			<span>
				{{ task.date.slice(0, 2) }}
			</span>
		</div> -->
		
		<!-- Title -->
		<div class="title">
			{{task.title}}
		</div>
		
		<!-- Description -->
		<div v-if="task.description" 
			class="description"
			:class="{'withDate': task.date.length > 0}">
			<p>{{task.description}}</p>
		</div>

		<!-- List -->
		<!-- <div v-if="task.list.items.length > 0"
			class="list">
			<span v-if="task.list.title.length > 0">{{task.list.title}}</span>
			<ul>
				<li v-for="(item, index) in task.list.items"
					:key="`${index}-${item.text}`"
					:class="{complete: item.complete}">
					<input type="checkbox" 
						:id="`${index + 1}-${item.text}`"
						v-model="item.complete">
					<label :for="`${index + 1}-${item.text}`">{{item.text}}</label>
				</li>
			</ul>
		</div> -->

		<!-- Important -->
		<!-- <div v-if="task.important"
			class="important"
			:style="{'backgroundColor': task.tag.color}">
			!
		</div> -->

		<!-- Time -->
		<div v-if="task.time"
			class="time">
			<span>Horario: {{task.time}}hs</span>
		</div>

		<div class="options"
			:class="{'show-options': options}">
			<button @click="edit()">
				<!-- <edit-icon></edit-icon> -->
				<span>Editar</span>
			</button>
			<button @click="removeTask()">
				<!-- <cross></cross> -->
				<span>Borrar</span>
			</button>
		</div>
	</article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import taskForm from './form.vue'

import simpleBtn from '@/components/simple-button.vue'
import tags from '@/components/tags.vue'

// Icons
import cross from '@/components/icons/cross.vue'
import arrow from '@/components/icons/arrow.vue'
import edit from '@/components/icons/edit.vue'

// Mixins
import { helpers } from '@/assets/mixins/api-helpers'

interface Task {
	title: string,
	description: string,
	tag: object,
	time: string
}

export default Vue.extend({
	props: {
		content: {
			type: Object,
			required: false
		} as PropOptions<Task>,
		index: {
			type: Number,
			required: true
		}
	},
	components: {
		'task-form': taskForm,

		'simple-button': simpleBtn,
		tags,
		
		// Icons
		cross,
		arrow,
		'edit-icon': edit
	},
	beforeMount() {
		this.useDBContent(this.task, this.content)
	},
	data() {
		return {
			task: {
				title: '',
				description: '',
				tag: {},
				time: ''
			} as PropOptions<Task>,

			touches: {
				start: 0
			} as any,

			editable: false as boolean,

			options: false as boolean
		}
	},
	methods: {
		useDBContent(target: object, content: object): void {
			Object.assign(target, content)
		},

		optionsStart(): void {
			const ev: any = event
			this.touches.start = ev.touches[0].clientY
		},
		swypeOptions(): void {
			const ev: any = event
			let position: number = ev.touches[0].clientY
			let swype: number = position - this.touches.start
			if (swype > 20) {
				this.options = true
			} else if (swype < 20) {
				this.options = false
			}
		},

		edit(): void {
			this.editable = true
		},
		editionEnds($event: any): void {
			console.log($event)
			this.task = $event
			this.editable = false
			this.options = false
		},

		removeTask(): void {
			this.$store.commit('task/deleteOne', this.index)
			// this.$axios.$put(`${this.url}/disable-task/${this.task._id}`)
			console.log('Remove task');
		}
	},
	mixins: [helpers],
})
</script>

<style lang="scss" scoped>
.task {
	width: 100%;
	min-height: 3rem;
	margin: .5rem auto;
	padding: 0 1rem;
	background: $line;
	border-left: .5rem solid $secondary;
	color: $primary;
	display: flex;
	align-items: flex-start;
	flex-direction: column;
	border-radius: $radius;
	position: relative;
	animation: task-in .6s ease-in;

	& > * {
		margin-bottom: .5rem;
	}
	
	& .title {
		width: 100%;
		min-height: 3rem;
		// height: 2rem;
		margin: 0;
		padding: .5rem 0;
		display: flex;
		align-items: center;
		font-weight: 700;
	}

	& .description {
		width: 100%;
		font-size: .75rem;
		& p {
			overflow-wrap: break-word;
		}
	}

	// & .list {
	// 	width: 100%;
	// 	margin-top: .5rem;
	// 	& span {
	// 		font-weight: 700;
	// 	}
	// 	& ul {
	// 		width: 100%;
	// 		padding: 0 .5rem;
	// 		display: flex;
	// 		flex-direction: column;
	// 		border-left: 1px solid $line;
	// 		& li {
	// 			flex: 0 1 2.5rem;
	// 			padding: 0 1rem;
	// 			margin-bottom: .25rem;
	// 			border-radius: .25rem;
	// 			display: flex;
	// 			align-items: center;
	// 			background: $line;
	// 			font-size: .875rem;
	// 			& input {
	// 				display: none;
	// 			}
	// 			& label {
	// 				width: 100%;
	// 				height: 100%;
	// 			}
	// 		}
	// 	}
	// }

	& .important {
		width: 1.3rem;
		height: 1.3rem;
		margin: 0;
		@include center;
		position: absolute;
		top: 0;
		right: 0;
		background: $secondary;
		font-weight: 700;
		border-radius: 0 $radius 0 $radius;
	}

	// & .time {
	// 	font-size: .75rem;
	// }

	& .date {
		width: 3rem;
		height: 3rem;
		@include center;
		position: absolute;
		top: 0;
		left: -.5rem;
		font-size: 1.25rem;
		// font-family: $lato;
		font-weight: 700;
		text-align: center;
		border-radius: $radius;
		transition: .2s ease;
		& span {
			width: 47%;
			overflow: hidden;
		}
	}

}

// .date.extend-date {
// 	width: 7em;
// 	& span {
// 		width: auto;
// 	}
// }

article.showDate {
	padding-left: 3.5rem;
}

// .complete {
// 	text-decoration: line-through;
// 	opacity: .4;
// }

// .urgent {
	// filter: brightness(150%);
	// background: $light;
	// box-shadow: 0 0 .75rem transparentize($cancel, .6);
// }

div.options {
	width: 100%;
	height: 0;
	margin: 0;
	display: flex;
	justify-content: flex-end;

	transition: .2s ease;
	overflow: hidden;
	& button {
		padding: 0 .5rem;
		margin-left: .5rem;
		@include center;
		background: $line;
		border-radius: $radius;
		opacity: .75;
		&:hover {
			opacity: 1;
		}
	}
	// & svg {
	// 	width: .25rem;
	// }
	& span {
		font-size: .75rem;
		// font-family: $niramit;
		color: $primary;
	}
}

div.show-options {
	height: 1.5rem;
	margin-bottom: 0.5rem;
}


@keyframes task-in {
  0% {
    transform: scaleY(.4);
    transform: scaleX(.8);
    opacity: 0;
  }
  50% {
    transform: scaleY(1.05);
    transform: scaleX(1.02);
  }
  100% {
    transform: scaleY(1);
    transform: scaleX(1);
    opacity: 1;
  }
}
</style>