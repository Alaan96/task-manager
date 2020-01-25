<template>
  <form @submit.prevent
    :class="{active}"
    ref="task-form"
    @click="toggleForm('open')"
    @keyup.enter="saveTask()">
    
    <div class="task-field">
      <input type="text"
        name="title"
        placeholder="Agregar nueva tarea o evento..."
        required
        autocomplete="off"
        ref="task-form-title"
        @invalid.prevent
        v-model="task.title">
    </div>

    <div class="task-field">
      <input type="text"
        name="description"
        placeholder="Detalle de la tarea"
        autocomplete="off"
        v-model="task.description">
    </div>

    <section class="tags">
      <div class="create-tag">
        <span>Etiquetas</span>
        <button @click.prevent="$store.commit('modal/showModal')">Crear etiqueta</button>
      </div>
      <tags list
        @getTag="setTag($event)">
      </tags>

      <tags></tags>
    </section>

    <section class="priority">
      <button
        class="toggle"
        :class="{'btn-active': task.important}">
        <label for="task-important">Importante</label>
        <input type="checkbox"
          id="task-important"
          v-model="task.important">
      </button>

      <button
        class="toggle"
        :class="{'btn-active': task.urgent}">
        <label for="task-urgent">Urgente</label>
        <input type="checkbox"
          id="task-urgent"
          v-model="task.urgent">
      </button>
    </section>

    <!-- <section>
      <div class="time">
        <div class="initial">
          <input type="text"
            autocomplete="off"
            :disabled="!task.time.initial.active"
            v-model="task.time.initial.hour">
          <div class="time-initial-active">
            <label for="initial-hour"
              class="min-text">
              {{ task.time.initial.active ? 'Desactivar' : 'Activar' }}
            </label>
            <input type="checkbox"
              id="initial-hour"
              v-model="task.time.initial.active">
          </div>
        </div>
        <span>a</span>
        <div class="final">
          <input type="text"
            autocomplete="off"
            :disabled="!task.time.final.active"
            v-model="task.time.final.hour">
          <div class="time-final-active">
            <label for="final-hour"
              class="min-text">
              {{ task.time.final.active ? 'Desactivar' : 'Activar' }}
            </label>
            <input type="checkbox"
              id="final-hour"
              v-model="task.time.final.active">
          </div>
        </div>
      </div>

      <div class="time">
        <div>
          <input type="text"
            class="date"
            :disabled="!task.date.active"
            v-model="task.date.text">
          <div>
            <label for="date-active"
              class="min-text">
              {{ task.date.active ? 'Desactivar fecha' : 'Activar fecha' }}
            </label>
            <input type="checkbox"
              id="date-active"
              v-model="task.date.active">
          </div>
        </div>
      </div>
    </section>

    <div class="task-field" ref="task-form-list">
      <header>
        <input type="text"
          name="list"
          placeholder="Lista"
          autocomplete="off"
          v-model="task.list.title">
        <arrow></arrow>
      </header>
      <div
        v-for="(item, index) in task.list.items"
        :key="`Item ${index + 1}`"
        class="items">
        <input type="text"
          :placeholder="'Item ' + (index + 1)"
          autocomplete="off"
          v-model="task.list.items[index].text"
          @keyup.enter="addNewItem()">
        <div>
          <cross rotate></cross>
        </div>
      </div>
      <div class="new-item">
        <span @click="addNewItem()">"Enter para un nuevo item"</span>
      </div>
    </div> -->


    <section class="task-actions">
      <action-button
        text="Guardar"
        @click.stop.native="saveTask()">
      </action-button>

      <action-button
        text="Descartar"
        cancel
        @click.stop.native="discardTask()">
      </action-button>
    </section>

  </form>
</template>

<script>
import simpleBtn from '@/components/simple-button'
import tags from '@/components/tags'
import modal from '@/components/modal'
import button from '@/components/buttons/button'

// Mixins
import { helpers } from '@/assets/mixins/api-helpers'

// Icons
import cross from '@/components/icons/cross'
import arrow from '@/components/icons/arrow'

