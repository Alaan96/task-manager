<template>
	<article class="task"
		:class="{selected}"
		:style="{'border-color': task.tag.color}">
		
		<div class="task-data" @click="edit(task._id)">
			<span class="title">
				{{task.title}}
			</span>
			
			<span v-if="task.time.length > 0" class="time">{{task.time}}hs</span>
			
			<p v-if="task.description.length > 0" class="description">
				{{task.description}}
			</p>
		</div>

		<div class="task-options">
			<button class="delete-task" v-show="!selected" @click="selectForDelete()">
				<cross></cross>
			</button>

			<div v-show="selected" class="delete-options">
				<btn text="Confirmar" class="confirm" bgColor="#656565" small @click.native="deleteTask(task._id)" />
				<btn text="Cancelar" class="cancel" simple small @click.native="deselect()" />
			</div>
		</div>

	</article>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import btn from "@/components/buttons/button.vue";

import cross from '@/components/icons/cross.vue'

import { Task } from '@/assets/interfaces.ts'

export default Vue.extend({
	components: {
		btn,

		// Icons
		cross,
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
				_id: '',
				title: '',
				description: '',
				tag: {},
				time: '',
				active: true
			} as Task,

			selected: false as boolean
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
		async deleteTask(id: string): Promise<void> {
			try {
				const res = await this.$axios.$put(`${location.origin}/disable-task/${this.task._id}`, )
				this.$store.commit('task/deleteById', this.task._id)
				console.log(res);
			} catch(err) {
				console.log(err);
			}
		},
		selectForDelete(): void {
			this.selected = true
		},
		deselect(): void {
			this.selected = false
		}


		// removeTask(): void {
		// 	this.$store.commit('task/deleteOne', this.index)
		// 	// this.$axios.$put(`${this.url}/disable-task/${this.task._id}`)
		// 	console.log('Remove task');
		// }
	}
})
</script>

<style lang="scss" scoped>
article.task {
	width: 100%;
	min-height: 3rem;
	margin: .25rem auto;
	padding: 1rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
	background: $line;
	border-left: .5rem solid $secondary;
	color: $primary;
	border-radius: $radius;
	animation: task-in .2s ease-in;
	transition: .1s ease;
}

.task-data {
	flex: 85%;
}

.task-options {
	flex: 15%;
	@include center;
	flex-direction: column;
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

button.delete-task {
	width: 1.5rem;
	height: 1.5rem;
}

.delete-options {
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	& .confirm {
		margin-bottom: .25rem;
	}
}

article.selected {
	background: transparentize($cancel, .55);
}

// div.options {
// 	width: 100%;
// 	height: 0;
// 	margin: 0;
// 	display: flex;
// 	justify-content: flex-end;

// 	transition: .2s ease;
// 	overflow: hidden;
// 	& button {
// 		padding: 0 .5rem;
// 		margin-left: .5rem;
// 		@include center;
// 		background: $line;
// 		border-radius: $radius;
// 		opacity: .75;
// 		&:hover {
// 			opacity: 1;
// 		}
// 	}
// 	// & svg {
// 	// 	width: .25rem;
// 	// }
// 	& span {
// 		font-size: .75rem;
// 		color: $primary;
// 	}
// }

// div.show-options {
// 	height: 1.5rem;
// 	margin-bottom: 0.5rem;
// }


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