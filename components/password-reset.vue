<template>
  <modal>
    <div class="password-reset">
      <h3>Cambio de contraseña</h3>
      <modal-form
        :formFields="fields"
        :context="context"
        :info="description"
        :btnText="button"
        inputColor="secondary"
        :validate="false"
        :params="params">
      </modal-form>
      <slot></slot>
    </div>
  </modal>
</template>

<script>
import form from '@/components/form'
import modal from '@/components/modal'

export default {
  data() {
    return {
      
    }
  },
  components: {
    modal,
    'modal-form': form
  },
  props: {
    title: {
      type: String,
      required: false,
    },
    fields: {
      type: Array,
      requried: true
    },
    description: {
      type: String,
      requried: false
    },
    button: {
      type: String,
      required: false,
      default: 'Enviar'
    },
    context: {
      type: String,
      required: true
    },
    params: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.password-reset {
	& h3 {
    margin-bottom: 1rem;
    font-size: 1rem;
    font-weight: 700;
	}
  & span {
    color: $secondary;
    cursor: pointer;
  }
}
</style>