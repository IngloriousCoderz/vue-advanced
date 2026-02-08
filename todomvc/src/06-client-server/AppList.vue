<script setup>
import { storeToRefs } from 'pinia'
import { useListStore } from './stores/list'
import { useFiltersStore } from './stores/filters'

const list = useListStore()
const { toggle, remove } = list

const filters = useFiltersStore()
const { filteredTasks } = storeToRefs(filters)
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
