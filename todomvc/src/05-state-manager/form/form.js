import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useFormStore = defineStore('form', () => {
  const text = ref('')

  function empty() {
    text.value = ''
  }

  return { text, empty }
})
