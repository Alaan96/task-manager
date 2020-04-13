<template>
  <section class="manage-tags">
    <header>Gestionar etiquetas</header>

    <div class="create-new-tag">
      <text-field name="text"
        placeholder="Nueva etiqueta"
        v-model="tag" />
      <btn text="Agregar" bgColor="#6BB4E5" />
      
      <color-picker mode="dots" v-model="tag.color" />
    </div>
    
    <!-- <tag-picker display="medium" v-model="tag" /> -->

    <section class="user-tags">
      <div class="user-tag"
        v-for="user_tag in tags"
        :key="user_tag.text">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="4" :fill="user_tag.color" />
        </svg>
        <span>{{user_tag.text}}</span>
      </div>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import textField from '@/components/inputs/text-field.vue'
import btn from '@/components/buttons/button.vue'
import colorPicker from '@/components/inputs/color-picker.vue'
import tagPicker from '@/components/tags/picker.vue'

interface Tag {
  text: string,
  color: string
}

export default Vue.extend({
  components: {
    'text-field': textField,
    btn,
    'color-picker': colorPicker,
    'tag-picker': tagPicker
  },
  data() {
    return {
      tag: {
        text: '' as string,
        color: '' as string
      } as Tag,

      edition: false as boolean,
    }
  },
  computed: {
    tags(): Tag[] {
      return this.$store.getters['user/tags']
    }
  },
  methods: {
    validateTag(tag: Tag): boolean {
      if (!tag || tag.text.length === 0 || tag.color.length === 0) {
        return false
      }
      return true
    },
    save(): void {
      const validation: boolean = this.validateTag(this.tag)
      if (validation === true) {
        if (this.edition === true) {
          this.updateTag(this.tag)
        } else {
          this.createNewTag(this.tag)
        }
      }
    },
    createNewTag(tag: Tag): void {
      // Axios call
      console.log('Creating new tag', tag);
    },
    updateTag(tag: Tag) {
      // Axios call
      console.log('Updating tag', tag);
    }
  }
})
</script>

<style lang="scss" scoped>
section.manage-tags {
  width: 100%;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
header {
  width: 100%;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
}

.create-new-tag {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  & input {
    flex: 1;
  }
  & button {
    flex: 0 1 6rem;
  }
}

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
  border: 1px solid $line;
  border-radius: .5rem;
  & svg {
    width: 1.5rem;
  }
  span {
    margin-top: .25rem;
    font-weight: 600;
    text-overflow: ellipsis;
  }
}
</style>