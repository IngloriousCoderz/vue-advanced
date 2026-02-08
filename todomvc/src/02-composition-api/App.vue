<script setup>
import { computed, onMounted, onUpdated, ref } from 'vue'

import AppFilters from './AppFilters.vue'
import AppForm from './AppForm.vue'
import AppHeader from './AppHeader.vue'
import AppList from './AppList.vue'

// form logic

const text = ref('')

function handleChange(newText) {
  text.value = newText
}

function handleSubmit() {
  add(text.value)
  text.value = ''
}

// list logic

const tasks = ref([
  { id: 1, text: 'Learn Vue', completed: true },
  { id: 2, text: 'Look for a job', completed: false },
  { id: 3, text: 'Forget everything' },
])

function add(text) {
  const maxId = tasks.value.length ? tasks.value[tasks.value.length - 1].id : 0
  tasks.value.push({ id: maxId + 1, text })
}

function toggle(index) {
  tasks.value[index].completed = !tasks.value[index].completed
}

function remove(index) {
  tasks.value.splice(index, 1)
}

// filters logic

const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))
const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
const tasksLeft = computed(() => activeTasks.value.length)

const selectedFilter = ref('All')

function setFilter(value) {
  selectedFilter.value = value
}

const filteredTasks = computed(() => {
  if (selectedFilter.value === 'Active') return activeTasks.value
  if (selectedFilter.value === 'Completed') return completedTasks.value
  return tasks.value
})

const isClearCompletedShown = computed(() => completedTasks.value.length)

async function clearCompleted() {
  for (const task of completedTasks.value) {
    await remove(tasks.value.indexOf(task))
  }
  selectedFilter.value = 'All'
}

onMounted(() => {
  console.log('App mounted!')
})

onUpdated(() => {
  console.log('App updated!')
})
</script>

<template>
  <AppHeader name="Matteo Antony" />

  <AppForm :text="text" @change="handleChange" @submit="handleSubmit" />

  <AppList :tasks="filteredTasks" @spanClick="toggle" @buttonClick="remove" />

  <AppFilters
    :tasksLeft="tasksLeft"
    :selectedFilter="selectedFilter"
    :isClearCompletedShown="isClearCompletedShown"
    @filterClick="setFilter"
    @clearClick="clearCompleted"
  />
</template>
