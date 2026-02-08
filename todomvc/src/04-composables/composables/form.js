import { ref } from 'vue'

export function useForm() {
  const text = ref('')

  function empty() {
    text.value = ''
  }

  return { text, empty }
}
