import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormStore = defineStore('form', () => {
  const text = ref('')

  function empty() {
    text.value = ''
  }

  return { text, empty }
})
