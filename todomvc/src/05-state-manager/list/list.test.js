import { createPinia, setActivePinia } from 'pinia'
import { beforeEach,describe, expect, it } from 'vitest'

import { useListStore } from './list'

describe('List store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with 3 tasks', () => {
    const store = useListStore()
    expect(store.tasks).toHaveLength(3)
  })

  it('adds a task', () => {
    const store = useListStore()
    store.add('New Task')

    expect(store.tasks).toHaveLength(4)
    expect(store.tasks.at(-1).text).toBe('New Task')
  })

  it('toggles task completion', () => {
    const store = useListStore()
    const initial = store.tasks[1].completed

    store.toggle(1)
    expect(store.tasks[1].completed).toBe(!initial)
  })

  it('removes a task', () => {
    const store = useListStore()
    store.remove(0)
    expect(store.tasks).toHaveLength(2)
  })
})
