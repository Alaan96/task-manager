<template>
  <div v-if="preview"
    class="preview">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" :fill="this.tags[0].color" />
    </svg>
  </div>

  <div v-else-if="list"
    class="tag-list" :class="{negative}">

    <template v-if="multiple">
      <button v-for="tag in tags"
        :key="tag.text"
        :class="{'selected': selections.includes(tag.text)}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" :fill="tag.color" />
        </svg>
        <label :for="tag.text">{{tag.text}}</label>
        <input type="checkbox"
          :id="tag.text"
          :value="tag.text"
          v-model="selections"
          @change="setTags()">
      </button>
    </template>

    <template v-else>
      <button v-for="tag in tags"
        :key="tag.text"
        :class="{'selected': selectedTag === tag.text}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" :fill="tag.color" />
        </svg>
        <label :for="tag.text">{{tag.text}}</label>
        <input type="radio"
          :id="tag.text"
          :value="tag.text"
          v-model="selectedTag"
          @change="setTag(tag)">
      </button>
    </template>
  </div>

  <modal v-else
    title="Gestión de etiquetas">
    <div class="create-new-tag">
      <input type="text" placeholder="Nueva etiqueta" v-model="newTag.text">
      <button class="add-tag" @click="addNewTag">
        Agregar
      </button>

      <div class="color-list">
        <button class="color-preview"
          v-for="(dot, index) in dots"
          :key="'Color ' + index"
          :class="{'color-selected': newTag.color === dot.color}">
          <input type="radio" :id="dot.color" :value="dot.color" v-model="newTag.color">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
            <circle cx="4" cy="4" r="4" :fill="dot.color" />
          </svg>
        </button>
        <button class="colors-generate" @click="setColors()">
          Generar
        </button>
      </div>

    </div>


    <section class="tags">
      <!-- <button v-for="tag in tags"
        :key="tag.text"
        :class="{'selected': selections.includes(tag.text)}">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" :fill="tag.color" />
        </svg>
        <label :for="tag.text">{{tag.text}}</label>
        <input type="checkbox"
          :id="tag.text"
          :value="tag.text"
          v-model="selections"
          @change="setTags()">
      </button> -->
      <div v-for="tag in tags"
        :key="tag.text"
        class="tag">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <circle cx="40" cy="24" r="12" :fill="tag.color" />
          <text x="40" y="64" text-anchor="middle">{{tag.text}}</text>
        </svg>
      </div>
    </section>
  </modal>
</template>

<script>
import modal from '@/components/modal'

// Mixins
import { helpers } from '@/assets/mixins/api-helpers'

export default {
  data() {
    return {
      newTag: {
        text: '',
        color: ''
      },
      selectedTag: 'Tarea',
      selections: [],

      dots: []
    }
  },
  mixins: [helpers],
  created() {
    const tag = this.tags[0]
    this.setTag(tag)
    // this.selectedTag = 'Tarea'

    this.setColors()
  },
  methods: {
    setTag(tag) {
      this.$emit('getTag', tag)
    },
    setTags() {
      this.$emit('getTags', this.selections)
    },
    reset() {
      this.selectedTag = ''
    },

    // Modal
    setColors() {
      if (this.dots.length > 0) {
        this.dots = []
      }
      for(let dot = 1; dot <= 6; dot++) {
        let hue = Math.floor(Math.random() * 360)
        let saturation = Math.floor(Math.random() * (55 - 40)) + 40
        let lightness = Math.floor(Math.random() * (70 - 50)) + 50

        this.dots.push({
          color: `hsl(${hue}, ${saturation}%, ${lightness}%)`
        })
      }
    },
    addNewTag() {
      if (this.newTag.text.length > 0 && this.newTag.color.length > 0) {
        let tag = {}
        Object.assign(tag, this.newTag)
        this.$store.commit('user/addNewTag', tag)
        console.log(tag)
        this.$axios.$post(`${this.url}/user/new-tag/${this.id}`, {tag})

        this.newTag.text = ''
        this.newTag.color = ''
        
      }
    }
  },
  props: {
    list: {
      type: Boolean,
      required: false,
    },
    preview: {
      type: Boolean,
      required: false
    },
    multiple: {
      type: Boolean,
      required: false
    },
    negative: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  computed: {
    tags() {
      return this.$store.getters['user/tags']
    }
  },
  components: {
    modal
  }
}
</script>

<style lang="scss" scoped>
.preview svg {
  width: 1rem;
}


.tag-list {
  width: 100%;
  display: flex;
  overflow-x: scroll;
  border-radius: 1rem;
  &::-webkit-scrollbar {
    display: none;
  }
  & button {
    // height: 1.3rem;
    padding: .15rem .5rem;
    margin: .25rem;
    display: flex;
    align-items: center;
    font-size: .75rem;
    font-family: $niramit;
    color: $primary;
    background: $black;
    border-radius: 1rem;

    transition: .2s ease;
    opacity: .5;
    &:first-child {
      margin-left: 0;
    }
    & svg {
      width: .5rem;
    }
    & label {
      margin-left: .5rem;
    }
    & input {
      display: none;
    }
  }
}

button.selected {
  opacity: 1;
}



.create-new-tag {
  width: 100%;
  // height: 2rem;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  & input {
    width: 9rem;
    padding: 0 1rem;
    font-family: $niramit;
    font-size: 1rem;
    color: $black;
    border: 1px solid $gray;
    border-radius: 1rem;
  }
  & .add-tag {
    width: 6rem;
    @include center;
    font-family: $niramit;
    font-size: 1rem;
    color: $primary;
    background: $secondary;
    border-radius: 1rem;
  }
  & .color-list {
    width: 100%;
    height: 1.5rem;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    & button.color-preview {
      @include center;
      position: relative;
    }
    & input {
      width: auto;
      position: absolute;
      opacity: 0;
    }
    & svg {
      width: 1.5rem;
    }
    & button.colors-generate {
      font-family: $niramit;
      color: $secondary;
    }
  }
}

.color-selected {
  filter: brightness(1.1);
}

section.tags {
  max-height: 10.5rem;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(5rem, 1fr));
  grid-auto-rows: 5rem;
  grid-gap: .5rem;
  overflow-y: scroll;

  & .tag {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background: $primary;
    border: 1px solid $gray;
    border-radius: .5rem;
  }
}

.negative {
  color: $black;
}
</style>