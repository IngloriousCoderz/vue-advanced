import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { useListStore } from '../list/list'

export const useFiltersStore = defineStore('filters', () => {
  const list = useListStore()
  const { remove } = list
  const { tasks } = storeToRefs(list)

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

  return {
    tasksLeft,
    selectedFilter,
    setFilter,
    filteredTasks,
    isClearCompletedShown,
    clearCompleted,
  }
})
