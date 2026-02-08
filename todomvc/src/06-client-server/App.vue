<script setup>
import { onMounted, onUpdated } from 'vue'

import AppFilters from './components/filters/AppFilters.vue'
import AppForm from './components/form/AppForm.vue'
import AppHeader from './components/header/AppHeader.vue'
import AppList from './components/list/AppList.vue'

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
