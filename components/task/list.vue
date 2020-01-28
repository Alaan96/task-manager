<template>
  <div>
    <task-form v-if="context === 'new-task'"></task-form>

    <form class="filter-form" @submit.prevent v-else-if="context === 'filter'">
      <input type="text" placeholder="Buscar tarea" v-model="filters.text">
      <button class="tag-selection" @click.stop="showTags" :class="{tagsOn}">
        <tags v-if="!tagsOn" preview></tags>
        <tags v-else 
          list
          multiple
          @getTags="filterByTag($event)">
        </tags>
        <cross v-if="tagsOn" @click.stop.native="hideTags"></cross>
      </button>
    </form>



    <div class="set-context">
      <button :class="{'active': context === 'new-task'}">
        <input type="radio" id="new-task" value="new-task" v-model="context">
        <label for="new-task">Nueva tarea</label>
      </button>

      <button :class="{'active': context === 'filter'}">
        <!-- v-if="filtersOff"> -->
        <input type="radio" id="filter" value="filter" v-model="context">
        <label for="filter">Filtrar</label>
      </button>

      <!-- <button :class="{'active': context === 'filter'}"
        v-else>
        <label>Resetear filtros</label>
      </button> -->
    </div>

    <div v-if="!list || list.length === 0"
      class="no-tasks">
      No se encuentran tareas o eventos. 
    </div>

    <task
      v-for="(task, index) in list"
      :key="`Tarea ${index} - ${task.title}`"
      :content="task"
      :index="index">
    </task>
  </div>
</template>

<script>
import task from '@/components/task/task'
import taskForm from '@/components/task/task-form'
import tags from '@/components/tags'

// Icons
import cross from '@/components/icons/cross'

export default {
  components: {
    task,
    'task-form': taskForm,
    tags,

    // Icons
    cross
  },
  data() {
    return {
      // context: 'new-task',
      context: 'new-task',
      filters: {
        text: '',
        tags: []
      },
      tagsOn: false
    }
  },
  methods: {
    filterList(list) {
      let textFilter = this.filters.text
      let tagsFilter = this.filters.tags

      let result = list

      if (tagsFilter.length > 0) {
        result = list.filter( task => {
          return tagsFilter.includes(task.tag.text)
        } )
      }

      if (textFilter !== '') {
        result = result.filter( task => {
          let title = task.title.toUpperCase()  
          let filter = this.filters.text.toUpperCase()
          return title.includes(filter)
        } )
      }

      return result
    },

    // Tags

    showTags() {
      this.tagsOn = true
    },
    hideTags() {
      this.tagsOn = false
    },
    filterByTag($event) {
      this.filters.tags = $event
    }
  },
  computed: {
    list() {
      let tasks = this.$store.getters['task/getFullList']
      return this.filterList(tasks)
    },
    filtersOff() {
      let off = { text: '', tag: '' }
      if (this.filters === off) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-form {
  width: 100%;
  min-height: 3rem;
  padding-left: 1rem;
	margin: .5rem auto;
  position: relative;
	background: $line;
	color: $primary;
	display: flex;
	align-items: center;
	border-radius: $radius;

  // overflow-x: hidden;
  
  & .tag-selection {
    width: 3rem;
    height: 3rem;
    padding-left: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    background: $black;
    border-radius: $radius;

    transition: .4s ease;
    & svg {
      width: 1rem;
      margin: 0 1rem;
    }
  }
}

input {
	width: 100%;
  height: 3rem;
	padding: 0 1rem;

	font-size: 1rem;
	font-family: $niramit;
	background: transparent;
	color: $light;
	border: none;
	// border-bottom: 1px solid $line;

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

.tag-selection.tagsOn {
  width: 100%;
}

.set-context {
  width: 100%;
  height: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    height: 1.5rem;
    padding: 0 .5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: .75rem;
    font-family: $niramit;
    background: transparent;
    color: $line;
    border-radius: $radius;
    & label {
      width: 100%;
      height: 100%;
      display: block;
    }
    & input {
      display: none;
    }
  }
}

button.active {
  color: $primary;
}


.no-tasks {
  width: 100%;
  @include center;
  margin: 1.5rem 0;
}
</style>