<script setup>
import { useList } from './composables/list'
import { useFilters } from './composables/filters'

const { toggle, remove } = useList()
const { filteredTasks } = useFilters()
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
