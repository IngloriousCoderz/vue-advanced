// tests/stores/formStore.test.js
import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useFormStore } from './form'

describe('Form store', () => {
  beforeEach(() => {
    // Create a new Pinia instance and set it active
    setActivePinia(createPinia())
  })

  it('starts with empty text', () => {
    const store = useFormStore()
    expect(store.text).toBe('')
  })

  it('empties text when empty() is called', () => {
    const store = useFormStore()
    store.text = 'Hello world'

    store.empty()
    expect(store.text).toBe('')
  })
})
