<script setup>
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

import { useFiltersStore } from '../filters/filters'
import { useListStore } from './list'

const list = useListStore()
const { fetch, toggle, remove } = list

const filters = useFiltersStore()
const { filteredTasks } = storeToRefs(filters)

onMounted(() => {
  fetch()
})
</script>

<template>
  <ul>
    <li v-for="(task, index) of filteredTasks" :key="task.id" :id="task.id">
      <span :class="{ completed: task.completed }" @click="toggle(index)">{{ task.text }}</span>
      &nbsp;
      <button @click="remove(index)">x</button>
    </li>
  </ul>
</template>

<style scoped>
#temp {
  opacity: 0.5;
}

.completed {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
