import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import * as api from '../services/api'

export const useListStore = defineStore('list', () => {
  const tasks = ref([])

  onMounted(() => {
    api.fetchTasks().then((t) => (tasks.value = t))
  })

  async function add(text) {
    tasks.value.push({ id: 'temp', text })
    try {
      const createdTask = await api.addTask(text)
      const taskToUpdateIndex = tasks.value.findIndex((task) => task.id === 'temp')
      tasks.value[taskToUpdateIndex] = createdTask
    } catch {
      tasks.value = tasks.value.filter((task) => task.id !== 'temp')
    }
  }

  async function toggle(index) {
    const task = tasks.value[index]
    task.completed = !task.completed
    try {
      const body = { completed: task.completed }
      await api.updateTask(task.id, body)
    } catch {
      task.completed = !task.completed
    }
  }

  async function remove(index) {
    const task = tasks.value[index]
    const [removedTask] = tasks.value.splice(index, 1)
    try {
      await api.removeTask(task.id)
    } catch {
      tasks.value.splice(index, 0, removedTask)
    }
  }

  return { tasks, add, toggle, remove }
})
