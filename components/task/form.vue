<template>
  <form @submit.prevent
    @keyup.enter="save()"
    @keyup.esc="discard()">

    <header>{{title}}</header>

    <section class="text-fields">
      <text-field
        name="title"
        placeholder="Título"
        pattern=""
        type="text"
        v-model="task"
        ref="form-title">
      </text-field>
  
      <text-field
        name="description"
        placeholder="Descripción"
        pattern=""
        type="text"
        v-model="task">
      </text-field>
    </section>
    
    <section>
      <div class="tags">
        <div class="create-tag">
          <span>Etiquetas</span>
          <btn text="Nueva" small bgColor="#6BB4E5" inline />
        </div>
        <tag-picker default v-model="task.tag" />
      </div>
    </section>

    <section class="time">
      <time-field v-model="task.time" />
      <div class="date"><span>Fecha</span> <span>{{selectedDate}}</span></div>
    </section>

    <div class="buttons">
      <btn text="Guardar" bgColor="#6BB4E5" @click.native="save()" />
      <btn text="Cancelar" simple @click.native="discard()" />
    </div>

  </form>
</template>

<script lang="ts">
import Vue, { PropOptions } from 'vue'

import textField from '@/components/inputs/text-field.vue'
import timeField from '@/components/inputs/time-field.vue'
import tagPicker from '@/components/tag/picker.vue'
import btn from '@/components/buttons/button.vue'

interface Tag {
  text: string,
  color: string
}

interface Task {
  _id: string,
  title: string,
  description: string,
  tag: Tag,
  time: string,
  date: string,

  author: string,
  creationDate: string,
  active: boolean,
  // sharedWith: string[]
}

export default Vue.extend({
  components: {
    'text-field': textField,
    'time-field': timeField,
    'tag-picker': tagPicker,
    btn,
  },
  data() {
		return {
      task: {
				title: '',
				description: '',
				tag: {} as Tag,
        time: '',
        date: ''
      } as Task,
		}
  },
  computed: {
    title(): string {
      if (this.edit) {
        return 'Editar tarea'
      }
      return 'Nueva tarea'
    },
    selectedDate(): string {
      return this.$store.getters['date/selected']
    },
    edit(): boolean {
      let taskForEdit: string = this.$store.state.task.edit
      if (taskForEdit.length > 0) {
        const task: any = this.$store.getters['task/forEdition']
        if (task) {
          Object.assign(this.task, task)
          return true
        }
      }
      return false
    }
  },
  beforeMount() {
    this.edit
  },
  methods: {
    validate(form: any): boolean {
      // Title validation
      const title = form.title

      if (title.length === 0) {
        const titleField: any = this.$refs['form-title']
        titleField.$el.classList.add('field-required')
        setTimeout( () => {
          titleField.$el.classList.remove('field-required')
          titleField.$el.focus()
        }, 600 );
        return false
      }
      
      // Tag validation
      const tag: any = form.tag
      if (tag.color.length === 0 || tag.text.length === 0) {
        return false
      }

      return true
    },
		save(): void {
      const validate: boolean = this.validate(this.task)

      if (validate) {
        this.task.date = this.selectedDate
        console.log(`
        Título: ${this.task.title}
        
        Descripción: ${this.task.description}
        Etiqueta: ${this.task.tag.text}
        Horario: ${this.task.time},
        Fecha: ${this.task.date}
        `);
        if (this.edit) {
          this.editTask()
        } else {
          this.newTask()
        }
      } else {
        console.log('The form have invalid fields.');
      }
    },
    discard(): void {
      this.$store.commit('modal/close', 'task')
      if (this.edit === false) {
        this.resetForm()
      }
    },
    editTask(): void {
      // this.$api()
      this.$axios.$put(`${location.origin}/update-task/${this.task._id}`, this.task)
        .then( res => {
          console.log(res)
          this.$store.commit('task/edited', res.changes)
          this.discard()
        })
        .catch( err => console.warn(err.response.data) )
    },
    newTask(): void {
      const id: string = this.$store.getters['user/id']
      this.$api('post', `save-task/${id}`, this.task)
        .then((res: any) => {
          const task_id: string = res.task._id
          this.$store.dispatch('task/lastSaved', `${location.origin}/task/${task_id}`)
          this.discard()
          this.resetForm()
        })
        .catch( (err: { response: { data: any } }) => console.log(err.response.data) )
      // this.$axios.$post(`${location.origin}/save-task/${id}`, this.task)
      //   .then( res => {
      //     const task_id: string = res.task._id
      //     this.$store.dispatch('task/lastSaved', `${location.origin}/task/${task_id}`)
      //     this.discard()
      //     this.resetForm()
      //   })
      //   .catch( err => console.log(err.response) )
    },
    resetForm(): void {
      this.task.title = ''
      this.task.description = ''
      this.task.time = ''
    },
  },
})
</script>

<style lang="scss" scoped>

form {
  width: 100%;
  padding: 1.5rem 1.5rem;
  margin: auto;
  background: transparent;
	display: flex;
	align-items: center;
	flex-direction: column;
	border-radius: $radius;
}

header {
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
}

section {
  width: 100%;
  margin-bottom: 1rem;
  &.text-fields * {
    margin-bottom: .5rem;
  }
}

.time {
  display: flex;
  & * {
    flex: 1;
  }
  & .date {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & span {
      flex: 0 1 auto;
      margin: 0 .25rem;
      font-size: .75rem;
    }
  }
}

div.tags {
  width: 100%;
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
    // & button {
    //   width: 6rem;
    //   height: 1.3rem;
    //   font-size: .75rem;
    // }
  }
}

div.buttons {
  margin-top: .5rem;
}


.field-required {
	animation: flicker .8s linear;
}

@keyframes flicker {
	0% {
		opacity: 1;
	}
	25% {
		opacity: .6;
	}
	50% {
		opacity: 1;
	}
	75% {
		opacity: .6;
	}
	100% {
		opacity: 1;
	}

}
</style>