<template>
  <form @submit.prevent
    ref="task-form"
    @keyup.enter="saveTask()"
    @keyup.esc="discardTask()">

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
          <btn text="Nueva" small color="#6BB4E5" inline />
        </div>
        <tags
          list
          :context="`ID: ${task._id}`"
          :selected="task.tag.text"
          @getTag="setPropertyIn('tag', $event)">
        </tags>
  
        <!-- <tags></tags> -->
      </div>
    </section>

    <section class="time">
      <time-field @getTime="setPropertyIn('time', $event)" v-model="task"></time-field>
      <div class="date"><span>Fecha</span> <span>{{$store.getters['date/selected']}}</span></div>
    </section>

    <div class="buttons">
      <btn text="Guardar" color="#6BB4E5" @click.native="save()" />
      <btn text="Cancelar" simple @click.native="discard()" />
    </div>

  </form>
</template>

<script lang="ts">
import Vue from 'vue'

import textField from '@/components/text-field.vue'
import timeField from '@/components/inputs/time.vue'
import tags from '@/components/tags.vue'
import modal from '@/components/modal.vue'
import btn from '@/components/buttons/button.vue'

export default Vue.extend({
  components: {
    'text-field': textField,
    'time-field': timeField,
		tags,
		modal,
    btn,
    
  },
  data() {
		return {
      active: false as boolean,

      activeDate: true as boolean,

      onEdit: false as boolean,
      
      task: {
				title: '',
				description: '',
				tag: {},
				time: ''
			} as any,
		}
  },
  computed: {
    // dateSelected: {
    //   set(date) {
    //     this.$store.commit('date/changeSelected', date)
    //   },
    //   get() {
    //     const date = this.$store.getters['date/selected']
    //     this.task.date = date
    //     return date
    //   }
    // }
  },
  methods: {
    setPropertyIn(property: string, $event: any): void {
      if (property && $event) {
        this.task[property] = $event
      }
    },
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
        const id: string = this.$store.getters['user/id']
        console.log(this.task);
        // this.$axios.$post(`${location.origin}/save-task${id}`, this.task)
        //   .then( res => {
        //     console.log(res)
        //     this.$store.dispatch('task/lastSaved', `${location.origin}/last-saved/${id}`)
        //     this.resetForm()
        //   })
        //   .catch( err => console.warn(err))
      }
      console.log('The form have invalid fields.');
    },
    discard(): void {
      this.$store.commit('modal/close', 'task')
      this.resetForm()
    },

    resetForm(fields: string[] = ['title', 'description', 'time']): void {
      const fieldsToReset: string[] = fields
      for(let field of fieldsToReset) {
        this.task[field] = ''
      }
    },

    // editContent() {
    //   if (this.contentEditable) {
    //     console.log(this.contentEditable)
    //     Object.assign(this.task, this.contentEditable)
    //     if (this.contentEditable.date === '') {
    //       this.activeDate = false
    //       this.task.date = ''
    //     }
    //     this.onEdit = true
    //     this.toggleForm('open')
    //   }
    // }
  },
  beforeMount() {
    // this.editContent()
    // this.dateSelected
  },
  props: {
    contentEditable: {
      type: Object,
      required: false
    }
  }
})
</script>

<style lang="scss" scoped>

$btn-height: 2rem;
form {
  width: 100%;
  padding: 1.5rem 2rem;
  margin: auto;
  background: transparent;
	display: flex;
	align-items: center;
	flex-direction: column;
	border-radius: $radius;
	
	// transition: .4s ease;
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
  // & button {
  //   margin: 0;
  // }
}


.field-required {
	animation: flicker .8s linear;
}

@keyframes flicker {
	// 0% {
	// 	opacity: 1;
	// }
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