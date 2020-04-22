<template>
  <settings></settings>
</template>

<script lang="ts">
import Vue from 'vue'

import authenticated from "@/middleware/authenticated.ts";

import settings from '@/components/settings.vue'

import { fetch } from "@/assets/mixins/fetch.ts";

export default Vue.extend({
  components: {
    settings
  },
  middleware: authenticated,
  mixins: [fetch]
})
</script>