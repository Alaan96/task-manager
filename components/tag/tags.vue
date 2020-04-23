<template>
  <!-- <div v-if="preview"
    class="preview">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" :fill="this.tags[0].color" />
    </svg>
  </div> -->

  <!-- Picker -->
  <section class="tag-list" v-if="picker">
    <radio-field
      v-for="tag in tags"
      :key="tag.text"
      name="tag"
      :id="tag.text"
      :val="tag"
      :value="value"
      @input="$emit('input', $event)">
      <div class="tag" :class="{'selected': tag === value}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" :fill="tag.color" />
        </svg>
        <label :for="tag.text">{{tag.text}}</label>
      </div>
    </radio-field>
  </section>


  <!-- Grid -->
  <section class="user-tags" v-else @click.capture="clickHandler($event)">
    <div class="user-tag"
      v-for="user_tag in tags"
      :key="user_tag.text">
      <button class="tag-menu" @click="openOptions($event, user_tag)">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 4 16">
          <circle cx="2" cy="2" r="2" />
          <circle cx="2" cy="8" r="2" />
          <circle cx="2" cy="14" r="2" />
        </svg>
      </button>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" class="dot">
        <circle cx="4" cy="4" r="4" :fill="user_tag.color" />
      </svg>
      <span>{{user_tag.text}}</span>
    </div>

      <!-- Menú -->
      <ul v-show="options"
        class="options"
        :style="menuPosition"
        ref="options">
        <li><button @click="editTag(tagReference)">
          <img src="@/static/edition.svg" alt="edit-icon">
          <span>Editar</span>
        </button></li>
        <li><button class="remove" @click="removeTag(tagReference)">
          <cross color="#F16D6D"></cross>
          <span>Eliminar</span>
        </button></li>
      </ul>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import radioField from '@/components/inputs/radio-field.vue'

import { Tag } from '@/assets/interfaces.ts'

// Icons
import cross from '@/components/icons/cross.vue'

export default Vue.extend({
  components: {
    'radio-field': radioField,

    // Icons
    cross
  },
  props: {
    value: {
      // required: true
    },
    display: {
      type: String,
      required: false,
      validator: value => {
        return ['small', 'medium'].includes(value)
      }
    },
    default: {
      type: Boolean
    },
    picker: {
      type: Boolean
    }
  },
  data() {
    return {
      options: false as boolean,
      menuPosition: {
        top: '0px',
        left: '0px'
      } as any,
      tagReference: {
        text: '',
        color: ''
      } as Tag
    }
  },
  computed: {
    tags(): Tag[] {
      return this.$store.getters['user/tags']
    }
  },
  mounted() {
    if (this.default === true) {
      this.$emit('input', this.tags[0])
    }
  },
  methods: {
    openOptions($event: MouseEvent, tagReference: Tag): void {
      if (this.options === false) {
        // const menuElement: any = this.$refs.options
        const menuWidth: number = 96
        const screenWidth: number = window.innerWidth
        const screenHeight: number = window.innerHeight
        const margin: number = 16

        let top: number = $event.clientY
        let left: number = $event.clientX

        let menuRequiredSpace: number = left + menuWidth + margin

        if (menuRequiredSpace > screenWidth) {
          left = screenWidth - (menuWidth + margin)
        }


        this.menuPosition.top = top + 'px'
        this.menuPosition.left = left + 'px'

        this.tagReference = tagReference
        this.options = true
      }
    },
    closeOptions(): void {
      if (this.options === true) {
        this.options = false
        this.resetMenuPosition()
        // this.tagReference = {text: '', color: ''}
      }
    },
    clickHandler($event: MouseEvent | any): void {
      if (!$event.path.includes('button.tag-menu')) {
        this.closeOptions()
      }
    },
    resetMenuPosition(): void {
      this.menuPosition = {top: '0px', left: '0px'}
    },
    editTag(tag: Tag): void {
      this.$emit('input', tag)
      this.closeOptions()
    },
    removeTag(tag: Tag | any): void {
      const tagText: object = {text: tag.text}
      const id: string = this.$store.getters['user/id']
      this.$axios.$patch(`${location.origin}/tag/${id}`, tagText)
        .then( (res: any) => {
          console.log(res)
          this.$store.commit('user/removeTag', res.tag)
        })
        .catch( (err: any) => {
          console.log(err.response.data)
        })
      this.closeOptions()
    }
  }
})
</script>

<style lang="scss" scoped>
// .preview svg {
//   width: 1rem;
// }

section.tag-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  // overflow-x: scroll;
  // &::-webkit-scrollbar {
  //   display: none;
  // }
}

.tag {
  padding: .25rem .5rem;
  margin: .25rem;
  display: flex;
  align-items: center;
  font-size: .75rem;
  color: $primary;
  background: transparent;
  border: 1px solid $primary;
  border: 1px solid $line;
  border-radius: 1rem;
  transition: .2s ease;
  opacity: 1;
  // &:hover {
  //   opacity: 1;
  // }
  
  &:first-child {
    margin-left: 0;
  }
  & svg {
    width: .5rem;
  }
  & label {
    margin-left: .5rem;
    font-weight: 600;
  }
}

.selected {
  color: $black;
  background: $primary;
  opacity: 1;
}

// Grid
section.user-tags {
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(5rem, 1fr));
  grid-gap: .5rem;
}

.user-tag {
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  @include center;
  flex-direction: column;
  position: relative;
  border: 1px solid $line;
  border-radius: .5rem;
  opacity: .7;
  transition: .2s ease;
  &:hover {
    opacity: 1;
  }
  & svg {
    width: 1.5rem;
  }
  span {
    text-align: center;
    margin-top: .25rem;
    font-weight: 600;
    text-overflow: ellipsis;
  }
}

button.tag-menu {
  width: 1rem;
  position: absolute;
  top: .5rem;
  right: .25rem;
  fill: $primary;
  & svg {
    width: .25rem;
  }
}


ul.options {
  width: 6rem;
  position: absolute;
  background: $black;
  border: 1px solid $line;
  border-radius: .25rem;
  box-shadow: 0 0 .5rem rgba(0, 0, 0, 0.2);
  z-index: 100;
  opacity: 1;
  & li {
    width: 100%;
    height: 1.5rem;
    @include center;
  }
  & button {
    width: 100%;
    height: 100%;
    padding: 0 .5rem;
    display: flex;
    align-items: center;
    font-size: .75rem;
    font-weight: 700;
    color: $primary;
    &:hover {
      background: $line;
    }
    & * {
      flex: 0 1 1rem;
      height: 100%;
    }
    & span {
      margin-left: .5rem;
    }
  }
  & button.remove {
    color: $cancel;
    & svg {
      width: 1rem;
    }
  }
}
</style>