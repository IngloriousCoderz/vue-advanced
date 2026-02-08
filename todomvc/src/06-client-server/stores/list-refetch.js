import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import * as api from '../services/api'

export const useListStore = defineStore('list', () => {
  const tasks = ref([])

  onMounted(() => {
    refreshTasks()
  })

  async function refreshTasks() {
    const data = await api.fetchTasks()
    tasks.value = data
  }

  async function add(text) {
    await api.addTask(text)
    refreshTasks()
  }

  async function toggle(index) {
    const task = tasks.value[index]
    const body = { completed: !task.completed }
    await api.updateTask(task.id, body)
    refreshTasks()
  }

  async function remove(index) {
    const task = tasks.value[index]
    await api.removeTask(task.id)
    refreshTasks()
  }

  return { tasks, add, toggle, remove }
})
