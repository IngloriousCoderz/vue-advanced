<script setup>
import { useFilters } from './filters'

const { tasksLeft, selectedFilter, isClearCompletedShown, setFilter, clearCompleted } = useFilters()
</script>

<template>
  <footer>
    <span>{{ tasksLeft }} items left</span>
    <span class="filters">
      <a :class="{ selected: selectedFilter === 'All' }" @click="setFilter('All')">All</a>
      <a :class="{ selected: selectedFilter === 'Active' }" @click="setFilter('Active')">Active</a>
      <a :class="{ selected: selectedFilter === 'Completed' }" @click="setFilter('Completed')"
        >Completed</a
      >
    </span>
    <a :class="{ hidden: !isClearCompletedShown }" @click="clearCompleted">Clear completed</a>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a {
  padding: 0.25rem 0.5rem;
}

.filters {
  display: flex;
  gap: 1rem;
}

.selected {
  border: 1px solid red;
}

.hidden {
  visibility: hidden;
}
</style>
