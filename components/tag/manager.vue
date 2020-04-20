<template>
  <section class="manage-tags">
    <header>Gestionar etiquetas</header>

    <div class="create-new-tag">
      <text-field name="text"
        placeholder="Nueva etiqueta"
        v-model="tag.text" />
      <button class="cancel-edit" v-if="edition" @click="cancelEdition()">
        <cross color="#F16D6D"></cross>
      </button>
      <btn text="Guardar" bgColor="#6BB4E5" @click.native="save()" :class="{ready}" />
      
      <color-picker mode="dots" v-model="tag.color" />
    </div>
    
    <tags @input="startEdition($event)" />
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import textField from '@/components/inputs/text-field.vue'
import btn from '@/components/buttons/button.vue'
import colorPicker from '@/components/inputs/color-picker.vue'
import tags from '@/components/tag/tags.vue'

// Icons
import cross from '@/components/icons/cross.vue'

import { Tag } from '@/assets/interfaces.ts'

export default Vue.extend({
  components: {
    'text-field': textField,
    btn,
    'color-picker': colorPicker,
    'tags': tags,

    // Icons
    cross
  },
  data() {
    return {
      tag: {
        text: '',
        color: ''
      } as Tag,
      old_tag: {
        text: '',
        color: ''
      } as Tag,
      edition: false as boolean,
    }
  },
  computed: {
    ready(): boolean {
      return this.validateTag(this.tag)
    }
  },
  methods: {
    validateTag(tag: Tag): boolean {
      if (!tag || tag.text === '' || tag.color === '') {
        return false
      }
      return true
    },
    save(): void {
      const validation: boolean = this.validateTag(this.tag)
      if (validation === true) {
        if (this.edition === true) {
          this.updateTag(this.tag, this.old_tag)
        } else {
          this.createNewTag(this.tag)
        }
      }
    },
    startEdition($event: Tag): void {
      this.edition = true
      Object.assign(this.tag, $event)
      Object.assign(this.old_tag, $event)
    },
    cancelEdition(): void {
      this.edition = false
      this.resetForm()
    },
    updateTag(tag: Tag, old_tag: Tag): void {
      const data: object = {
        text: tag.text,
        color: tag.color,
        old_text: old_tag.text,
        old_color: old_tag.color
      }
      const id: string = this.$store.getters['user/id']
      this.$axios.$put(`${location.origin}/update-tag/${id}`, data)
        .then((res: any) => {
          console.log(res)
          const storeData: object = {
            tag: res.tag,
            old_tag
          }
          this.$store.commit('user/updateTag', storeData)
          this.cancelEdition()
        })
        .catch((err: any) => {
          console.log(err.response.data)
        })
    },
    createNewTag(tag: Tag): void {
      const id: string = this.$store.getters['user/id']
      this.$axios.$post(`${location.origin}/new-tag/${id}`, tag)
        .then((res: any) => {
          console.log(res)
          this.$store.commit('user/addNewTag', res.tag)
          this.resetForm()
        })
        .catch((err: any) => {
          console.log(err)
        })
    },
    resetForm(): void {
      this.tag = {
        text: '',
        color: ''
      }
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
  align-items: center;
  // position: relative;
  & input {
    flex: 1;
  }
  & button {
    flex: 0 1 6rem;
    opacity: .8;
  }
  & button.cancel-edit {
    flex: 0 1 1rem;
    height: 1rem;
    margin: 0 .5rem;
    & svg {
      width: 1rem;
    }
  }
}

button.ready {
  opacity: 1;
}
</style>