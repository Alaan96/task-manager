<template>
  <div>
  	<form @submit.prevent
  		@click="active = true"
  		:class="{active}">
  		
  		<button class="close">X</button>
  		
  	 	<!-- Title -->
  	  <div class="task-field">
  	  	<input type="text"
  	  		name="title"
  	  		v-model="task.title">
  	  </div>
  	  
  	  <!-- Description -->
  	  <div class="task-field">
  	  	<input type="text"
  	  		name="description"
  	  		v-model="task.description">
  	  </div>
  	  
  	  <div class="task-field">
  	  	<input type="text"
  	  		name="description"
  	  		v-model="task.description">
  	  </div>
  	  
  	</form>
  	
  	
		<div class="active task">
			<div class="task-field">
				{{task.title}}
  	  </div>
  	  
  	  <div class="task-field">
				{{task.description}}
  	  </div>
		</div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        task: {
          title: 'Agregar nueva tarea o evento...',
          description: 'Detalle de la tarea',
          list: {
            title: 'Lista',
            items: [
              {
                item: '',
              }
            ]
          },
          important: false,
          urgent: false,
          time: {
            initial: {
              hour: 9,
              active: true
            },
            final: {
              hour: 13,
              active: true
            }
          },
          date: null,
          tags: []
        },
				
				active: false
      }
    },
  }
</script>

<style lang="scss" scoped>
form ,.task {
	width: 100%;
	min-height: 3rem;
	margin: .5rem auto 1.5rem auto;
	background: $light;
	border-left: .5rem solid transparent;
	border-radius: .5rem;
	color: $primary;
	
	padding-top: .1rem;
	height: 3rem;
	overflow-y: hidden;
	
	position: relative;
	
	& button.close {
		width: 3rem;
		height: 2rem;
		position: absolute;
		top: -2rem;
		right: .5rem;
	}
	
	& .task-field {
		width: 100%;
		@include center;
		flex-direction: column;
	}
	
	& input {
		width: 95%;
		height: 3rem;
		padding: 0 2rem;
		font-size: .75rem;
		font-family: $niramit;
		background: transparent;
		border: none;
		border-bottom: 1px solid $line;
		
		&[name="title"] {
			font-size: 1rem;
		}
	}
	
}


.active {
	height: auto;
	border-left-color: $line;
}
</style>