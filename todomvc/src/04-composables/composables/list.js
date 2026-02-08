import { ref } from 'vue'

// stateful composable: need to keep the ref outside of the composable so it is globally accessible
const tasks = ref([
  { id: 1, text: 'Learn Vue', completed: true },
  { id: 2, text: 'Look for a job', completed: false },
  { id: 3, text: 'Forget everything' },
])

export function useList() {
  async function add(text) {
    const maxId = tasks.value.length ? tasks.value[tasks.value.length - 1].id : 0
    tasks.value.push({ id: maxId + 1, text })
  }

  async function toggle(index) {
    tasks.value[index].completed = !tasks.value[index].completed
  }

  async function remove(index) {
    tasks.value.splice(index, 1)
  }

  return { tasks, add, toggle, remove }
}
