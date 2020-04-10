<template>
	<article class="task"	:style="{'border-color': task.tag.color}"
		@click="edit(task._id)">
		<!-- @touchstart="optionsStart" -->
		<!-- @touchmove.prevent="swypeOptions" -->
		
		<span class="title">
			{{task.title}}
		</span>
		
		<span v-if="task.time.length > 0" class="time">{{task.time}}hs</span>
		
		<p v-if="task.description.length > 0" class="description">
			{{task.description}}
		</p>

		<!-- <div class="options"
			:class="{'show-options': options}">
			<button @click="edit()">
				<edit-icon></edit-icon>
				<span>Editar</span>
			</button>
			<button @click="removeTask()">
				<cross></cross>
				<span>Borrar</span>
			</button>
		</div> -->
	</article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

// Icons
// import cross from '@/components/icons/cross.vue'
// import arrow from '@/components/icons/arrow.vue'
// import edit from '@/components/icons/edit.vue'

interface Task {
	title: string,
	description: string,
	tag: object,
	time: string
}

export default Vue.extend({
	components: {
		// Icons
		// cross,
		// arrow,
		// 'edit-icon': edit
	},
	props: {
		content: {
			type: Object,
			required: true
		} as PropOptions<Task>,

		// List index for remove()
		index: {
			type: Number,
			required: true
		}
	},
	beforeMount() {
		this.loadTask(this.task, this.content)
	},
	data() {
		return {
			task: {
				title: '',
				description: '',
				tag: {},
				time: ''
			} as PropOptions<Task>,

			// touches: {
			// 	start: 0
			// } as any,

			// options: false as boolean
		}
	},
	methods: {
		loadTask(target: object, content: object): void {
			Object.assign(target, content)
		},

		edit(id: string): void {
			this.$store.commit('task/setForEdition', id)
      this.$store.commit('modal/open', 'task')
		},

		// removeTask(): void {
		// 	this.$store.commit('task/deleteOne', this.index)
		// 	// this.$axios.$put(`${this.url}/disable-task/${this.task._id}`)
		// 	console.log('Remove task');
		// }


		// Touch events
		// optionsStart(): void {
		// 	const ev: any = event
		// 	this.touches.start = ev.touches[0].clientY
		// },
		// swypeOptions(): void {
		// 	const ev: any = event
		// 	let position: number = ev.touches[0].clientY
		// 	let swype: number = position - this.touches.start
		// 	if (swype > 20) {
		// 		this.options = true
		// 	} else if (swype < 20) {
		// 		this.options = false
		// 	}
		// },
	}
})
</script>

<style lang="scss" scoped>
article.task {
	width: 100%;
	min-height: 3rem;
	margin: .25rem auto;
	padding: 1rem;
	background: $line;
	border-left: .5rem solid $secondary;
	color: $primary;
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	border-radius: $radius;
	position: relative;
	animation: task-in .2s ease-in;
}

span.title {
	flex: 0 1 auto;
	margin-right: 1rem;
	// margin-bottom: .25rem;
	font-weight: 700;
}

span.time {
	flex: 0 1 auto;
	margin-right: 1rem;
	font-size: 1rem;
	font-weight: 600;
}

p.description {
	flex: 1 1 auto;
	font-size: 1rem;
	overflow-wrap: break-word;
	color: $light;
}

// .complete {
// 	text-decoration: line-through;
// 	opacity: .4;
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
		color: $primary;
	}
}

div.show-options {
	height: 1.5rem;
	margin-bottom: 0.5rem;
}


@keyframes task-in {
  0% {
    transform: scaleY(.6);
    transform: scaleX(.95);
    opacity: .2;
  }
  100% {
    transform: scaleY(1);
    transform: scaleX(1);
    opacity: 1;
  }
}
</style>