export default {
  components: {
		'simple-button': simpleBtn,
		tags,
		modal,
    'action-button': button,
		
		cross, // Icon
		arrow // Icon
  },
  mixins: [helpers],
  data() {
		return {
      active: false,
      
      task: {
				title: '',
				description: '',
        tag: {},
				important: false,
				urgent: false,
				// time: {
        //   initial: {
        //     hour: '09:00',
				// 		active: false
				// 	},
				// 	final: {
        //     hour: '13:00',
				// 		active: false
				// 	}
				// },
				// date: {
        //   text: `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`,
				// 	active: false
				// },
        // list: {
        //   title: '',
        //   items: [],
        // },
			},

			// newTag: {
			// 	tag: '',
			// 	color: '#66BBD1'
			// }
		}
  },
  methods: {
    setTag($event) {
      this.task.tag = $event
    },
    toggleForm(action) {
      if (action === 'open') {
        if (this.active === false) {
          this.active = true
        }
      } else if (action === 'close') {
        if (this.active === true) {
          this.active = false
        }
      } else {
        this.active = !this.active
      }
      console.log('action', this.active)
    },
		saveTask() {
      let title = this.task.title

      if (typeof title === 'string' && title !== '') {
        this.$axios.$post(`${this.url}/save-task/${localStorage.getItem('id')}`, this.task)
          .then( res => {
            console.log(res)
            this.resetForm()
          })
          .catch( err => {
            console.log(err)
            this.resetForm()
          })
        // this.$emit('saveTask')
        this.toggleForm('close')
        this.$store.dispatch('task/lastSaved', `${this.url}/last-saved/${localStorage.getItem('id')}`)

      } else if (title.length === 0) {
        this.$refs['task-form-title'].classList.add('field-required')
        setTimeout( () => {
          this.$refs['task-form-title'].classList.remove('field-required')
          this.$refs['task-form-title'].focus()
        }, 600 );

      }
    },
    discardTask() {
      // this.$refs['task-form'].reset()
      this.resetForm()
      this.toggleForm('close')
    },

    resetForm() {
      this.task.title = '',
      this.task.description = '',
      this.task.important = false,
      this.task.urgent = false
    },

    // addNewItem() {
    //   this.task.list.items.push({completed: false, text: ''})
    //   let list = Array.from(this.$refs['task-form-list'].querySelectorAll('input'))
    //   let lastInput = list[list.length - 1]
    //   lastInput.focus()
    //   console.log(list)
    //   console.log(list.length)
    //   console.log(lastInput)
    // },


    editContent() {
      if ( this.contentEditable ) {
        console.log(this.contentEditable)
        this.task = this.contentEditable
      }
    }
  },
  beforeMount() {
    // this.editContent()
  },
  props: {
    contentEditable: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>

$btn-height: 2rem;
$fade: .4s ease;

form {
  width: 100%;
  min-height: 3rem;
  padding: 0 1rem;
	margin: .5rem auto;
	background: $line;
	// border-left: .5rem solid transparent;
	color: $primary;
	display: flex;
	align-items: center;
	flex-direction: column;
	border-radius: $radius;
	
	padding-top: .1rem;
	height: 3rem;
	overflow-y: hidden;
	transition: .4s ease;
	
	& .task-field {
		width: 100%;
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

  &:focus {
    color: $primary;
  }
  &:valid {
    color: $primary;
  }
  &:invalid {
    border-color: $light;
  }
  &[disabled] {
    text-decoration: line-through;
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
  margin: .5rem;
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
// .time {
// 	display: flex;
// 	align-items: center;
// 	text-align: center;

// 	& div {
// 		margin: 0 .5rem;
// 		display: flex;
// 		flex-direction: column;
// 		justify-content: center;
// 		align-items: center;
		
// 		& input {
// 			width: 3em;
// 			padding: 0 .2rem;
// 			font-size: 1rem;
// 			font-family: $lato;

//       &[type="checkbox"] {
//         display: none;
//       }

// 			&.date {
// 				width: 6em;
// 			}
// 		}
// 	}
// 	& span {
// 		margin-bottom: 1rem;
// 	}
// }

.tags {
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  & .create-tag {
    width: 100%;
    height: 2rem;
    & span {
      margin-right: 1rem;
      font-size: .75rem;
      color: $light;
    }
    & button {
      width: 6rem;
      height: 1.3rem;
      font-size: .75rem;
      font-family: $niramit;
      color: $primary;
      background: $secondary;
      border-radius: 1rem;
    }
  }
}

.task-actions {
  margin-top: 1.5rem;
	// @include spaced-buttons;
}

.min-text {
  font-size: .5rem;
}

.active {
  min-height: 18rem;
  // border-left-color: $line;
}

.field-required {
	animation: flicker .6s linear;
}

@keyframes flicker {
	// 0% {
	// 	opacity: 1;
	// }
	25% {
		opacity: .4;
	}
	50% {
		opacity: 1;
	}
	75% {
		opacity: .4;
	}
	100% {
		opacity: 1;
	}

}
</style>