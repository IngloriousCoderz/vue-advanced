import { defineStore } from 'pinia'
import { onMounted,ref } from 'vue'

import * as api from '../../services/api'

export const useListStore = defineStore('list', () => {
  const tasks = ref([])

  onMounted(() => {
    api.fetchTasks().then((t) => (tasks.value = t))
  })

  async function add(text) {
    const createdTask = await api.addTask(text)
    tasks.value.push(createdTask)
  }

  async function toggle(index) {
    const task = tasks.value[index]
    // const body = { ...task, completed: !task.completed }
    // const replacedTask = await api.replaceTask(task.id, body)
    // tasks.value[index] = replacedTask

    const body = { completed: !task.completed }
    const updatedTask = await api.updateTask(task.id, body)
    tasks.value[index] = updatedTask
  }

  async function remove(index) {
    const task = tasks.value[index]
    await api.removeTask(task.id)
    tasks.value.splice(index, 1)
  }

  return { tasks, add, toggle, remove }
})
