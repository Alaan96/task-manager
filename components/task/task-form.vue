<template>
  <div class="container" :class="{active}">

    <button class="close"
      @click="active = false">
      <cross :size="16" :strokeWidth="2"></cross>
    </button>

    <!-- Task form -->
    <form @submit.prevent
      @click="active = true">
      
      <!-- Title -->
      <div class="task-field">
        <input type="text"
          name="title"
          v-model="value.title"
          @click="removePlaceholder('title')">
      </div>

      <!-- Description -->
      <div class="task-field">
        <input type="text"
          name="description"
          v-model="value.description">
      </div>
      
      <!-- List -->
      <div class="task-field">
        <header>
          <input type="text"
            name="description"
            v-model="value.list.title">
          <arrow></arrow>
        </header>
        <div
          v-for="(item, index) in value.list.items"
          :key="`Item ${index + 1}`"
          class="items">
          <input type="text"
            v-model="value.list.items[index].text">
          <div>
            <cross rotate></cross>
          </div>
        </div>
        <div class="new-item">
          <span>"Enter para un nuevo item"</span>
        </div>
      </div>

      <section class="priority">
        <!-- Important -->
        <button
          class="toggle"
          :class="{'btn-active': value.important}">
          <label for="task-important">Importante</label>
          <input type="checkbox"
            id="task-important"
            v-model="value.important">
        </button>

        <!-- Urgent -->
        <button
          class="toggle"
          :class="{'btn-active': value.urgent}">
          <label for="task-urgent">Urgente</label>
          <input type="checkbox"
            id="task-urgent"
            v-model="value.urgent">
        </button>
      </section>

      <section>
        <div class="time">
          <!-- Hours -->
          <div class="initial">
            <input type="text"
              v-model="value.time.initial.hour">
            <simple-button
              :text="['Desactivar', 'Activar']"
              :condition="value.time.initial.active"
              :fontSize=".5">
            </simple-button>
          </div>
          <span>a</span>
          <div class="final">
            <input type="text"
              v-model="value.time.final.hour">
            <simple-button
            :text="['Desactivar', 'Activar']"
            :condition="value.time.final.active"
            :fontSize=".5">
          </simple-button>
          </div>
        </div>

        <div class="time">
          <!-- Date -->
          <div>
            <input type="text"
              class="date"
              v-model="value.date">
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
        <tags></tags>
      </section>

      <section class="task-actions">
        <!-- Save -->
        <button @click="saveTask()">
          Guardar
        </button>

        <!-- Discard -->
        <button @click="discardTask()">
          Descartar
        </button>
      </section>



    </form>
  </div>
</template>

<script>
import simpleBtn from '@/components/simple-button'
import tags from '@/components/tags'

// Icons
import cross from '@/components/icons/cross'
import arrow from '@/components/icons/arrow'

export default {
  components: {
		'simple-button': simpleBtn,
		tags,
		
		cross, // Icon
		arrow // Icon
  },
  data() {
		return {
			active: false,

			newTag: {
				tag: 'Nueva etiqueta',
				color: ''
			}
		}
	},
  methods: {
		removePlaceholder(field) {
			// let placeholder = 'Agregar nueva tarea o evento...'
			// if (this.task[field] === placeholder) {
			// 	// this.task[field] = ''
			// }
		}
	},
  props: {
    value: {
      type: Object
    }
  }
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
    @include center;
		position: absolute;
		top: -$btn-height;
		right: .5rem;
		// font-family: $lato;
		background: $line;
		border-top-left-radius: .5rem;
		border-top-right-radius: .5rem;

		transition: $fade;
		transform: scaleY(0);
		transform-origin: bottom;
		opacity: 0;
		color: $primary;
		z-index: 10;

		&  * /* Icon */ {
			width: 30%;
		}
	}
}

form {
  width: 100%;
  padding: 0 .5rem;
	min-height: 3rem;
	margin: .5rem auto 1.5rem auto;
	background: $line;
	border-left: .5rem solid transparent;
	color: $primary;
	display: flex;
	align-items: center;
	flex-direction: column;
	border-radius: .5rem;
	
	padding-top: .1rem;
	height: 3rem;
	overflow-y: hidden;
	
	
	& .task-field {
		width: 100%;
		// display: flex;
    // justify-content: flex-start;
    justify-content: center;
    align-items: center;
    flex-direction: column;
	}
}

input {
	width: 100%;
	min-height: 2rem;
	padding: 0 1rem;

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



// List
header {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;

  & svg {
    width: 1rem;
    position: absolute;
    right: .4rem;
  }
}

.items {
  width: 100%;
  display: grid;
  grid-template-columns: 1rem 1fr 1.5rem;
  grid-gap: 1rem;

  & input {
    height: 2rem;
    padding: 0 .5rem;
    grid-column: 2;
  }

  & div {
    width: 100%;
    height:  2rem;
    @include center;
    border-bottom: 1px solid $line;
    & svg {
      width: 50%;
    }
  }
}

.new-item {
  width: 100%;
  padding-left: 2rem;
  & span {
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    font-size: .75rem;
    font-style: italic;
    color: $line;
    border-bottom: 1px solid $line;
  }
}


@mixin spaced-buttons {
  button {
    flex: 0 1 8rem;
    height: 2rem;
    @include center;
    font-size: .75rem;
    font-family: $niramit;
    background: transparent;
    color: $primary;
    border: 1px solid $primary;
    border-radius: .25rem;
    opacity: 0.4;
  }
}

 
section {
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-around;
}

// Important & Urgent
.priority {
  @include spaced-buttons;
  & label {
    width: 100%;
    height: 100%;
  }
  & input {
    display: none;
  }
}
button.btn-active {
	opacity: 1;
}


// Time
.time {
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
		margin-bottom: 1rem;
	}
}

.tags {
	flex-wrap: wrap;
	& .new-tag {
		width: 100%;
		height: 2rem;
    padding-right: .5rem;
		display: grid;
		grid-template-columns: 1fr max-content 1rem;
		grid-gap: 1.5rem;
		justify-content: center;
		align-items: center;
		border-bottom: 1px solid $line;

		& input {
			width: auto;
			border: none;
		}

		& svg {
			width: 100%;
		}
	}
}

.task-actions {
  margin-bottom: 1.5rem;
	@include spaced-buttons;
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