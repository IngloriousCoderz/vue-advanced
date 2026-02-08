<script setup>
import { onMounted, onUpdated } from 'vue'

import AppHeader from './header/AppHeader.vue'
import AppForm from './form/AppForm.vue'
import AppList from './list/AppList.vue'
import AppFilters from './filters/AppFilters.vue'

onMounted(() => {
  console.log('App mounted!')
})

onUpdated(() => {
  console.log('App updated!')
})
</script>

<template>
  <AppHeader name="Matteo Antony" />
  <AppForm />
  <AppList />
  <AppFilters />
</template>
