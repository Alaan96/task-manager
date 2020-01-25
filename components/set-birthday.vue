<template>
  <modal>
    <div class="set-birthday">
      <h3>Fecha de nacimiento</h3>
      <modal-form
        :formFields="fields"
        context="set-birthday"
        info="Establezca su fecha de nacimiento en el formato solicitado."
        btnText="Establecer"
        inputColor="secondary"
        :validate="false"
        :params="id">
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
      id: '',
      fields: [
        {
          placeholder: "dd/mm/aa",
          name: "birthday",
          pattern:"^(?:3[01]|[12][0-9]|0?[1-9])([\-/.])(0?[1-9]|1[1-2])\\1\\d{4}$",
          type: 'text'
        },
      ]
    }
  },
  beforeMount() {
    this.id = '/' + localStorage.getItem('id')
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
    description: {
      type: String,
      requried: false
    },
    button: {
      type: String,
      required: false,
      default: 'Enviar'
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