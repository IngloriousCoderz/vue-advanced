import { computed, ref } from 'vue'
import { useList } from './list'

// stateful composable: need to keep the ref outside of the composable so it is globally accessible
const selectedFilter = ref('All')

export function useFilters() {
  const { tasks, remove } = useList()

  const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))
  const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
  const tasksLeft = computed(() => activeTasks.value.length)

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
}
