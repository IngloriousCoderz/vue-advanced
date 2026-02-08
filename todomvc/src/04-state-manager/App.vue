<script setup>
import AppHeader from './AppHeader.vue'
import AppForm from './AppForm.vue'
import AppList from './AppList.vue'
import AppFilters from './AppFilters.vue'

import { onMounted, onUpdated } from 'vue'

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
