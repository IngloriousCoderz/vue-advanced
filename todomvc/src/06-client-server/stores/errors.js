import { ref } from 'vue'

const errors = ref([])

export function useErrors() {
  function addError(error) {
    errors.value.push({
      id: Date.now(),
      message: error.message,
      status: error.status,
    })
  }

  function clearError(id) {
    errors.value = errors.value.filter((e) => e.id !== id)
  }

  return { errors, addError, clearError }
}
